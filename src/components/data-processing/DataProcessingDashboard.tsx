"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";

const DataProcessingDashboard: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const dataSources = [
    { id: "1", name: "企业基础信息", status: "active", lastUpdate: "2分钟前" },
    { id: "2", name: "经济普查数据", status: "active", lastUpdate: "5分钟前" },
    { id: "3", name: "统计报表", status: "processing", lastUpdate: "正在处理" },
    { id: "4", name: "调查问卷", status: "inactive", lastUpdate: "1小时前" },
  ];

  const processingTasks = [
    {
      id: "1",
      name: "数据质量检查",
      status: "completed",
      progress: 100,
      duration: "2分30秒",
    },
    {
      id: "2",
      name: "数据标准化",
      status: "running",
      progress: 65,
      duration: "1分45秒",
    },
    {
      id: "3",
      name: "数据汇总",
      status: "pending",
      progress: 0,
      duration: "等待中",
    },
    {
      id: "4",
      name: "报表生成",
      status: "pending",
      progress: 0,
      duration: "等待中",
    },
  ];

  const handleStartProcessing = () => {
    setIsProcessing(true);
    // 模拟处理过程
    setTimeout(() => {
      setIsProcessing(false);
    }, 5000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20";
      case "processing":
        return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20";
      case "inactive":
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20";
      case "completed":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20";
      case "running":
        return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20";
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "活跃";
      case "processing":
        return "处理中";
      case "inactive":
        return "未激活";
      case "completed":
        return "已完成";
      case "running":
        return "运行中";
      case "pending":
        return "等待中";
      default:
        return status;
    }
  };

  return (
    <ComponentCard title="五经普数据处理控制台" desc="管理和监控五经普数据处理任务">
      {/* 数据源状态 */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          数据源状态
        </h4>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {dataSources.map((source) => (
            <div
              key={source.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg dark:bg-gray-800"
            >
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {source.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  最后更新: {source.lastUpdate}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                  source.status
                )}`}
              >
                {getStatusText(source.status)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 处理任务 */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-900 dark:text-white mb-4">
          处理任务
        </h4>
        <div className="space-y-3">
          {processingTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg dark:bg-gray-800"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {task.name}
                  </p>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {getStatusText(task.status)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  进度: {task.progress}% | 耗时: {task.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 控制按钮 */}
      <div className="flex gap-3">
        <Button
          onClick={handleStartProcessing}
          disabled={isProcessing}
          className="flex-1"
        >
          {isProcessing ? "处理中..." : "开始处理"}
        </Button>
        <Button variant="outline" className="flex-1">
          停止处理
        </Button>
      </div>
    </ComponentCard>
  );
};

export default DataProcessingDashboard;
