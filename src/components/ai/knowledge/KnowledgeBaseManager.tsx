"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";

const KnowledgeBaseManager: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const knowledgeItems = [
    {
      id: "1",
      title: "云策AI产品手册",
      category: "产品文档",
      lastUpdated: "2024-01-15",
      size: "2.3MB",
      status: "已索引",
      tags: ["产品", "手册", "AI"],
    },
    {
      id: "2",
      title: "数据处理最佳实践",
      category: "技术文档",
      lastUpdated: "2024-01-14",
      size: "1.8MB",
      status: "已索引",
      tags: ["数据处理", "最佳实践"],
    },
    {
      id: "3",
      title: "用户操作指南",
      category: "用户手册",
      lastUpdated: "2024-01-13",
      size: "3.1MB",
      status: "处理中",
      tags: ["用户指南", "操作"],
    },
    {
      id: "4",
      title: "API接口文档",
      category: "技术文档",
      lastUpdated: "2024-01-12",
      size: "1.2MB",
      status: "已索引",
      tags: ["API", "接口", "文档"],
    },
  ];

  const categories = [
    { value: "all", label: "全部" },
    { value: "产品文档", label: "产品文档" },
    { value: "技术文档", label: "技术文档" },
    { value: "用户手册", label: "用户手册" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已索引":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20";
      case "处理中":
        return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20";
      case "失败":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20";
    }
  };

  return (
    <ComponentCard title="知识库管理" desc="管理和维护企业知识库">
      <div className="space-y-6">
        {/* 搜索和筛选 */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="搜索知识库..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
              <svg
                className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <Button>上传文档</Button>
        </div>

        {/* 知识库统计 */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="p-4 bg-blue-50 rounded-lg dark:bg-blue-900/20">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">156</div>
            <div className="text-sm text-blue-800 dark:text-blue-300">总文档数</div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg dark:bg-green-900/20">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">142</div>
            <div className="text-sm text-green-800 dark:text-green-300">已索引</div>
          </div>
          <div className="p-4 bg-yellow-50 rounded-lg dark:bg-yellow-900/20">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">8</div>
            <div className="text-sm text-yellow-800 dark:text-yellow-300">处理中</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg dark:bg-purple-900/20">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">2.3GB</div>
            <div className="text-sm text-purple-800 dark:text-purple-300">存储空间</div>
          </div>
        </div>

        {/* 知识库列表 */}
        <div className="space-y-3">
          {knowledgeItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg dark:bg-gray-800"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg dark:bg-blue-900/20">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</h4>
                  <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                    <span>{item.category}</span>
                    <span>{item.size}</span>
                    <span>更新于 {item.lastUpdated}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
                <Button size="sm" variant="outline">查看</Button>
                <Button size="sm" variant="outline">编辑</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ComponentCard>
  );
};

export default KnowledgeBaseManager;
