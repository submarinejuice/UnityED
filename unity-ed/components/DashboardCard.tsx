"use client";
import React from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export default function DashboardCard({ title, value, icon }: DashboardCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center gap-4 border">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-blue-900 text-lg font-bold">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
