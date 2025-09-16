"use client";
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";

const DataAgentDashboard: React.FC = () => {

  const agentStats = [
    {
      title: "活跃Agent",
      value: "3",
      unit: "个",
      change: "+1",
      changeType: "positive" as const,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "处理任务",
      value: "1,234",
      unit: "个",
      change: "+156",
      changeType: "positive" as const,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      title: "数据吞吐量",
      value: "2.3",
      unit: "GB/小时",
      change: "+15.2%",
      changeType: "positive" as const,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
    },
    {
      title: "成功率",
      value: "99.2",
      unit: "%",
      change: "+0.3%",
      changeType: "positive" as const,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];


  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {agentStats.map((stat, index) => (
        <ComponentCard key={index} title={stat.title} desc="Data Agent 运行状态">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                  {stat.unit}
                </span>
              </div>
              <div className="flex items-center mt-2">
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === "positive"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                  较昨日
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg dark:bg-blue-900/20">
              <div className="text-blue-600 dark:text-blue-400">
                {stat.icon}
              </div>
            </div>
          </div>
        </ComponentCard>
      ))}
    </div>
  );
};

export default DataAgentDashboard;
