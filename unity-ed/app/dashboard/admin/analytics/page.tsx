"use client";

import React, { FC, useState, useEffect } from "react";
import { 
    School, 
    TrendingUp, 
    Users, 
    Clock, 
    AlertTriangle, 
    ChevronLeft, 
    CheckCircle, 
    UserPlus,
    UserMinus,
    MessageSquare,
    Target,
    BarChart3,
    Activity,
    Calendar,
} from "lucide-react";


import { useQuery } from "@tanstack/react-query";

// --- DYNAMIC COMPONENTS ---

const MetricCard: FC<{
    title: string;
    icon: React.ReactNode;
    value: string;
    detail: string;
    detailClass?: string;
}> = ({ title, icon, value, detail, detailClass }) => {
    
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 transition duration-300 hover:shadow-md h-full">
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


const ActivityRow: FC<{
    name: string;
    action: string;
    time: string;
    Icon?: FC<any>;
    color?: string;
}> = ({ name, action, time, Icon, color }) => {
    return (
        <div className={`flex items-center gap-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-150`}>
             {Icon ? <Icon className={`h-6 w-6 shrink-0 ${color}`} /> : <UserPlus className="h-6 w-6 shrink-0 text-blue-500" />}
            <div className="flex-1 min-w-0 text-slate-900">
                <h4 className="font-semibold text-sm">{action}</h4>
                <p className="text-xs text-slate-600">{name}</p>
            </div>
            <span className="text-xs text-slate-600 whitespace-nowrap">{time}</span>
        </div>
    );
};


const TopSchoolsList: FC<{ schools: any[] }> = ({ schools }) => (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 h-96 overflow-y-auto">
        <h3 className="text-xl font-bold mb-4 text-[#141b2f] flex items-center gap-2">
            <School className="h-5 w-5" />
            Top Performing Schools
        </h3>
        <div className="space-y-3">
            {schools.length === 0 ? <p className="text-sm text-gray-500">No schools found.</p> :
            schools.map((school) => (
                <div key={school.rank} className="p-3 rounded-lg flex items-center justify-between bg-gray-50/50 hover:bg-gray-100 transition duration-150">
                    <div className="flex items-center space-x-3">
                        <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold text-white ${school.color}`}>{school.rank}</span>
                        <div>
                            <p className="text-sm font-semibold text-[#141b2f]">{school.name}</p>
                            <p className="text-xs text-slate-500">{school.detail}</p>
                        </div>
                    </div>
                    <span className="text-base font-bold text-gray-800">{school.metric}</span>
                </div>
            ))}
             <p className="text-xs text-center text-slate-500 pt-2">Metric based on Student Enrollment.</p>
        </div>
    </div>
);


const SystemActivityList: FC<{ activity: any[] }> = ({ activity }) => (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 h-96 overflow-y-auto">
        <h3 className="text-xl font-bold mb-4 text-[#141b2f] flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Recent System Activity
        </h3>
        <div className="space-y-3">
            {activity.length === 0 ? <p className="text-sm text-gray-500">No recent activity.</p> :
            activity.map((act, index) => (
                <ActivityRow
                    key={index}
                    name={act.name}
                    action={act.action}
                    time={act.time}
                    color={act.color}
                />
            ))}
        </div>
    </div>
);


const ManagementOverview: FC = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Simplified Approval Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-[#141b2f] flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Pending Approvals
            </h3>
            <div className="space-y-2 pb-4">
                <div className="flex justify-between text-sm text-slate-700"><span>New Teacher Requests:</span><span className="font-semibold text-red-500">0</span></div>
                <div className="flex justify-between text-sm text-slate-700"><span>School License Updates:</span><span className="font-semibold text-orange-500">0</span></div>
                 <div className="flex justify-between text-sm text-slate-700 border-t mt-2 pt-2 font-bold"><span>Total Required Action:</span><span className="font-semibold text-red-600">0</span></div>
            </div>
            {/* Keeping only one essential button */}
            <button className="w-full mt-4 bg-gray-100 text-gray-400 font-semibold py-2 rounded-lg cursor-not-allowed">Review Approvals (Coming Soon)</button>
        </div>

        {/* System Monitoring/Health Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-[#141b2f] flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                System Health Overview
            </h3>
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-700"><span>Server Uptime:</span><span className="font-semibold text-green-600">99.9%</span></div>
                <div className="flex justify-between text-sm text-slate-700"><span>CDN Performance:</span><span className="font-semibold">Fast</span></div>
                <div className="flex justify-between text-sm text-slate-700"><span>Open Support Tickets:</span><span className="font-semibold">0</span></div>
            </div>
            {/* Non-actionable button, providing general status viewing capability */}
            <button className="w-full mt-4 bg-blue-100 text-blue-700 font-semibold py-2 rounded-lg hover:bg-blue-200 transition">View System Status</button>
        </div>

        {/* User Statistics Overview Card */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-[#141b2f] flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-600" />
                User Statistics
            </h3>
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-slate-700"><span>New Users (30 days):</span><span className="font-semibold">--</span></div>
                <div className="flex justify-between text-sm text-slate-700"><span>Monthly Active Teachers:</span><span className="font-semibold">--</span></div>
                <div className="flex justify-between text-sm text-slate-700"><span>Inactive Schools:</span><span className="font-semibold">--</span></div>
            </div>
            {/* Non-actionable button*/}
            <button className="w-full mt-4 bg-orange-100 text-orange-700 font-semibold py-2 rounded-lg hover:bg-orange-200 transition">View User Reports</button>
        </div>
    </div>
);


// --- MAIN ADMIN INSIGHTS PAGE ---

export default function AdminInsightsPage() {
    const { data, isLoading } = useQuery({
        queryKey: ["admin-analytics"],
        queryFn: async () => {
            const res = await fetch("/api/admin/analytics");
            if (!res.ok) throw new Error("Failed to fetch analytics");
            return res.json();
        }
    });

    const kpis = [
        { title: "Total Schools", value: isLoading ? "..." : data?.kpis?.totalSchools || "0", subText: "Registered campuses", Icon: School, iconColor: "text-blue-600" },
        { title: "Active Teachers", value: isLoading ? "..." : data?.kpis?.totalTeachers || "0", subText: "Registered teachers", Icon: Users, iconColor: "text-emerald-600" },
        { title: "Total Students", value: isLoading ? "..." : data?.kpis?.totalStudents || "0", subText: "Total student base", Icon: Users, iconColor: "text-orange-500" },
        { title: "Pending Approvals", value: "0", subText: "All caught up", Icon: AlertTriangle, iconColor: "text-gray-400" },
    ];


    return (
        <div className="min-h-screen bg-[#f5f8ff]">
            <main className="w-full max-w-6xl mx-auto px-4 lg:px-0 py-10 space-y-10">
                
                {/* Header (Matching Student Insights style) */}
                <section className="space-y-1">
                    {/* Back Button added here */}
                    <a href="/dashboard/admin" className="inline-flex items-center gap-2 mb-4 rounded-lg border-2 border-[#141b2f] bg-transparent px-4 py-2 text-sm font-semibold text-[#141b2f] hover:bg-[#141b2f] hover:text-white transition-all">
                        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Dashboard
                    </a>

                    <h1 className="text-4xl font-bold text-[#141b2f]">
                        Admin Control Panel
                    </h1>
                    <p className="text-sm text-slate-500 md:text-base">
                        System-wide overview for managing schools, teachers, and platform health.
                    </p>
                </section>

                {/* 1. Organizational Metrics (KPIs) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {kpis.map((kpi, index) => (
                        <MetricCard
                            key={index}
                            title={kpi.title}
                            icon={<kpi.Icon className="h-4 w-4" />}
                            value={kpi.value.toString()}
                            detail={kpi.subText}
                            detailClass={kpi.iconColor}
                        />
                    ))}
                </div>

                {/* 2. Top Management Lists (Replacing main charts) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <TopSchoolsList schools={data?.topSchools || []} />
                    <SystemActivityList activity={data?.systemActivity || []} />
                </div>

                {/* 3. Actionable Management Overview */}
                <ManagementOverview />
                
            </main>
        </div>
    );
}

