"use client";

import React, { FC, useState, useEffect } from "react";
import {
    TrendingUp,
    Award,
    Clock,
    Target,
    Activity,
    BarChart3,
    ArrowLeft,
    Users,
    CheckCircle,
    MessageSquare,
    AlertTriangle,
    Minus,
    Plus,
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

// MOCK DATA REMOVED
// CLIENT WRAPPER REMOVED

const MetricCard: FC<{
    title: string;
    icon: React.ReactNode;
    value: string;
    detail: string;
    detailClass?: string;
}> = ({ title, icon, value, detail, detailClass }) => {
    
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
            <div className="flex flex-row items-center justify-between pb-2">
                <h4 className="text-sm font-medium text-slate-600">{title}</h4>
                {icon}
            </div>
            <div className="pt-2">
                <div className="text-2xl font-bold text-[#141b2f]">{value}</div>
                <p className={`text-xs mt-1 ${detailClass ?? "text-slate-500"}`}>
                    {detail}
                </p>
            </div>
        </div>
    );
};

const AchievementRow: FC<{
    color: "primary" | "secondary" | "accent";
    title: string;
    desc: string;
    time: string;
    Icon: FC<any>;
}> = ({ color, title, desc, time, Icon }) => {
    const colorMap: Record<typeof color, string> = {
        primary: "bg-blue-50 text-[#2563EB]", 
        secondary: "bg-emerald-50 text-emerald-500",
        accent: "bg-orange-50 text-orange-500",
    };

    const badgeColor = colorMap[color] || "bg-gray-50 text-gray-500";

    return (
        <div className={`flex items-center gap-4 p-3 rounded-lg ${badgeColor}`}>
            <Icon className="h-8 w-8 shrink-0" />
            <div className="flex-1 min-w-0 text-slate-900">
                <h4 className="font-semibold text-sm">{title}</h4>
                <p className="text-xs text-slate-600">{desc}</p>
            </div>
            <span className="text-xs text-slate-600 whitespace-nowrap">{time}</span>
        </div>
    );
};



// Components managed inline


//  MAIN TEACHER ANALYTICS PAGE

import { useQuery } from '@tanstack/react-query';

export default function TeacherAnalyticsPage() {
    const { data: analytics, isLoading } = useQuery({
        queryKey: ["teacher-analytics"],
        queryFn: async () => {
            const res = await fetch("/api/teachers/analytics");
            if (!res.ok) throw new Error("Failed to fetch analytics");
            return res.json();
        }
    });

    const metrics = analytics?.metrics || {};
    const charts = analytics?.charts || {};
    const topPerformers = analytics?.topPerformers || [];
    
    // Fallback data for charts if empty to properly render empty state or defaults
    const progressData = charts.progress?.length ? charts.progress : [];
    const skillsData = charts.skills?.length ? charts.skills : [];
    const activityData = charts.activity?.length ? charts.activity : [];


    return (
        <div className="min-h-screen bg-[#f5f8ff]">
            <main className="w-full max-w-6xl mx-auto px-4 lg:px-0 py-10">
                
               
                <div className="mb-8">
                    
                    <a
                        href="/dashboard/teacher"
                        className="inline-flex items-center gap-2 mb-4 rounded-lg border-2 border-[#141b2f] bg-transparent px-4 py-2 text-sm font-semibold text-[#141b2f] hover:bg-[#141b2f] hover:text-white transition-all">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </a>

                    <h1 className="text-3xl font-bold mb-2 text-[#141b2f]">
                        Performance Analytics
                    </h1>
                    <p className="text-slate-800 font-medium">
                        Comprehensive insights into class progress and skill development
                    </p>
                </div>

                {/* 1. Metrics*/}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <MetricCard
                        title="Overall Score"
                        icon={<TrendingUp className="h-4 w-4 text-emerald-500" />}
                        value={isLoading ? "..." : `${metrics.overallScore || 0}%`}
                        detail="Class Average"
                        detailClass="text-emerald-600 font-semibold"
                    />
                    <MetricCard
                        title="Time Played"
                        icon={<Clock className="h-4 w-4 text-blue-500" />}
                        value={isLoading ? "..." : `${metrics.totalHours || 0}h`}
                        detail="Total Class Time"
                    />
                    <MetricCard
                        title="Avg Assignment Grade"
                        icon={<Target className="h-4 w-4 text-orange-400" />}
                        value={isLoading ? "..." : `${metrics.avgGrade || 0}%`}
                        detail="Completion Rate"
                    />
                    <MetricCard
                        title="High Priority Gaps"
                        icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
                        value={isLoading ? "..." : `${metrics.priorityGaps || 0} students`}
                        detail="Needs intervention"
                        detailClass="text-red-600 font-semibold"
                    />
                </div>

                {/* 2. Charts Row 1 (Progress Over Time & Skills Development) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                     <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
                        <h3 className="text-xl font-bold mb-4 text-[#141b2f] flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Class Avg Progress Over Time
                        </h3>
                        <ResponsiveContainer width="100%" height={280}>
                            <AreaChart data={progressData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                <XAxis dataKey="week" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} axisLine={false} tickLine={false} unit="%" />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="score"
                                    name="Avg Score"
                                    stroke="#2563EB"
                                    fill="#93c5fd"
                                    fillOpacity={0.6}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
                        <h3 className="text-xl font-bold mb-4 text-[#141b2f] flex items-center gap-2">
                            <Award className="h-5 w-5" />
                            Skills Development Insights
                        </h3>
                        <ResponsiveContainer width="100%" height={280}>
                            <RBarChart data={skillsData} layout="vertical" barSize={20}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={false} />
                                <XAxis
                                    type="number"
                                    domain={[0, 100]}
                                    tick={{ fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                    unit="%"
                                />
                                <YAxis
                                    dataKey="skill"
                                    type="category"
                                    width={110}
                                    tick={{ fontSize: 12 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip />
                                <Bar dataKey="level" fill="#14b8a6" name="Class Level" radius={[0, 8, 8, 0]} />
                            </RBarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. Charts Row 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
                        <h3 className="text-xl font-bold mb-4 text-[#141b2f] flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Average Class Activity
                        </h3>
                        <ResponsiveContainer width="100%" height={250}>
                            <RBarChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} unit="m" />
                                <Tooltip />
                                <Bar
                                    dataKey="avgMinutes"
                                    name="Avg Minutes"
                                    fill="#fb923c"
                                    radius={[8, 8, 0, 0]}
                                />
                            </RBarChart>
                        </ResponsiveContainer>
                        <p className="text-sm text-slate-500 mt-4 text-center">
                            Daily activity average across students
                        </p>
                    </div>


                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6">
                        <h3 className="text-xl font-bold mb-4 text-[#141b2f] flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Top Performing Students
                        </h3>
                        <div className="space-y-4">
                            {topPerformers.length === 0 ? <p className="text-gray-500">No data available.</p> :
                            topPerformers.map((achievement: any, index: number) => (
                                <AchievementRow
                                    key={index}
                                    color={achievement.color as "primary" | "secondary" | "accent"}
                                    title={achievement.title}
                                    desc={achievement.desc}
                                    time={achievement.time}
                                    Icon={Award} // Default icon or dynamic if API sends identifier
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

