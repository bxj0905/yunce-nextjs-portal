import type { Metadata } from "next";
import React from "react";
import DataProcessingDashboard from "@/components/data-processing/DataProcessingDashboard";
import ProcessingStats from "@/components/data-processing/ProcessingStats";
import DataSourceManager from "@/components/data-processing/DataSourceManager";
import ProcessingHistory from "@/components/data-processing/ProcessingHistory";

export const metadata: Metadata = {
  title: "云策AI - 五经普数据处理系统",
  description: "云策AI五经普数据处理系统管理平台",
};

export default function DataProcessingPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* 处理统计概览 */}
      <div className="col-span-12">
        <ProcessingStats />
      </div>

      {/* 主控制面板 */}
      <div className="col-span-12 xl:col-span-8">
        <DataProcessingDashboard />
      </div>

      {/* 数据源管理 */}
      <div className="col-span-12 xl:col-span-4">
        <DataSourceManager />
      </div>

      {/* 处理历史 */}
      <div className="col-span-12">
        <ProcessingHistory />
      </div>
    </div>
  );
}
