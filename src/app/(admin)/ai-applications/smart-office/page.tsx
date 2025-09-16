import type { Metadata } from "next";
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";

export const metadata: Metadata = {
  title: "云策AI - 智慧办公",
  description: "云策AI智慧办公自动化平台",
};

export default function SmartOffice() {
  return (
    <div className="space-y-6">
      <ComponentCard title="智慧办公" desc="AI驱动的办公自动化平台">
        <div className="text-center py-12">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">智慧办公</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            包含智能文档处理、会议助手、任务管理等办公场景
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            功能开发中，敬请期待...
          </p>
        </div>
      </ComponentCard>
    </div>
  );
}
