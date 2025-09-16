"use client";

import React, { useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  thinking?: string;
  tone?:
    | "primary"
    | "secondary"
    | "accent"
    | "neutral"
    | "info"
    | "success"
    | "warning"
    | "error";
};

type ChatSession = {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
};

const STORAGE_KEY = "yunce_ai_chat_sessions_v1";

export default function ChatPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const withBaseOnce = (p: string) => {
    if (p.startsWith("http")) return p;
    if (basePath && p.startsWith(basePath + "/")) return p;
    return `${basePath}${p.startsWith("/") ? "" : "/"}${p}`;
  };

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const activeSession = useMemo(
    () => sessions.find((s) => s.id === activeId) ?? null,
    [sessions, activeId]
  );
  const messages = activeSession?.messages ?? [];
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const DEFAULT_KEY = "sk-ff6ce9a6a943401c852bc0f3229e7148";
  const [apiKey, setApiKey] = useState<string>(DEFAULT_KEY);
  const [isSending, setIsSending] = useState<boolean>(false);
  const toneClassMap: Record<NonNullable<ChatMessage["tone"]>, string> = {
    primary: "chat-bubble-primary",
    secondary: "chat-bubble-secondary",
    accent: "chat-bubble-accent",
    neutral: "chat-bubble-neutral",
    info: "chat-bubble-info",
    success: "chat-bubble-success",
    warning: "chat-bubble-warning",
    error: "chat-bubble-error",
  };

  const userAvatar = useMemo(
    () => withBaseOnce("/images/user/user-02.jpg"),
    [basePath]
  );
  const aiAvatar = useMemo(
    () => withBaseOnce("/images/logo/logo-icon.svg"),
    [basePath]
  );

  const handleSend = () => {
    const text = input.trim();
    if (!text || !activeSession) return;
    if (!apiKey) {
      alert("请先设置 DeepSeek API Key");
      return;
    }
    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      role: "user",
      text,
      tone: "primary",
    };
    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeId
          ? {
              ...s,
              title: s.messages.length === 0 ? text.slice(0, 20) : s.title,
              messages: [...s.messages, newMsg],
            }
          : s
      )
    );
    setInput("");
    // 调用 DeepSeek API（流式）
    const currentActive = activeId;
    const history = (sessions.find((s) => s.id === currentActive)?.messages || [])
      .slice(-20)
      .map((m) => ({ role: m.role, content: m.text }));
    type AIMessage = { role: "system" | "user" | "assistant"; content: string };
    const systemPrompt: AIMessage = {
      role: "system",
      content:
        "你是云策AI助手。请始终使用中文回答。回答时先进行简短的内部思考（如果模型支持返回 reasoning/思考内容，将以思考区展示），最后给出清晰结论。",
    };
    const userAndAssistantMessages = [systemPrompt, ...history, { role: "user", content: newMsg.text }];

    setIsSending(true);
    fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: userAndAssistantMessages,
        temperature: 0.7,
        stream: true,
      }),
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(await res.text());
        const reader = res.body?.getReader();
        if (!reader) throw new Error("无法读取流");

        // 先插入占位的助手消息
        const pendingId = `m-${Date.now()}-ai`;
        setSessions((prev) =>
          prev.map((s) =>
            s.id === currentActive
              ? {
                  ...s,
                  messages: [
                    ...s.messages,
                    { id: pendingId, role: "assistant", text: "", thinking: "", tone: "neutral" },
                  ],
                }
              : s
          )
        );

        const decoder = new TextDecoder("utf-8");
        let buffer = "";
        const applyDelta = (deltaText: string, reasoning?: string) => {
          setSessions((prev) =>
            prev.map((s) =>
              s.id === currentActive
                ? {
                    ...s,
                    messages: s.messages.map((m) =>
                      m.id === pendingId
                        ? {
                            ...m,
                            text: (m.text || "") + (deltaText || ""),
                            thinking: reasoning !== undefined ? (m.thinking || "") + reasoning : m.thinking,
                          }
                        : m
                    ),
                  }
                : s
            )
          );
        };

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split(/\n/);
          buffer = lines.pop() || "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            if (trimmed.startsWith("data:")) {
              const dataStr = trimmed.replace(/^data:\s*/, "");
              if (dataStr === "[DONE]") continue;
              try {
                const json = JSON.parse(dataStr);
                const delta = json?.choices?.[0]?.delta?.content ?? "";
                const reason = json?.choices?.[0]?.delta?.reasoning_content ?? undefined;
                if (delta || reason) applyDelta(delta, reason);
              } catch {}
            }
          }
        }
      })
      .catch((e) => {
        setSessions((prev) =>
          prev.map((s) =>
            s.id === currentActive
              ? {
                  ...s,
                  messages: [
                    ...s.messages,
                    {
                      id: `m-${Date.now()}-err`,
                      role: "assistant",
                      text: `调用失败：${String(e)}`,
                      tone: "error",
                    },
                  ],
                }
              : s
          )
        );
      })
      .finally(() => {
        setIsSending(false);
        containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
      });
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
  };

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: ChatSession[] = JSON.parse(raw);
        setSessions(parsed);
        if (parsed.length > 0) setActiveId(parsed[0].id);
      } else {
        const seed: ChatSession = {
          id: `s-${Date.now()}`,
          title: "新的对话",
          createdAt: Date.now(),
          messages: [
            { id: `m-${Date.now()}`, role: "assistant", text: "您好，我是云策AI助手。有什么可以帮您？", tone: "info" },
          ],
        };
        setSessions([seed]);
        setActiveId(seed.id);
      }
    } catch {}
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch {}
  }, [sessions]);

  React.useEffect(() => {
    try {
      const k = localStorage.getItem("DEEPSEEK_API_KEY");
      if (k) setApiKey(k);
      else setApiKey(DEFAULT_KEY);
    } catch {
      setApiKey(DEFAULT_KEY);
    }
  }, []);

  const saveKey = () => {
    try {
      localStorage.setItem("DEEPSEEK_API_KEY", apiKey.trim());
      alert("API Key 已保存到本地浏览器");
    } catch {}
  };

  const createSession = () => {
    const s: ChatSession = { id: `s-${Date.now()}`, title: "新的对话", createdAt: Date.now(), messages: [] };
    setSessions((prev) => [s, ...prev]);
    setActiveId(s.id);
  };
  const deleteSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (activeId === id) {
      const left = sessions.filter((s) => s.id !== id);
      setActiveId(left[0]?.id ?? "");
    }
  };
  const renameSession = (id: string, title: string) => {
    setSessions((prev) => prev.map((s) => (s.id === id ? { ...s, title } : s)));
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 h-[calc(100vh-2rem)]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">大模型对话</h1>
        <button className="btn btn-sm" onClick={createSession}>新建会话</button>
      </div>
      {/* 会话历史放在标题下方 */}
      <div className="rounded-2xl border border-gray-200 p-2 dark:border-gray-800 bg-white dark:bg-white/[0.03]">
        <div className="flex items-center gap-2">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-sm">会话历史</div>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-72 max-h-80 overflow-y-auto">
              {sessions.map((s) => (
                <li key={s.id}>
                  <a onClick={() => setActiveId(s.id)} className={`${s.id === activeId ? 'active' : ''}`}>
                    <span className="truncate">{s.title || '未命名会话'}</span>
                  </a>
                  {s.id === activeId && (
                    <div className="px-2 py-2 flex items-center gap-2">
                      <input
                        className="input input-bordered input-xs w-full"
                        defaultValue={s.title}
                        onBlur={(e) => renameSession(s.id, e.target.value.trim() || '未命名会话')}
                      />
                      <button className="btn btn-xs" onClick={() => deleteSession(s.id)}>删</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <button className="btn btn-sm" onClick={createSession}>新建会话</button>
        </div>
      </div>

      <section className="flex-1 flex flex-col">
        {/* API Key 设置条 */}
        <div className="rounded-2xl border border-gray-200 p-3 dark:border-gray-800 bg-white dark:bg-white/[0.03] mb-3">
          <div className="flex items-center gap-2">
            <input
              className="input input-bordered w-full"
              placeholder="请输入 DeepSeek API Key（仅保存在本地）"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
            <button className="btn" onClick={saveKey}>保存</button>
          </div>
        </div>

        <div ref={containerRef} className="flex-1 overflow-y-auto rounded-2xl border border-gray-200 p-4 dark:border-gray-800 bg-white dark:bg-white/[0.03]">
          <div className="space-y-4">
            {messages.map((m) => {
              const isUser = m.role === "user";
              const placeClass = isUser ? "chat-end" : "chat-start";
              const toneKey = (m.tone ?? (isUser ? "primary" : "neutral")) as NonNullable<ChatMessage["tone"]>;
              const bubbleTone = isUser
                ? toneClassMap[toneKey]
                : m.tone && m.tone !== "neutral"
                  ? toneClassMap[toneKey]
                  : "";
              const avatar = isUser ? userAvatar : aiAvatar;
              return (
                <div key={m.id} className={`chat ${placeClass}`}>
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image src={avatar} alt={isUser ? "User" : "AI"} width={40} height={40} />
                    </div>
                  </div>
                  <div className={`chat-bubble ${bubbleTone ? bubbleTone : ""}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
                  </div>
                  {!isUser && m.thinking && (
                    <div className="chat-footer opacity-70 text-xs mt-1">
                      <details>
                        <summary>思考过程</summary>
                        <div className="mt-1 prose prose-sm dark:prose-invert max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.thinking}</ReactMarkdown>
                        </div>
                      </details>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 p-3 mt-4 dark:border-gray-800 bg-white dark:bg-white/[0.03]">
          <div className="flex items-center gap-2">
            <input
              className="input input-bordered w-full"
              placeholder="输入消息，按 Enter 发送"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button className="btn btn-primary" onClick={handleSend} disabled={!activeSession || isSending}>{isSending ? "发送中" : "发送"}</button>
          </div>
        </div>
      </section>
    </div>
  );
}


