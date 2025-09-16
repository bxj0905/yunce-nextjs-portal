import type { Metadata } from "next";
import React from "react";
import KnowledgeBaseManager from "@/components/ai/knowledge/KnowledgeBaseManager";
import DocumentProcessor from "@/components/ai/knowledge/DocumentProcessor";
import KnowledgeGraph from "@/components/ai/knowledge/KnowledgeGraph";
import SmartQASystem from "@/components/ai/knowledge/SmartQASystem";

export const metadata: Metadata = {
  title: "云策AI - AI知识管理",
  description: "云策AI智能知识管理系统",
};

export default function KnowledgeManagement() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* 知识库管理 */}
      <div className="col-span-12 xl:col-span-8">
        <KnowledgeBaseManager />
      </div>

      {/* 文档处理 */}
      <div className="col-span-12 xl:col-span-4">
        <DocumentProcessor />
      </div>

      {/* 知识图谱 */}
      <div className="col-span-12 xl:col-span-6">
        <KnowledgeGraph />
      </div>

      {/* 智能问答 */}
      <div className="col-span-12 xl:col-span-6">
        <SmartQASystem />
      </div>
    </div>
  );
}
