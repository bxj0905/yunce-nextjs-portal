import React from "react";

// Data Agent 视觉元素
export const DataAgentVisual: React.FC = () => (
  <div className="relative h-full flex items-center justify-center">
    {/* 人物头像 */}
    <div className="relative">
      <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center">
        <div className="w-16 h-16 bg-purple-700 rounded-full flex items-center justify-center">
          <div className="w-12 h-12 bg-purple-800 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 眼镜 */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-12 h-6 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"></div>
      </div>
      
      {/* 发光圆圈 */}
      <div className="absolute inset-0 animate-pulse">
        <div className="w-24 h-24 border border-purple-300 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="w-28 h-28 border border-purple-200 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
    
    {/* 右侧图标 */}
    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-3">
      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      </div>
      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
        <svg className="w-4 h-4 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
);

// AI 知识管理视觉元素
export const KnowledgeManagementVisual: React.FC = () => (
  <div className="relative h-full">
    {/* 渐变背景 */}
    <div className="absolute inset-0 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 rounded-lg"></div>
    
    {/* 文档卡片 */}
    <div className="relative z-10 p-4 h-full flex flex-col justify-between">
      <div className="flex space-x-2">
        <div className="w-12 h-16 bg-white/80 rounded-lg flex items-center justify-center transform rotate-3 shadow-sm">
          <span className="text-2xl font-bold text-gray-600">W</span>
        </div>
        <div className="w-12 h-16 bg-white/80 rounded-lg flex items-center justify-center transform -rotate-2 shadow-sm">
          <span className="text-2xl font-bold text-gray-600">A</span>
        </div>
        <div className="w-12 h-16 bg-white/80 rounded-lg flex items-center justify-center transform rotate-1 shadow-sm">
          <span className="text-2xl font-bold text-gray-600">P</span>
        </div>
      </div>
      
      {/* 底部上传区域 */}
      <div className="bg-white/90 rounded-lg p-3 flex items-center justify-between">
        <span className="text-sm text-gray-600">上传数据,AI知识管理帮你解答!</span>
        <button className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

// 智能数据洞察视觉元素
export const DataInsightsVisual: React.FC = () => (
  <div className="relative h-full flex items-center justify-center">
    <div className="relative">
      {/* 中心图表 */}
      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      </div>
      
      {/* 周围数据点 */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 -left-4 w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
      <div className="absolute top-1/2 -right-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
    </div>
  </div>
);

// 智慧办公视觉元素
export const SmartOfficeVisual: React.FC = () => (
  <div className="relative h-full flex items-center justify-center">
    <div className="grid grid-cols-2 gap-3">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
        </svg>
      </div>
      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      </div>
      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
        <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
);

// 五经普数据处理视觉元素
export const DataProcessingVisual: React.FC = () => (
  <div className="relative h-full flex items-center justify-center">
    <div className="relative">
      {/* 中心数据库图标 */}
      <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
        </svg>
      </div>
      
      {/* 数据流线条 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-blue-300 transform -translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-0.5 h-8 bg-green-300 transform -translate-x-1/2"></div>
        <div className="absolute left-0 top-1/2 w-8 h-0.5 bg-purple-300 transform -translate-y-1/2"></div>
        <div className="absolute right-0 top-1/2 w-8 h-0.5 bg-orange-300 transform -translate-y-1/2"></div>
      </div>
    </div>
  </div>
);

// 智能数据仪表板视觉元素
export const EcommerceVisual: React.FC = () => (
  <div className="relative h-full flex items-center justify-center">
    <div className="relative">
      {/* 数据仪表板图标 */}
      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      </div>
      
      {/* 周围数据指标 */}
      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
        <span className="text-xs font-bold text-green-600">📊</span>
      </div>
      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
        <span className="text-xs font-bold text-purple-600">📈</span>
      </div>
      <div className="absolute top-1/2 -left-4 w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">
        <span className="text-xs font-bold text-orange-600">🔍</span>
      </div>
    </div>
  </div>
);
