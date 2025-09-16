"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";

const ProcessingHistory: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const processingHistory = [
    {
      id: "1",
      name: "五经普企业数据整理",
      startTime: "2024-01-15 14:30:25",
      endTime: "2024-01-15 14:35:42",
      duration: "5分17秒",
      status: "completed",
      records: "1,234,567",
      successRate: "99.8%",
    },
    {
      id: "2",
      name: "经济普查数据清洗",
      startTime: "2024-01-15 13:15:10",
      endTime: "2024-01-15 13:18:33",
      duration: "3分23秒",
      status: "completed",
      records: "89,123",
      successRate: "100%",
    },
    {
      id: "3",
      name: "统计报表处理",
      startTime: "2024-01-15 12:45:00",
      endTime: "2024-01-15 12:47:15",
      duration: "2分15秒",
      status: "failed",
      records: "456,789",
      successRate: "85.2%",
    },
    {
      id: "4",
      name: "普查数据同步",
      startTime: "2024-01-15 11:20:30",
      endTime: "2024-01-15 11:25:45",
      duration: "5分15秒",
      status: "completed",
      records: "23,456",
      successRate: "98.5%",
    },
    {
      id: "5",
      name: "五经普数据汇总",
      startTime: "2024-01-15 10:10:20",
      endTime: "2024-01-15 10:15:30",
      duration: "5分10秒",
      status: "completed",
      records: "567,890",
      successRate: "99.9%",
    },
    {
      id: "6",
      name: "普查指标计算",
      startTime: "2024-01-15 09:30:15",
      endTime: "2024-01-15 09:35:20",
      duration: "5分5秒",
      status: "completed",
      records: "123,456",
      successRate: "100%",
    },
    {
      id: "7",
      name: "数据质量审核",
      startTime: "2024-01-15 08:45:00",
      endTime: "2024-01-15 08:50:10",
      duration: "5分10秒",
      status: "completed",
      records: "789,012",
      successRate: "97.8%",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20";
      case "failed":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20";
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
      case "completed":
        return "已完成";
      case "failed":
        return "失败";
      case "running":
        return "运行中";
      case "pending":
        return "等待中";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case "failed":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case "running":
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const totalPages = Math.ceil(processingHistory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = processingHistory.slice(startIndex, endIndex);

  return (
    <ComponentCard title="五经普处理历史" desc="查看五经普数据处理任务的执行历史">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                任务名称
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                开始时间
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                耗时
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                记录数
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                成功率
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                状态
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="py-3 px-4">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </p>
                </td>
                <td className="py-3 px-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.startTime}
                  </p>
                </td>
                <td className="py-3 px-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.duration}
                  </p>
                </td>
                <td className="py-3 px-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.records}
                  </p>
                </td>
                <td className="py-3 px-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.successRate}
                  </p>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {getStatusIcon(item.status)}
                    {getStatusText(item.status)}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      查看
                    </Button>
                    {item.status === "failed" && (
                      <Button size="sm" variant="outline">
                        重试
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 分页 */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          显示 {startIndex + 1} - {Math.min(endIndex, processingHistory.length)} 条，共 {processingHistory.length} 条记录
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            上一页
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            下一页
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
};

export default ProcessingHistory;
