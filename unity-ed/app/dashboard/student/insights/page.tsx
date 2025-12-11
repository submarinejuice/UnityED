"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TrendingUp,
  Award,
  Clock,
  Target,
  Activity,
  BarChart3,
  ArrowLeft,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart as RBarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useQuery } from "@tanstack/react-query";

export default function StudentInsights() {
  const { data: insights, isLoading } = useQuery({
    queryKey: ["student-insights"],
    queryFn: async () => {
      const res = await fetch("/api/student/insights");
      if (!res.ok) throw new Error("Failed to fetch insights");
      return res.json();
    },
  });

  const progressData = insights?.progressData || [];
  const skillsData = insights?.skillsData || [];
  const activityData = insights?.activityData || [];
  const metrics = insights?.metrics || { totalScore: 0, timePlayed: "0h", missions: "0", streak: "0 days" };

  return (
    <div className="min-h-screen bg-[#f5f8ff]">
      <main className="w-full max-w-6xl mx-auto px-4 lg:px-0 py-10">
        {/* Header + Back button */}
        <div className="mb-8">
          <Link
            href="/dashboard/student"
            className="inline-flex items-center gap-2 mb-4 rounded-lg border-2 border-[#141b2f] bg-transparent px-4 py-2 text-sm font-semibold text-[#141b2f] hover:bg-[#141b2f] hover:text-white transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <h1 className="text-3xl font-bold mb-2 text-[#141b2f]">
            Performance Insights
          </h1>
          <p className="text-gray-800 font-medium">
            Track your progress and achievements
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Overall Score"
            icon={<TrendingUp className="h-4 w-4 text-emerald-500" />}
            value={isLoading ? "..." : (metrics?.totalScore?.toString() || "0")}
            detail="Current Score"
            detailClass="text-emerald-600"
          />
          <MetricCard
            title="Time Played"
            icon={<Clock className="h-4 w-4 text-blue-500" />}
            value={isLoading ? "..." : (metrics?.timePlayed || "0h")}
            detail="Total Time"
          />
          <MetricCard
            title="Missions Complete"
            icon={<Target className="h-4 w-4 text-orange-400" />}
            value={isLoading ? "..." : (metrics?.missions || "0")}
            detail="Total Completed"
          />
          <MetricCard
            title="Streak"
            icon={<Activity className="h-4 w-4 text-teal-500" />}
            value={isLoading ? "..." : (metrics?.streak || "0 days")}
            detail="Keep it up!"
            detailClass="text-teal-600"
          />
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="rounded-2xl border border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#141b2f]">
                <TrendingUp className="h-5 w-5" />
                Progress Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#2563EB"
                    fill="#93c5fd"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#141b2f]">
                <Award className="h-5 w-5" />
                Skills Development
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <RBarChart data={skillsData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    dataKey="skill"
                    type="category"
                    width={110}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Bar dataKey="level" fill="#14b8a6" radius={[0, 8, 8, 0]} />
                </RBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="rounded-2xl border border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#141b2f]">
                <BarChart3 className="h-5 w-5" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RBarChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar
                    dataKey="minutes"
                    fill="#fb923c"
                    radius={[8, 8, 0, 0]}
                  />
                </RBarChart>
              </ResponsiveContainer>
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Average: 56 minutes per day
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#141b2f]">
                <Target className="h-5 w-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <AchievementRow
                  color="primary"
                  title="Problem Solver"
                  desc="Completed 10 puzzle challenges"
                  time="2 days ago"
                />
                <AchievementRow
                  color="secondary"
                  title="Team Player"
                  desc="Helped 5 classmates succeed"
                  time="5 days ago"
                />
                <AchievementRow
                  color="accent"
                  title="Quick Learner"
                  desc="Finished Chapter 2 in record time"
                  time="1 week ago"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function MetricCard({
  title,
  icon,
  value,
  detail,
  detailClass,
}: {
  title: string;
  icon: React.ReactNode;
  value: string;
  detail: string;
  detailClass?: string;
}) {
  return (
    <Card className="rounded-2xl border border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-[#141b2f]">{value}</div>
        <p className={`text-xs mt-1 ${detailClass ?? "text-muted-foreground"}`}>
          {detail}
        </p>
      </CardContent>
    </Card>
  );
}

function AchievementRow({
  color,
  title,
  desc,
  time,
}: {
  color: "primary" | "secondary" | "accent";
  title: string;
  desc: string;
  time: string;
}) {
  const colorMap: Record<typeof color, string> = {
    primary: "bg-blue-50 text-[#2563EB]",
    secondary: "bg-teal-50 text-teal-500",
    accent: "bg-orange-50 text-orange-500",
  };

  const badgeColor = colorMap[color];

  return (
    <div className={`flex items-center gap-4 p-3 rounded-lg ${badgeColor}`}>
      <Award className="h-8 w-8 shrink-0" />
      <div className="flex-1 min-w-0 text-slate-900">
        <h4 className="font-semibold text-sm">{title}</h4>
        <p className="text-xs text-slate-600">{desc}</p>
      </div>
      <span className="text-xs text-slate-600 whitespace-nowrap">{time}</span>
    </div>
  );
}
