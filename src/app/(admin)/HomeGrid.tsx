"use client";
import React from "react";
import Link from "next/link";
import { useSidebar } from "@/context/SidebarContext";
import CardMedia from "@/components/common/CardMedia";

type Module = {
  title: string;
  description: string;
  href: string;
  visualElement: React.ReactNode;
};

export default function HomeGrid({
  allModules,
  cardImages,
  cardVideos,
}: {
  allModules: Module[];
  cardImages: string[];
  cardVideos: (string | undefined)[];
}) {
  const { isExpanded } = useSidebar();

  return (
    <div className={`grid grid-cols-1 gap-10 md:grid-cols-2 ${isExpanded ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
      {allModules.map((item, index) => {
        return (
          <Link key={index} href={item.href} className="group block">
            <div className="space-y-6">
              <div className="rounded-3xl overflow-hidden bg-base-200">
                <CardMedia
                  videoSrc={cardVideos[index]}
                  imageSrc={cardImages[index % cardImages.length]}
                  alt={item.title}
                />
              </div>
              <div className="text-center px-4">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}


