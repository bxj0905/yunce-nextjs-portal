"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroQuickAsk() {
  const router = useRouter();
  const [quickQuestion, setQuickQuestion] = useState("");

  const go = () => {
    const q = quickQuestion.trim();
    if (!q) return;
    router.push(`/chat?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="relative rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm focus-within:ring-2 focus-within:ring-violet-500/20 dark:border-neutral-700 dark:bg-neutral-800/70">
        {/* left icon */}
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-neutral-400">
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6"/><path d="m7 12 5-5 5 5"/></svg>
        </div>
        <textarea
          rows={1}
          value={quickQuestion}
          onChange={(e) => setQuickQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              go();
            }
          }}
          className="block w-full resize-none border-0 bg-transparent px-10 pr-16 py-3 text-[15px] leading-6 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 dark:text-neutral-100 dark:placeholder:text-neutral-500"
          placeholder="试着问：帮我清洗这份客户交易数据并做趋势分析？"
        />
        {/* send button */}
        <button
          type="button"
          onClick={go}
          className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-primary btn-circle btn-sm"
          title="发送"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M22 2L11 13"/>
            <path d="M22 2l-7 20-4-9-9-4 20-7z"/>
          </svg>
        </button>
      </div>
      <div className="mt-1 text-xs text-gray-500 dark:text-neutral-400 text-right">Enter 发送 · Shift+Enter 换行</div>
    </div>
  );
}
