import { NextRequest } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return new Response("Missing server API key", { status: 500 });
    }

    const { messages, temperature = 0.7 } = await req.json();

    const dsRes = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages,
        temperature,
        stream: true,
      }),
    });

    if (!dsRes.ok || !dsRes.body) {
      const txt = await dsRes.text().catch(() => "");
      return new Response(`Upstream error: ${txt || dsRes.statusText}`, { status: 500 });
    }

    const encoder = new TextEncoder();
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
        } catch (err: any) {
          controller.error(err);
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
  } catch (e: any) {
    return new Response(`Bad request: ${String(e)}`, { status: 400 });
  }
}


