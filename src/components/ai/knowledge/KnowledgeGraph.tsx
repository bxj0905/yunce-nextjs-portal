"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";

const KnowledgeGraph: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const graphNodes = [
    { id: "1", label: "云策AI", type: "company", connections: 8 },
    { id: "2", label: "知识管理", type: "concept", connections: 5 },
    { id: "3", label: "数据处理", type: "concept", connections: 6 },
    { id: "4", label: "智能分析", type: "concept", connections: 4 },
    { id: "5", label: "用户手册", type: "document", connections: 3 },
    { id: "6", label: "API文档", type: "document", connections: 2 },
  ];

  const getNodeTypeColor = (type: string) => {
    switch (type) {
      case "company":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "concept":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "document":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  const getNodeTypeText = (type: string) => {
    switch (type) {
      case "company":
        return "公司";
      case "concept":
        return "概念";
      case "document":
        return "文档";
      default:
        return "未知";
    }
  };

  return (
    <ComponentCard title="知识图谱" desc="可视化知识关系和实体连接">
      <div className="space-y-6">
        {/* 图谱统计 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg dark:bg-blue-900/20">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">156</div>
            <div className="text-xs text-blue-800 dark:text-blue-300">实体数量</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg dark:bg-green-900/20">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">342</div>
            <div className="text-xs text-green-800 dark:text-green-300">关系数量</div>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg dark:bg-purple-900/20">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">12</div>
            <div className="text-xs text-purple-800 dark:text-purple-300">概念类别</div>
          </div>
        </div>

        {/* 图谱可视化区域 */}
        <div className="relative h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 dark:bg-gray-800 dark:border-gray-600">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">知识图谱可视化</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">点击下方节点查看详情</p>
            </div>
          </div>
        </div>

        {/* 节点列表 */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">知识实体</h4>
          <div className="grid grid-cols-1 gap-2">
            {graphNodes.map((node) => (
              <div
                key={node.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedNode === node.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                }`}
                onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getNodeTypeColor(node.type)}`}>
                      {getNodeTypeText(node.type)}
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {node.label}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {node.connections} 连接
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex space-x-3">
          <Button size="sm" variant="outline" className="flex-1">
            构建图谱
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            导出图谱
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
};

export default KnowledgeGraph;
