import type { Metadata } from "next";
import React from "react";
import NavigationCard from "@/components/common/NavigationCard";
import ComponentCard from "@/components/common/ComponentCard";

export const metadata: Metadata = {
  title: "云策AI - AI应用中心",
  description: "云策AI智能应用管理平台",
};

export default function AIApplications() {
  const aiApplications = [
    {
      title: "AI知识管理",
      description: "智能知识库管理，支持文档检索、知识图谱构建、智能问答等功能，让知识管理更高效",
      href: "/ai-applications/knowledge-management",
      imageSrc: "/images/cards/card-01.jpg",
      imageAlt: "AI知识管理",
      badge: "知识智能",
      badgeColor: "blue" as const,
    },
    {
      title: "Data Agent",
      description: "智能数据代理，自动化数据处理流程，支持数据清洗、转换、分析和报告生成",
      href: "/ai-applications/data-agent",
      imageSrc: "/images/cards/card-02.jpg",
      imageAlt: "Data Agent",
      badge: "数据智能",
      badgeColor: "green" as const,
    },
    {
      title: "智能数据洞察",
      description: "基于AI的数据分析和洞察平台，提供预测分析、趋势识别、异常检测等智能功能",
      href: "/ai-applications/intelligent-insights",
      imageSrc: "/images/cards/card-03.jpg",
      imageAlt: "智能数据洞察",
      badge: "分析智能",
      badgeColor: "purple" as const,
    },
    {
      title: "智慧办公",
      description: "AI驱动的办公自动化平台，包含智能文档处理、会议助手、任务管理等办公场景",
      href: "/ai-applications/smart-office",
      imageSrc: "/images/cards/card-01.png",
      imageAlt: "智慧办公",
      badge: "办公智能",
      badgeColor: "yellow" as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* 欢迎区域 */}
      <ComponentCard title="AI应用中心" desc="探索云策AI的智能应用生态">
        <div className="text-center py-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            云策AI应用中心
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            集成多种AI智能应用，提供知识管理、数据处理、智能分析、智慧办公等全方位AI服务。
            让AI技术赋能您的业务，提升工作效率和决策质量。
          </p>
        </div>
      </ComponentCard>

      {/* AI应用导航卡片 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {aiApplications.map((app, index) => (
          <NavigationCard
            key={index}
            title={app.title}
            description={app.description}
            href={app.href}
            imageSrc={app.imageSrc}
            imageAlt={app.imageAlt}
            badge={app.badge}
            badgeColor={app.badgeColor}
          />
        ))}
      </div>

      {/* AI能力概览 */}
      <ComponentCard title="AI能力概览" desc="云策AI的核心技术能力">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg dark:bg-blue-900/20">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">NLP</div>
            <div className="text-sm text-blue-800 dark:text-blue-300">自然语言处理</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg dark:bg-green-900/20">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">ML</div>
            <div className="text-sm text-green-800 dark:text-green-300">机器学习</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg dark:bg-purple-900/20">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">DL</div>
            <div className="text-sm text-purple-800 dark:text-purple-300">深度学习</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg dark:bg-yellow-900/20">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">KG</div>
            <div className="text-sm text-yellow-800 dark:text-yellow-300">知识图谱</div>
          </div>
        </div>
      </ComponentCard>

      {/* 使用统计 */}
      <ComponentCard title="使用统计" desc="AI应用的使用情况和效果">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg dark:from-blue-900/20 dark:to-blue-800/20">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">1,234</div>
            <div className="text-sm text-blue-800 dark:text-blue-300 mb-1">AI查询次数</div>
            <div className="text-xs text-blue-600 dark:text-blue-400">今日</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg dark:from-green-900/20 dark:to-green-800/20">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">98.5%</div>
            <div className="text-sm text-green-800 dark:text-green-300 mb-1">准确率</div>
            <div className="text-xs text-green-600 dark:text-green-400">平均</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg dark:from-purple-900/20 dark:to-purple-800/20">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">2.3s</div>
            <div className="text-sm text-purple-800 dark:text-purple-300 mb-1">响应时间</div>
            <div className="text-xs text-purple-600 dark:text-purple-400">平均</div>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}
