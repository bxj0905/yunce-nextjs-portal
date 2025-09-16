import React from "react";
import Link from "next/link";

interface ModernCardProps {
  title: string;
  description: string;
  href: string;
  visualElement: React.ReactNode;
  actionText?: string;
}

const ModernCard: React.FC<ModernCardProps> = ({
  title,
  description,
  href,
  visualElement,
  actionText = "立即体验 →",
}) => {
  return (
    <Link href={href} className="group block">
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
        {/* 视觉元素区域 */}
        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 p-6">
          {visualElement}
        </div>
        
        {/* 内容区域 */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {description}
          </p>
          
          {/* 行动按钮 */}
          <div className="flex justify-center">
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
              {actionText}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ModernCard;
