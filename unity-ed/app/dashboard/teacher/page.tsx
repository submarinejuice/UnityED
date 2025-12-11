"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Icons
import { Users, TrendingUp, BookOpen, School } from "lucide-react";

interface DashboardResponse {
  taughtStudents: number;
  totalClasses: number;
}
export default function DashboardTeacher({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedClass, setSelectedClass] = useState<string>("all");

  // Fetch stats (FULLY TYPED)
  const { data } = useQuery<DashboardResponse>({
    queryKey: ["teacher-dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/teachers/dashboard");
      if (!res.ok) throw new Error("Failed to load dashboard");
      return res.json();
    },
  });

  const stats = {
    totalStudents: data?.taughtStudents ?? 0,
    totalClasses: data?.totalClasses ?? 0,
  };

 console.log(stats);
  return (
    <div className="w-full bg-[#f5f8ff]">
      {/* Main content track*/}
      <main className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10 lg:px-0">
        {/* Header */}
        <section className="space-y-1">
          <h2 className="text-4xl font-bold text-[#141b2f]">Welcome back, Teacher!</h2>
          <p className="text-sm text-slate-500 md:text-base">Here's an overview of your classes</p>
        </section>

        {/* Top Metric Cards */}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Students</CardTitle>
              <Users className="h-4 w-4 text-slate-400" />
            </CardHeader>
              <CardContent>
              <div className="text-2xl font-bold text-[#141b2f]">
                {stats.totalStudents}
              </div>
              <p className="text-xs text-slate-500">
                Across {stats.totalClasses} classes
              </p>
            </CardContent>
          </Card>

  <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Classes</CardTitle>
              <Users className="h-4 w-4 text-slate-400" />
            </CardHeader>
              <CardContent>
              <div className="text-2xl font-bold text-[#141b2f]">
                {stats.totalClasses}
              </div>
              
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Missions</CardTitle>
              <BookOpen className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#141b2f]">
                10
              </div>
              <p className="text-xs text-slate-500">In progress</p>
            </CardContent>
          </Card>
        </section>

        {/* Action Cards */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/dashboard/teacher/my_classes">
            <Card className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                  <School className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-bold text-[#141b2f]">All Classes</h3>
                <p className="text-sm text-slate-500">Create a new class</p>
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/teacher/my_students">
            <Card className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-bold text-[#141b2f]">Student Management</h3>
                <p className="text-sm text-slate-500">Manage student accounts</p>
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/teacher/curriculum_library">
            <Card className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50">
                  <BookOpen className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-bold text-[#141b2f]">Curriculum Library</h3>
                <p className="text-sm text-slate-500">Browse resources</p>
              </div>
            </Card>
          </Link>

          <Link href="/dashboard/teacher/analytics">
            <Card className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-lg font-bold text-[#141b2f]">Analytics</h3>
                <p className="text-sm text-slate-500">View reports</p>
              </div>
            </Card>
          </Link>
        </section>

        {/* Page Content */}
        <section className="mt-10 w-full">{children}</section>
      </main>
    </div>
  );
}
