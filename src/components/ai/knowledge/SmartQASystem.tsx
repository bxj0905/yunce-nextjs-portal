"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";

const SmartQASystem: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      id: "1",
      question: "云策AI的主要功能有哪些？",
      answer: "云策AI提供多种智能功能，包括数据处理、知识管理、智能分析等。主要模块有：1. 五经普数据处理系统 2. AI知识管理 3. Data Agent 4. 智能数据洞察 5. 智慧办公等。",
      timestamp: "2024-01-15 14:30",
      confidence: 95,
    },
    {
      id: "2",
      question: "如何上传文档到知识库？",
      answer: "您可以通过以下步骤上传文档：1. 进入AI知识管理页面 2. 点击文档处理模块 3. 选择文件上传区域 4. 支持PDF、DOCX、TXT格式 5. 系统会自动进行文档解析和内容提取。",
      timestamp: "2024-01-15 14:25",
      confidence: 88,
    },
  ]);

  const handleSubmitQuestion = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    
    // 模拟AI回答
    setTimeout(() => {
      const newAnswer = {
        id: Date.now().toString(),
        question: question,
        answer: "这是一个模拟回答。在实际应用中，这里会调用AI模型来生成基于知识库的智能回答。",
        timestamp: new Date().toLocaleString(),
        confidence: Math.floor(Math.random() * 20) + 80, // 80-100% 置信度
      };
      
      setChatHistory(prev => [newAnswer, ...prev]);
      setQuestion("");
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmitQuestion();
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20";
    if (confidence >= 80) return "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/20";
    if (confidence >= 70) return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20";
    return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20";
  };

  return (
    <ComponentCard title="智能问答" desc="基于知识库的智能问答系统">
      <div className="space-y-6">
        {/* 问答输入 */}
        <div className="space-y-3">
          <div className="relative">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="请输入您的问题..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              rows={3}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              按 Enter 发送，Shift + Enter 换行
            </span>
            <Button
              onClick={handleSubmitQuestion}
              disabled={isLoading || !question.trim()}
              size="sm"
            >
              {isLoading ? "思考中..." : "提问"}
            </Button>
          </div>
        </div>

        {/* 问答历史 */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {chatHistory.map((item) => (
            <div key={item.id} className="space-y-3">
              {/* 问题 */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center dark:bg-blue-900/20">
                  <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{item.question}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.timestamp}</p>
                </div>
              </div>

              {/* 回答 */}
              <div className="flex items-start space-x-3 ml-11">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center dark:bg-green-900/20">
                  <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{item.answer}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{item.timestamp}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getConfidenceColor(item.confidence)}`}>
                      置信度: {item.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 快速问题 */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">快速问题</h4>
          <div className="flex flex-wrap gap-2">
            {[
              "云策AI有哪些功能？",
              "如何上传文档？",
              "数据处理流程是什么？",
              "知识图谱如何构建？"
            ].map((quickQuestion, index) => (
              <button
                key={index}
                onClick={() => setQuestion(quickQuestion)}
                className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                {quickQuestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ComponentCard>
  );
};

export default SmartQASystem;
