"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";

const DataSourceManager: React.FC = () => {
  const [dataSources, setDataSources] = useState([
    {
      id: "1",
      name: "五经普数据库",
      type: "database",
      status: "connected",
      lastSync: "2分钟前",
      records: "1,234,567",
    },
    {
      id: "2",
      name: "企业名录文件",
      type: "file",
      status: "connected",
      lastSync: "5分钟前",
      records: "89,123",
    },
    {
      id: "3",
      name: "统计部门API",
      type: "api",
      status: "disconnected",
      lastSync: "1小时前",
      records: "0",
    },
    {
      id: "4",
      name: "普查数据仓库",
      type: "database",
      status: "connected",
      lastSync: "10分钟前",
      records: "456,789",
    },
  ]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "database":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
          </svg>
        );
      case "file":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case "api":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20";
      case "disconnected":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20";
      case "syncing":
        return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "connected":
        return "已连接";
      case "disconnected":
        return "未连接";
      case "syncing":
        return "同步中";
      default:
        return status;
    }
  };

  const handleSync = (id: string) => {
    setDataSources(prev =>
      prev.map(source =>
        source.id === id
          ? { ...source, status: "syncing", lastSync: "同步中..." }
          : source
      )
    );

    // 模拟同步过程
    setTimeout(() => {
      setDataSources(prev =>
        prev.map(source =>
          source.id === id
            ? { ...source, status: "connected", lastSync: "刚刚" }
            : source
        )
      );
    }, 2000);
  };

  const handleConnect = (id: string) => {
    setDataSources(prev =>
      prev.map(source =>
        source.id === id
          ? { ...source, status: "connected", lastSync: "刚刚" }
          : source
      )
    );
  };

  return (
    <ComponentCard title="五经普数据源管理" desc="管理五经普数据源连接和同步">
      <div className="space-y-4">
        {dataSources.map((source) => (
          <div
            key={source.id}
            className="p-4 bg-gray-50 rounded-lg dark:bg-gray-800"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg dark:bg-blue-900/20">
                  <div className="text-blue-600 dark:text-blue-400">
                    {getTypeIcon(source.type)}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {source.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {source.type}
                  </p>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                  source.status
                )}`}
              >
                {getStatusText(source.status)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">记录数</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {source.records}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">最后同步</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {source.lastSync}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {source.status === "connected" ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSync(source.id)}
                  className="flex-1"
                >
                  同步
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => handleConnect(source.id)}
                  className="flex-1"
                >
                  连接
                </Button>
              )}
              <Button size="sm" variant="outline" className="flex-1">
                配置
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button variant="outline" className="w-full">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          添加数据源
        </Button>
      </div>
    </ComponentCard>
  );
};

export default DataSourceManager;
