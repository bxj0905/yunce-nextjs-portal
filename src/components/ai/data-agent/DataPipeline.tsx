"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";

const DataPipeline: React.FC = () => {
  const [selectedPipeline, setSelectedPipeline] = useState<string | null>(null);

  const pipelines = [
    {
      id: "1",
      name: "实时数据处理管道",
      description: "处理实时数据流，包括数据清洗、转换和存储",
      status: "running",
      throughput: "1.2K records/sec",
      latency: "45ms",
      stages: 4,
      lastUpdate: "2分钟前",
    },
    {
      id: "2",
      name: "批量数据处理管道",
      description: "处理大批量历史数据，支持并行处理和错误恢复",
      status: "running",
      throughput: "850 records/sec",
      latency: "2.3s",
      stages: 6,
      lastUpdate: "5分钟前",
    },
    {
      id: "3",
      name: "数据同步管道",
      description: "同步不同数据源之间的数据，确保数据一致性",
      status: "idle",
      throughput: "0 records/sec",
      latency: "N/A",
      stages: 3,
      lastUpdate: "1小时前",
    },
    {
      id: "4",
      name: "数据质量检查管道",
      description: "检查数据质量，识别和修复数据问题",
      status: "error",
      throughput: "0 records/sec",
      latency: "N/A",
      stages: 5,
      lastUpdate: "30分钟前",
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

  return (
    <ComponentCard title="数据管道" desc="管理和监控数据处理管道">
      <div className="space-y-6">
        {/* 管道统计 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="p-4 bg-blue-50 rounded-lg dark:bg-blue-900/20">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">4</div>
            <div className="text-sm text-blue-800 dark:text-blue-300">总管道数</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg dark:bg-green-900/20">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">2</div>
            <div className="text-sm text-green-800 dark:text-green-300">运行中</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg dark:bg-yellow-900/20">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">2.05K</div>
            <div className="text-sm text-yellow-800 dark:text-yellow-300">总吞吐量</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg dark:bg-purple-900/20">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">1.2s</div>
            <div className="text-sm text-purple-800 dark:text-purple-300">平均延迟</div>
          </div>
        </div>

        {/* 管道列表 */}
        <div className="space-y-4">
          {pipelines.map((pipeline) => (
            <div
              key={pipeline.id}
              className={`p-4 border rounded-lg transition-colors ${
                selectedPipeline === pipeline.id
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              }`}
              onClick={() => setSelectedPipeline(selectedPipeline === pipeline.id ? null : pipeline.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                      {pipeline.name}
                    </h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(pipeline.status)}`}>
                      {getStatusText(pipeline.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {pipeline.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <div>
                      <span className="font-medium">吞吐量:</span> {pipeline.throughput}
                    </div>
                    <div>
                      <span className="font-medium">延迟:</span> {pipeline.latency}
                    </div>
                    <div>
                      <span className="font-medium">阶段数:</span> {pipeline.stages}
                    </div>
                    <div>
                      <span className="font-medium">最后更新:</span> {pipeline.lastUpdate}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <Button size="sm" variant="outline">
                    查看详情
                  </Button>
                  <Button size="sm" variant="outline">
                    {pipeline.status === "running" ? "停止" : "启动"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 管道可视化 */}
        <div className="p-6 bg-gray-50 rounded-lg dark:bg-gray-800">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">管道流程图</h4>
          <div className="flex items-center justify-center h-32 bg-white rounded border-2 border-dashed border-gray-300 dark:bg-gray-700 dark:border-gray-600">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">管道流程图</p>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex space-x-3">
          <Button>创建管道</Button>
          <Button variant="outline">导入配置</Button>
          <Button variant="outline">批量操作</Button>
        </div>
      </div>
    </ComponentCard>
  );
};

export default DataPipeline;
