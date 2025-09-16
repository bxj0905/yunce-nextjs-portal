import { NextRequest } from "next/server";

export const runtime = "nodejs";

type Provider = "deepseek" | "gemini";

export async function POST(req: NextRequest) {
  try {
    const { messages, temperature = 0.7, provider: clientProvider }: { messages: Array<{ role: string; content: string }>; temperature?: number; provider?: Provider } = await req.json();

    // 选择提供方：优先客户端指定；否则根据可用的服务端密钥自动选择
    const hasDeepseek = Boolean(process.env.DEEPSEEK_API_KEY);
    const hasGemini = Boolean(process.env.GOOGLE_API_KEY);
    const provider: Provider = clientProvider ?? (hasDeepseek ? "deepseek" : hasGemini ? "gemini" : "deepseek");

    const encoder = new TextEncoder();

    if (provider === "gemini") {
      if (!hasGemini) {
        return new Response("Missing GOOGLE_API_KEY", { status: 500 });
      }

      // 将 OpenAI 样式的消息转换为 Gemini 的 contents 结构
      const contents = (messages || []).map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: String(m.content ?? "") }],
      }));

      const gemUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GOOGLE_API_KEY}`;
      const gmRes = await fetch(gemUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents, generationConfig: { temperature } }),
      });
      if (!gmRes.ok) {
        const txt = await gmRes.text().catch(() => "");
        return new Response(`Upstream error (gemini): ${txt || gmRes.statusText}`, { status: 500 });
      }
      const data: unknown = await gmRes.json().catch(() => ({} as unknown));
      const safe = (obj: unknown): any => (obj ?? {}) as any;
      const text: string = safe(data).candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      // 非流式：一次性输出一条 delta，沿用前端解析协议
      const payload = JSON.stringify({ delta: text, reasoning: undefined });
      return new Response(payload + "\n", {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    }

    // 默认 DeepSeek（流式）
    if (!hasDeepseek) {
      return new Response("Missing DEEPSEEK_API_KEY", { status: 500 });
    }

    const dsRes = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({ model: "deepseek-chat", messages, temperature, stream: true }),
    });

    if (!dsRes.ok || !dsRes.body) {
      const txt = await dsRes.text().catch(() => "");
      return new Response(`Upstream error (deepseek): ${txt || dsRes.statusText}`, { status: 500 });
    }

    const decoder = new TextDecoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        const reader = dsRes.body!.getReader();
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";
            for (const raw of lines) {
              const line = raw.trim();
              if (!line) continue;
              if (!line.startsWith("data:")) continue;
              const dataStr = line.replace(/^data:\s*/, "");
              if (dataStr === "[DONE]") continue;
              try {
                const json = JSON.parse(dataStr);
                const delta: string = json?.choices?.[0]?.delta?.content ?? "";
                const reasoning: string | undefined = json?.choices?.[0]?.delta?.reasoning_content ?? undefined;
                const payload = JSON.stringify({ delta, reasoning });
                controller.enqueue(encoder.encode(payload + "\n"));
              } catch {}
            }
          }
        } catch (err: unknown) {
          controller.error(err instanceof Error ? err : new Error(String(err)));
          return;
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (e: unknown) {
    return new Response(`Bad request: ${String(e)}`, { status: 400 });
  }
}


