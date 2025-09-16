"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";

const WorkflowManager: React.FC = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);

  const workflows = [
    {
      id: "1",
      name: "数据清洗工作流",
      description: "自动清洗和标准化数据，包括去重、格式转换、数据验证等步骤",
      status: "active",
      lastRun: "2024-01-15 14:30",
      nextRun: "2024-01-15 16:30",
      steps: 5,
      successRate: "98.5%",
    },
    {
      id: "2",
      name: "数据转换工作流",
      description: "将数据从一种格式转换为另一种格式，支持多种数据源和目标",
      status: "active",
      lastRun: "2024-01-15 13:45",
      nextRun: "2024-01-15 15:45",
      steps: 3,
      successRate: "99.2%",
    },
    {
      id: "3",
      name: "数据验证工作流",
      description: "验证数据质量和完整性，检测异常值和数据不一致性",
      status: "inactive",
      lastRun: "2024-01-14 18:00",
      nextRun: "手动触发",
      steps: 4,
      successRate: "97.8%",
    },
    {
      id: "4",
      name: "报表生成工作流",
      description: "自动生成各类数据报表，包括统计图表和汇总信息",
      status: "active",
      lastRun: "2024-01-15 12:00",
      nextRun: "2024-01-16 12:00",
      steps: 6,
      successRate: "99.8%",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20";
      case "inactive":
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20";
      case "error":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "运行中";
      case "inactive":
        return "已停止";
      case "error":
        return "错误";
      default:
        return status;
    }
  };

  return (
    <ComponentCard title="工作流管理" desc="管理和监控Data Agent工作流程">
      <div className="space-y-6">
        {/* 工作流统计 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="p-4 bg-blue-50 rounded-lg dark:bg-blue-900/20">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">4</div>
            <div className="text-sm text-blue-800 dark:text-blue-300">总工作流</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg dark:bg-green-900/20">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">3</div>
            <div className="text-sm text-green-800 dark:text-green-300">运行中</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg dark:bg-yellow-900/20">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">1</div>
            <div className="text-sm text-yellow-800 dark:text-yellow-300">已停止</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg dark:bg-purple-900/20">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">98.8%</div>
            <div className="text-sm text-purple-800 dark:text-purple-300">平均成功率</div>
          </div>
        </div>

        {/* 工作流列表 */}
        <div className="space-y-4">
          {workflows.map((workflow) => (
            <div
              key={workflow.id}
              className={`p-4 border rounded-lg transition-colors ${
                selectedWorkflow === workflow.id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              }`}
              onClick={() => setSelectedWorkflow(selectedWorkflow === workflow.id ? null : workflow.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {workflow.name}
                    </h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(workflow.status)}`}>
                      {getStatusText(workflow.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {workflow.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <div>
                      <span className="font-medium">最后运行:</span> {workflow.lastRun}
                    </div>
                    <div>
                      <span className="font-medium">下次运行:</span> {workflow.nextRun}
                    </div>
                    <div>
                      <span className="font-medium">步骤数:</span> {workflow.steps}
                    </div>
                    <div>
                      <span className="font-medium">成功率:</span> {workflow.successRate}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <Button size="sm" variant="outline">
                    编辑
                  </Button>
                  <Button size="sm" variant="outline">
                    {workflow.status === "active" ? "停止" : "启动"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 操作按钮 */}
        <div className="flex space-x-3">
          <Button>创建工作流</Button>
          <Button variant="outline">导入工作流</Button>
          <Button variant="outline">批量操作</Button>
        </div>
      </div>
    </ComponentCard>
  );
};

export default WorkflowManager;
