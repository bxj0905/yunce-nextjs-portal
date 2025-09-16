import Calendar from "@/components/calendar/Calendar";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "云策AI - 日历",
  description: "日程与事件管理",
  // other metadata
};
export default function page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="日历" />
      <Calendar />
    </div>
  );
}
