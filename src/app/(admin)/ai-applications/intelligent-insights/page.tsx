import type { Metadata } from "next";
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";

export const metadata: Metadata = {
  title: "云策AI - 智能数据洞察",
  description: "云策AI智能数据分析和洞察平台",
};

export default function IntelligentInsights() {
  return (
    <div className="space-y-6">
      <ComponentCard title="智能数据洞察" desc="基于AI的数据分析和洞察平台">
        <div className="text-center py-12">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">智能数据洞察</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            提供预测分析、趋势识别、异常检测等智能功能
          </p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            功能开发中，敬请期待...
          </p>
        </div>
      </ComponentCard>
    </div>
  );
}
