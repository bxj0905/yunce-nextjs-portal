"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";

const DocumentProcessor: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const processingTasks = [
    {
      id: "1",
      fileName: "产品手册.pdf",
      status: "completed",
      progress: 100,
      extractedText: "15,234 字符",
      entities: "89 个实体",
    },
    {
      id: "2",
      fileName: "技术文档.docx",
      status: "processing",
      progress: 65,
      extractedText: "8,456 字符",
      entities: "正在提取...",
    },
    {
      id: "3",
      fileName: "用户指南.pdf",
      status: "pending",
      progress: 0,
      extractedText: "等待处理",
      entities: "等待处理",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20";
      case "processing":
        return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20";
      case "pending":
        return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20";
      case "failed":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20";
      default:
        return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/20";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "已完成";
      case "processing":
        return "处理中";
      case "pending":
        return "等待中";
      case "failed":
        return "失败";
      default:
        return status;
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleProcessDocuments = () => {
    setIsProcessing(true);
    // 模拟处理过程
    setTimeout(() => {
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <ComponentCard title="文档处理" desc="智能文档解析和内容提取">
      <div className="space-y-6">
        {/* 文件上传 */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center dark:border-gray-600">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <div className="mt-4">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
                点击上传文档
              </span>
              <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                支持 PDF, DOCX, TXT 格式
              </span>
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              accept=".pdf,.docx,.txt"
              onChange={handleFileUpload}
              className="sr-only"
            />
          </div>
        </div>

        {/* 处理统计 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg dark:bg-blue-900/20">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">23</div>
            <div className="text-xs text-blue-800 dark:text-blue-300">已处理文档</div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg dark:bg-green-900/20">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">98.5%</div>
            <div className="text-xs text-green-800 dark:text-green-300">识别准确率</div>
          </div>
        </div>

        {/* 处理任务列表 */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">处理任务</h4>
          {processingTasks.map((task) => (
            <div
              key={task.id}
              className="p-3 bg-gray-50 rounded-lg dark:bg-gray-800"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {task.fileName}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                  {getStatusText(task.status)}
                </span>
              </div>
              
              {task.status === "processing" && (
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                <div>提取文本: {task.extractedText}</div>
                <div>识别实体: {task.entities}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 处理按钮 */}
        <Button
          onClick={handleProcessDocuments}
          disabled={isProcessing || uploadedFiles.length === 0}
          className="w-full"
        >
          {isProcessing ? "处理中..." : "开始处理文档"}
        </Button>
      </div>
    </ComponentCard>
  );
};

export default DocumentProcessor;
