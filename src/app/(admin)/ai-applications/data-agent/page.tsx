import type { Metadata } from "next";
import React from "react";
import DataAgentDashboard from "@/components/ai/data-agent/DataAgentDashboard";
import WorkflowManager from "@/components/ai/data-agent/WorkflowManager";
import DataPipeline from "@/components/ai/data-agent/DataPipeline";
import AgentMonitor from "@/components/ai/data-agent/AgentMonitor";

export const metadata: Metadata = {
  title: "云策AI - Data Agent",
  description: "云策AI智能数据代理系统",
};

export default function DataAgent() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Data Agent 仪表板 */}
      <div className="col-span-12">
        <DataAgentDashboard />
      </div>

      {/* 工作流管理 */}
      <div className="col-span-12 xl:col-span-8">
        <WorkflowManager />
      </div>

      {/* Agent 监控 */}
      <div className="col-span-12 xl:col-span-4">
        <AgentMonitor />
      </div>

      {/* 数据管道 */}
      <div className="col-span-12">
        <DataPipeline />
      </div>
    </div>
  );
}
