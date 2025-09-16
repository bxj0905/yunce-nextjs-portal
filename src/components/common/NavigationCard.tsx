"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface NavigationCardProps {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeColor?: "blue" | "green" | "yellow" | "red" | "purple";
}

const NavigationCard: React.FC<NavigationCardProps> = ({
  title,
  description,
  href,
  imageSrc,
  imageAlt,
  icon,
  badge,
  badgeColor = "blue",
}) => {
  const badgeColors = {
    blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    green: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    red: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    purple: "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400",
  };

  return (
    <Link href={href} className="group block">
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 dark:border-gray-800 dark:bg-white/[0.03] dark:hover:shadow-gray-900/50">
        {/* 图片区域 */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* 徽章 */}
          {badge && (
            <div className="absolute top-4 right-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${badgeColors[badgeColor]}`}>
                {badge}
              </span>
            </div>
          )}
          
          {/* 图标覆盖层 */}
          {icon && (
            <div className="absolute bottom-4 left-4 flex items-center justify-center w-12 h-12 bg-white/90 rounded-lg backdrop-blur-sm dark:bg-gray-900/90">
              <div className="text-gray-700 dark:text-gray-300">
                {icon}
              </div>
            </div>
          )}
        </div>

        {/* 内容区域 */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
          
          {/* 底部箭头 */}
          <div className="flex items-center justify-end mt-4">
            <div className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              进入
              <svg 
                className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NavigationCard;
