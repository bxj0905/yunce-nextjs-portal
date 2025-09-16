import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "云策AI - 基础表格",
  description: "基础表格展示与样式示例",
  // other metadata
};

export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="基础表格" />
      <div className="space-y-6">
        <ComponentCard title="基础表格 1">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  );
}
