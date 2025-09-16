import type { Metadata } from "next";
import React from "react";
import HeroQuickAsk from "./HeroQuickAsk";
import HomeGrid from "./HomeGrid";
import {
  DataAgentVisual,
  KnowledgeManagementVisual,
  DataInsightsVisual,
  SmartOfficeVisual,
  DataProcessingVisual,
  EcommerceVisual,
} from "@/components/common/CardVisuals";

export const metadata: Metadata = {
  title: "云策AI - 首页",
  description: "云策AI管理平台首页",
};

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const allModules = [
    {
      title: "Data Agent",
      description: "DataAgent 企业数据专家。深度理解和运用企业数据，构建自主化数据大脑，释放数据价值",
      href: "/ai-applications/data-agent",
      visualElement: <DataAgentVisual />,
    },
    {
      title: "AI知识管理",
      description: "多模态内容理解、可交互推理过程、个性化探索指南，你的知识管理专家在线解答",
      href: "/ai-applications/knowledge-management",
      visualElement: <KnowledgeManagementVisual />,
    },
    {
      title: "智能数据洞察",
      description: "兼容主流模型，支持多模态交互和意图识别，支持融合数字人",
      href: "/ai-applications/intelligent-insights",
      visualElement: <DataInsightsVisual />,
    },
    {
      title: "智慧办公",
      description: "AI驱动的办公自动化平台，包含智能文档处理、会议助手、任务管理等办公场景",
      href: "/ai-applications/smart-office",
      visualElement: <SmartOfficeVisual />,
    },
    {
      title: "五经普数据处理系统",
      description: "管理和处理第五次全国经济普查数据，包括数据清洗、标准化、汇总和报表生成等功能",
      href: "/data-processing",
      visualElement: <DataProcessingVisual />,
    },
          {
            title: "智能数据仪表板",
            description: "智能数据分析和监控，包括业务指标、用户行为分析、数据可视化等",
            href: "/ecommerce",
            visualElement: <EcommerceVisual />,
          },
  ];

  const cardImages = [
    `/images/cards/data-agent.svg`,
    `/images/cards/knowledge-management.svg`,
    `/images/cards/intelligent-insights.svg`,
    `/images/cards/smart-office.svg`,
    `/images/cards/data-processing.svg`,
    `/images/cards/smart-dashboard.svg`,
  ];

  // 可选的视频封面（与 allModules 顺序一一对应）。
  // 若对应索引存在视频路径，则卡片渲染 <video>，否则回退到对应的图片。
  // 请将视频文件放到 public/videos/cards 下（示例占位路径如下）。
  const cardVideos: (string | undefined)[] = [
    `/video/dataagent.mp4`,
    `/video/knowledge-management.mp4`,
    `/video/intelligent-insights.mp4`,
    `/video/smart-office.mp4`,
    `/video/data-processing.mp4`,
    `/video/smart-dashboard.mp4`,
  ];

  // 媒体渲染交给客户端组件 CardMedia（浏览器端探测视频可用性）

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[520px] md:min-h-[680px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-center md:bg-top"
          style={{ backgroundImage: `url(${basePath}/images/hero/hero-bg.png)` }}
        ></div>
        <div className="relative z-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          {/* Announcement Banner */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-sm text-gray-800 p-1 ps-3 rounded-full dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200">
              AI 2.0 版本发布
            </div>
          </div>
          {/* End Announcement Banner */}

          {/* Title */}
          <div className="mt-5 max-w-2xl text-center mx-auto">
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
              云策
              <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">AI</span>
            </h1>
          </div>
          {/* End Title */}

          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-lg text-gray-600 dark:text-neutral-400">云策AI是新一代智能管理平台，集成多种AI智能应用，提供知识管理、数据处理、智能分析、智慧办公等全方位AI服务，让您的业务更智能、更高效。</p>
          </div>

          {/* Quick Ask Only */}
          <div className="mt-8 gap-3 flex justify-center">
            <HeroQuickAsk />
          </div>
        </div>
      </div>

      {/* 功能模块区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            功能模块
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            强大的AI能力和专业工具，助力您的业务智能化升级
          </p>
        </div>
        
        <HomeGrid allModules={allModules} cardImages={cardImages} cardVideos={cardVideos} />
      </div>

      {/* Footer */}
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <aside>
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current">
            <path
              d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p>
          成都云策数据科技有限公司
            <br />
            提供可靠的智能数据技术服务
          </p>
        </aside>
        <nav>
          <h6 className="footer-title">AI服务</h6>
          <a className="link link-hover">AI知识管理</a>
          <a className="link link-hover">Data Agent</a>
          <a className="link link-hover">智能数据洞察</a>
          <a className="link link-hover">智慧办公</a>
        </nav>
        <nav>
          <h6 className="footer-title">公司</h6>
          <a className="link link-hover">关于我们</a>
          <a className="link link-hover">联系我们</a>
          <a className="link link-hover">招聘信息</a>
          <a className="link link-hover">新闻中心</a>
        </nav>
        <nav>
          <h6 className="footer-title">法律条款</h6>
          <a className="link link-hover">使用条款</a>
          <a className="link link-hover">隐私政策</a>
          <a className="link link-hover">Cookie政策</a>
        </nav>
      </footer>
    </div>
  );
}