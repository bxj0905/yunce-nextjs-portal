"use client";

import React, { useMemo, useRef, useState, useCallback, Suspense } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

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

type Attachment = {
  id: string;
  name: string;
  size: number;
  type: string;
  text?: string; // 仅文本类保存内容片段
};

const STORAGE_KEY = "yunce_ai_chat_sessions_v1";

export default function ChatPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const withBaseOnce = useCallback((p: string) => {
    if (p.startsWith("http")) return p;
    if (basePath && p.startsWith(basePath + "/")) return p;
    return `${basePath}${p.startsWith("/") ? "" : "/"}${p}`;
  }, [basePath]);

  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const activeSession = useMemo(
    () => sessions.find((s) => s.id === activeId) ?? null,
    [sessions, activeId]
  );
  const messages = activeSession?.messages ?? [];
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const [bootAsked, setBootAsked] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const userAvatar = useMemo(
    () => withBaseOnce("/images/user/user-02.jpg"),
    [withBaseOnce]
  );
  const aiAvatar = useMemo(
    () => withBaseOnce("/images/logo/logo-icon.svg"),
    [withBaseOnce]
  );

  // 将包含“思考/结论”或“Thinking/Conclusion”文本的消息做拆分渲染
  const splitReasoningAndConclusion = (text: string): { thinking: string; conclusion: string | null } | null => {
    const t = text ?? "";
    const markers = [
      { think: /(?:^|\n)\s*(?:思考|思考区|Thinking)[:：]\s*/i, concl: /(?:^|\n)\s*(?:结论|Conclusion)[:：]\s*/i },
    ];
    for (const { think, concl } of markers) {
      const thinkMatch = t.match(think);
      const conclMatch = t.match(concl);
      if (thinkMatch && conclMatch) {
        const thinkIdx = (thinkMatch.index ?? 0) + thinkMatch[0].length;
        const conclIdx = conclMatch.index ?? -1;
        if (conclIdx > thinkIdx) {
          const thinking = t.substring(thinkIdx, conclIdx).trim();
          const conclusion = t.substring(conclIdx + conclMatch[0].length).trim();
          return { thinking, conclusion };
        }
      }
      if (thinkMatch && !conclMatch) {
        const thinkIdx = (thinkMatch.index ?? 0) + thinkMatch[0].length;
        const thinking = t.substring(thinkIdx).trim();
        return { thinking, conclusion: null };
      }
    }
    return null;
  };

  const handleSend = useCallback((preset?: string) => {
    const userText = (preset ?? input).trim();
    // 构建附件上下文
    const attachmentText = attachments
      .map((a) => {
        const meta = `[附件:${a.name}, ${Math.ceil(a.size / 1024)}KB]`;
        if (a.text) {
          return `${meta}\n\n${a.text}`;
        }
        return `${meta}（非文本预览，需说明处理需求）`;
      })
      .join("\n\n");
    const text = [userText, attachmentText].filter(Boolean).join("\n\n");
    if (!text || !activeSession) return;
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
    if (!preset) setInput("");
    setAttachments([]);
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
    const apiUrl = withBaseOnce("/api/ai/chat");
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: userAndAssistantMessages,
        temperature: 0.7,
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
            try {
              const json = JSON.parse(trimmed);
              const delta = json?.delta ?? "";
              const reason = json?.reasoning ?? undefined;
                if (delta || reason) applyDelta(delta, reason);
              } catch {}
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
  }, [activeId, activeSession, input, sessions, withBaseOnce, attachments]);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: ChatSession[] = JSON.parse(raw);
        setSessions(parsed);
        if (parsed.length > 0) setActiveId(parsed[0].id);
      } else {
        setSessions([]);
      }
    } catch {}
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch {}
  }, [sessions]);

  // 页面打开后默认新建一个空会话并设为当前
  React.useEffect(() => {
    if (!loaded) return;
    const s: ChatSession = { id: `s-${Date.now()}`, title: "新的对话", createdAt: Date.now(), messages: [] };
    setSessions((prev) => [s, ...prev]);
    setActiveId(s.id);
    // 只创建一次
    // loaded 只在初次加载后为 true，随后不再变化
  }, [loaded]);

  // 若首页带来 ?q= 参数，创建会话后自动发送
  React.useEffect(() => {
    if (!loaded || !activeSession || bootAsked) return;
    const q = (searchParams?.get("q") || "").trim();
    if (!q) return;
    setBootAsked(true);
    Promise.resolve().then(() => handleSend(q));
  }, [loaded, activeSession, searchParams, bootAsked, handleSend]);

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

  const copyToClipboard = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
    } catch {}
  };

  const groupedSessions = React.useMemo(() => {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfToday.getDate() - 1);

    const today: ChatSession[] = [];
    const yesterday: ChatSession[] = [];
    const earlier: ChatSession[] = [];

    for (const s of sessions) {
      const created = new Date(s.createdAt);
      if (created >= startOfToday) today.push(s);
      else if (created >= startOfYesterday) yesterday.push(s);
      else earlier.push(s);
    }
    return { today, yesterday, earlier };
  }, [sessions]);

  

  return (
    <Suspense fallback={<div />}> 
    <div className="flex flex-col gap-4 sm:gap-6 h-[calc(100vh-2rem)]">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">大模型对话</h1>
        <div />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 flex-1 min-h-0">
        {/* 左侧：会话历史（TailAdmin 风格侧栏） */}
        <aside className="lg:col-span-3 xl:col-span-3 2xl:col-span-3 flex flex-col gap-4 min-h-0">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.03] p-4 flex flex-col flex-1 min-h-0">
            <button className="btn btn-primary w-full mb-3" onClick={createSession}>+ New Chat</button>
            <div className="mb-3">
              <input className="input input-bordered w-full" placeholder="Search..." />
            </div>
            <div className="flex-1 overflow-y-auto pr-1">
              {groupedSessions.today.length > 0 && (
                <>
                  <div className="text-xs uppercase tracking-wide text-gray-400 mb-2">Today</div>
                  <ul className="menu w-full mb-4">
                    {groupedSessions.today.map((s) => (
                <li key={s.id}>
                        <div className="flex items-center justify-between gap-2">
                          <a onClick={() => setActiveId(s.id)} className={`flex-1 ${s.id === activeId ? 'active' : ''}`}>
                    <span className="truncate">{s.title || '未命名会话'}</span>
                  </a>
                          <button className="btn btn-ghost btn-xs btn-square" title="删除" onClick={() => deleteSession(s.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-80"><path d="M9 3.75A1.5 1.5 0 0 1 10.5 2.25h3A1.5 1.5 0 0 1 15 3.75V5h4.25a.75.75 0 0 1 0 1.5H4.75a.75.75 0 0 1 0-1.5H9V3.75ZM6.75 7.5h10.5l-.674 11.08a2.25 2.25 0 0 1-2.244 2.07H9.668a2.25 2.25 0 0 1-2.244-2.07L6.75 7.5Zm3.5 2.25a.75.75 0 0 0-1.5 0l.375 8.25a.75.75 0 1 0 1.5 0L10.25 9.75Zm4.5 0a.75.75 0 0 0-1.5 0l-.375 8.25a.75.75 0 1 0 1.5 0l.375-8.25Z"/></svg>
                          </button>
                    </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {groupedSessions.yesterday.length > 0 && (
                <>
                  <div className="text-xs uppercase tracking-wide text-gray-400 mb-2">Yesterday</div>
                  <ul className="menu w-full mb-4">
                    {groupedSessions.yesterday.map((s) => (
                      <li key={s.id}>
                        <div className="flex items-center justify-between gap-2">
                          <a onClick={() => setActiveId(s.id)} className={`flex-1 ${s.id === activeId ? 'active' : ''}`}>
                            <span className="truncate">{s.title || '未命名会话'}</span>
                          </a>
                          <button className="btn btn-ghost btn-xs btn-square" title="删除" onClick={() => deleteSession(s.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-80"><path d="M9 3.75A1.5 1.5 0 0 1 10.5 2.25h3A1.5 1.5 0 0 1 15 3.75V5h4.25a.75.75 0 0 1 0 1.5H4.75a.75.75 0 0 1 0-1.5H9V3.75ZM6.75 7.5h10.5l-.674 11.08a2.25 2.25 0 0 1-2.244 2.07H9.668a2.25 2.25 0 0 1-2.244-2.07L6.75 7.5Zm3.5 2.25a.75.75 0 0 0-1.5 0l.375 8.25a.75.75 0 1 0 1.5 0L10.25 9.75Zm4.5 0a.75.75 0 0 0-1.5 0l-.375 8.25a.75.75 0 1 0 1.5 0l.375-8.25Z"/></svg>
                          </button>
                        </div>
                </li>
              ))}
            </ul>
                </>
              )}
              {groupedSessions.today.length === 0 && groupedSessions.yesterday.length === 0 && groupedSessions.earlier.length === 0 && (
                <div className="opacity-60 px-2 py-1 text-xs">暂无会话</div>
              )}
            </div>
          </div>

          
        </aside>

        {/* 右侧：主聊天区域（消息卡片 + 输入条） */}
        <section className="lg:col-span-9 xl:col-span-9 2xl:col-span-9 flex flex-col min-h-0">

          {/* 聊天消息区：卡片风格，靠左/靠右对齐，带复制 */}
          <div ref={containerRef} className="flex-1 overflow-y-auto rounded-2xl border border-gray-200 p-4 dark:border-gray-800 bg-white dark:bg-white/[0.03] min-h-0">
          <div className="space-y-4">
            {messages.map((m) => {
              const isUser = m.role === "user";
              const avatar = isUser ? userAvatar : aiAvatar;
                const split = !isUser ? splitReasoningAndConclusion(m.text) : null;
              return (
                  <div key={m.id} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start gap-3 max-w-[85%] ${isUser ? 'flex-row-reverse' : ''}`}>
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">
                      <Image src={avatar} alt={isUser ? "User" : "AI"} width={40} height={40} />
                    </div>
                      <div className="flex-1 min-w-0">
                        <div className={`rounded-2xl px-4 py-3 shadow-sm border ${isUser ? 'bg-primary/10 border-primary/20' : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-gray-800'} w-auto inline-block`}>
                          {split ? (
                            <>
                              <details className="mt-0" open>
                                <summary className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Thinking</summary>
                                <div className="mt-2 whitespace-pre-wrap text-[13px] leading-6 text-indigo-600 dark:text-indigo-400">
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{split.thinking}</ReactMarkdown>
                                </div>
                              </details>
                              {split.conclusion && (
                                <div className="mt-3 prose prose-sm dark:prose-invert max-w-none text-gray-900 dark:text-gray-100">
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{split.conclusion}</ReactMarkdown>
                  </div>
                              )}
                            </>
                          ) : (
                            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-900 dark:text-gray-100">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
                  </div>
                          )}
                  {!isUser && m.thinking && (
                            <details className="mt-3">
                              <summary className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">Thinking</summary>
                              <div className="mt-2 whitespace-pre-wrap text-[13px] leading-6 text-indigo-600 dark:text-indigo-400">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.thinking}</ReactMarkdown>
                        </div>
                      </details>
                          )}
                        </div>
                        <div className={`mt-2 ${isUser ? 'text-right' : 'text-left'}`}>
                          <button className="btn btn-ghost btn-xs" onClick={() => copyToClipboard(m.text)}>复制</button>
                        </div>
                      </div>
                    </div>
                </div>
              );
            })}
          </div>
        </div>

          {/* 输入条，含附件与发送按钮 */}
        <div className="rounded-2xl border border-gray-200 p-3 mt-4 dark:border-gray-800 bg-white dark:bg-white/[0.03]">
          <div className="flex items-stretch gap-3">
              {/* 左侧：附件列（最多占 1/3 宽度） */}
              {attachments.length > 0 && (
                <div className="basis-1/3 max-w-[33%] min-w-0 flex flex-col gap-2">
                  <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  multiple={false}
                  onChange={async (e) => {
                    const inputEl = e.currentTarget as HTMLInputElement;
                    const f = inputEl.files?.[0];
                    if (!f) return;
                    try {
                      const isText = /^text\//.test(f.type) || ["application/json", "text/csv"].includes(f.type);
                      if (isText) {
                        const text = await f.text();
                        const snippet = text.slice(0, 4000);
                        setAttachments((prev) => [
                          ...prev,
                          { id: `att-${Date.now()}`, name: f.name, size: f.size, type: f.type || "text/plain", text: snippet },
                        ]);
                      } else {
                        setAttachments((prev) => [
                          ...prev,
                          { id: `att-${Date.now()}`, name: f.name, size: f.size, type: f.type || "application/octet-stream" },
                        ]);
                      }
                    } catch {}
                    // 复位，以便可重复选择同一文件
                    if (inputEl) inputEl.value = "";
                  }}
              />
                  <button
                    className="btn btn-ghost btn-sm w-fit"
                    title="附件"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    附件
                  </button>
                  {/* 附件列表：每行一个，名称最多占 1/3 宽度 */}
                  <div className="flex flex-col gap-2 w-full max-h-40 overflow-y-auto pr-1">
                    {attachments.map((a) => (
                      <div key={a.id} className="flex items-center justify-between px-3 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs dark:bg-neutral-700 dark:text-neutral-200">
                        <div className="flex items-center gap-2 min-w-0 w-full">
                          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 14.5 8 22H2v-6l7.5-7.5"/><path d="M16 5 19 8"/></svg>
                          <span className="truncate w-full" title={`${a.name} (${Math.ceil(a.size/1024)}KB)`}>{a.name}</span>
                        </div>
                        <button className="btn btn-ghost btn-xs ml-2" onClick={() => setAttachments((prev) => prev.filter((x) => x.id !== a.id))} title="移除">×</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
 
              {/* 右侧：输入与发送，占剩余 2/3 */}
              <div className="flex-1 min-w-0 flex items-stretch gap-2">
                {/* 当无附件时，也提供上传按钮 */}
                {attachments.length === 0 && (
                  <>
                    <input ref={fileInputRef} type="file" className="hidden" onChange={async (e) => {
                      const inputEl = e.currentTarget as HTMLInputElement;
                      const f = inputEl.files?.[0];
                      if (!f) return;
                      try {
                        const isText = /^text\//.test(f.type) || ["application/json", "text/csv"].includes(f.type);
                        if (isText) {
                          const text = await f.text();
                          const snippet = text.slice(0, 4000);
                          setAttachments((prev) => [...prev, { id: `att-${Date.now()}`, name: f.name, size: f.size, type: f.type || "text/plain", text: snippet }]);
                        } else {
                          setAttachments((prev) => [...prev, { id: `att-${Date.now()}`, name: f.name, size: f.size, type: f.type || "application/octet-stream" }]);
                        }
                      } catch {}
                      if (inputEl) inputEl.value = "";
                    }} />
                    <button className="btn btn-ghost btn-sm self-start" title="附件" onClick={() => fileInputRef.current?.click()}>附件</button>
                  </>
                )}
                <textarea
                  rows={1}
                  className="textarea textarea-bordered w-full h-full min-h-[44px] resize-none"
                  placeholder="输入消息，按 Enter 发送"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <button
                  className={`btn btn-primary btn-circle self-center ${!activeSession || isSending ? 'btn-disabled' : ''}`}
                  onClick={() => handleSend()}
                  disabled={!activeSession || isSending}
                  title="发送"
                >
                  {isSending ? (
                    <span className="loading loading-spinner loading-xs" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M22 2L11 13"/>
                      <path d="M22 2l-7 20-4-9-9-4 20-7z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    </Suspense>
  );
}


