"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";

const AgentMonitor: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const agents = [
    {
      id: "1",
      name: "DataCleaner-Agent",
      type: "数据清洗",
      status: "running",
      cpu: 45,
      memory: 62,
      tasks: 8,
      uptime: "2天3小时",
    },
    {
      id: "2",
      name: "DataTransformer-Agent",
      type: "数据转换",
      status: "running",
      cpu: 32,
      memory: 48,
      tasks: 5,
      uptime: "1天8小时",
    },
    {
      id: "3",
      name: "DataValidator-Agent",
      type: "数据验证",
      status: "idle",
      cpu: 8,
      memory: 25,
      tasks: 0,
      uptime: "5天12小时",
    },
    {
      id: "4",
      name: "ReportGenerator-Agent",
      type: "报表生成",
      status: "error",
      cpu: 0,
      memory: 0,
      tasks: 0,
      uptime: "0天0小时",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20";
      case "idle":
        return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20";
      case "error":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20";
      case "stopped":
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "running":
        return "运行中";
      case "idle":
        return "空闲";
      case "error":
        return "错误";
      case "stopped":
        return "已停止";
      default:
        return status;
    }
  };

  const getResourceColor = (value: number) => {
    if (value >= 80) return "text-red-600";
    if (value >= 60) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <ComponentCard title="Agent监控" desc="实时监控Data Agent运行状态">
      <div className="space-y-6">
        {/* Agent列表 */}
        <div className="space-y-3">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedAgent === agent.id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              }`}
              onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                    {agent.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{agent.type}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(agent.status)}`}>
                  {getStatusText(agent.status)}
                </span>
              </div>

              {/* 资源使用情况 */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">CPU</span>
                  <span className={`font-medium ${getResourceColor(agent.cpu)}`}>
                    {agent.cpu}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      agent.cpu >= 80 ? "bg-red-500" : agent.cpu >= 60 ? "bg-yellow-500" : "bg-green-500"
                    }`}
                    style={{ width: `${agent.cpu}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">内存</span>
                  <span className={`font-medium ${getResourceColor(agent.memory)}`}>
                    {agent.memory}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      agent.memory >= 80 ? "bg-red-500" : agent.memory >= 60 ? "bg-yellow-500" : "bg-green-500"
                    }`}
                    style={{ width: `${agent.memory}%` }}
                  ></div>
                </div>
              </div>

              {/* Agent信息 */}
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-gray-500 dark:text-gray-400">
                <div>
                  <span className="font-medium">任务数:</span> {agent.tasks}
                </div>
                <div>
                  <span className="font-medium">运行时间:</span> {agent.uptime}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 操作按钮 */}
        <div className="space-y-2">
          <Button size="sm" className="w-full">
            启动所有Agent
          </Button>
          <Button size="sm" variant="outline" className="w-full">
            重启故障Agent
          </Button>
          <Button size="sm" variant="outline" className="w-full">
            查看详细日志
          </Button>
        </div>

        {/* 系统资源总览 */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">系统资源总览</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg dark:bg-blue-900/20">
              <div className="text-lg font-bold text-blue-600 dark:text-blue-400">21%</div>
              <div className="text-xs text-blue-800 dark:text-blue-300">平均CPU</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg dark:bg-green-900/20">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">34%</div>
              <div className="text-xs text-green-800 dark:text-green-300">平均内存</div>
            </div>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
};

export default AgentMonitor;
