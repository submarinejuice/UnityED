"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Award,
  PlayCircle,
  BookOpen,
  TrendingUp,
  Users,
  Activity,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useSession } from "next-auth/react";

export default function DashboardStudent() {
  const [assessmentData, setAssessmentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/assessment-results");
        if (res.ok) {
          const data = await res.json();
          setAssessmentData(data);
        }
      } catch (error) {
        console.error("Failed to fetch assessment data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const { data: session, status } = useSession();
  const name = session?.user?.name || session?.user?.email || "Student";
  const chartData = assessmentData
    ? [
        {
          subject: "Awareness",
          A: assessmentData.awarenessSensitivity || 0,
          fullMark: 100,
        },
        {
          subject: "Empathy",
          A: assessmentData.empathyAndSupport || 0,
          fullMark: 100,
        },
        {
          subject: "Safety",
          A: assessmentData.safeResponseCapability || 0,
          fullMark: 100,
        },
        {
          subject: "Help Seeking",
          A: assessmentData.helpSeekingTendency || 0,
          fullMark: 100,
        },
        {
          subject: "Intervention",
          A: assessmentData.peerInterventionAbility || 0,
          fullMark: 100,
        },
        {
          subject: "Courage",
          A: assessmentData.moralCourage || 0,
          fullMark: 100,
        },
        {
          subject: "Conflict",
          A: assessmentData.conflictEscalationRisk || 0,
          fullMark: 100,
        },
        {
          subject: "Avoidance",
          A: assessmentData.avoidanceTendency || 0,
          fullMark: 100,
        },
      ]
    : [];

  return (
    <div className="min-h-screen w-full bg-[#f5f8ff]">
      {/* Main content track – matches header width & centered */}
      <main className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10 lg:px-0">
        {/* Welcome text */}
        <section className="space-y-1">
          <h1 className="text-4xl font-bold text-[#141b2f]">
            Welcome back, {name}!
          </h1>
          <p className="text-sm text-slate-500 md:text-base">
            Continue your learning adventure
          </p>
        </section>

        {/* Stat cards row */}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Score
              </CardTitle>
              <Award className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#141b2f]">
                {loading ? "..." : assessmentData?.totalScore || 0}
              </div>
              <p className="text-xs text-slate-500">Points from assessment</p>
            </CardContent>
          </Card>

          {/* Replaced Levels/Badges with assessment creation time or other info for now, 
               or keep them if they are static/mocked as per previous file. 
               The user asked to make "dashboard based on these data".
           */}
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Last Updated
              </CardTitle>
              <Activity className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#141b2f]">
                {loading
                  ? "..."
                  : assessmentData?.lastUpdatedAt
                    ? new Date(
                        assessmentData.lastUpdatedAt
                      ).toLocaleDateString()
                    : "N/A"}
              </div>
              <p className="text-xs text-slate-500">Assessment Date</p>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                My Level
              </CardTitle>
              <Award className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#141b2f]">Level 12</div>
              <p className="text-xs text-slate-500">
                Chapter 3: The Great Discovery
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Badges Earned
              </CardTitle>
              <Award className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#141b2f]">8</div>
              <p className="text-xs font-semibold text-emerald-600">
                2 more to next reward!
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Play / Learn / Insights row */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Play Game – highlighted */}
          <Card className="group relative cursor-pointer rounded-2xl border-2 border-[#2563EB] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
            {/* Tooltip */}
            <div className="text-blue pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full rounded-md bg-blue-600 px-3 py-1 text-white opacity-0 transition-opacity group-hover:opacity-100">
              Play a fun learning game!
            </div>

            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col items-center gap-5 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#0ea5e9]">
                  <PlayCircle className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-[#141b2f]">
                    Play Game
                  </h3>
                  <p className="text-sm text-slate-500">
                    Continue your adventure
                  </p>
                </div>
                <Link
                  href="/dashboard/student/gameplay"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#2563EB] to-[#0ea5e9] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-[#1d4ed8] hover:to-[#0284c7]"
                >
                  Start Playing
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Learn */}
          <Card className="cursor-pointer rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col items-center gap-5 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
                  <BookOpen className="h-8 w-8 text-emerald-400" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-[#141b2f]">
                    Learn
                  </h3>
                  <p className="text-sm text-slate-500">
                    Instructions &amp; curriculum
                  </p>
                </div>
                <Link
                  href="/dashboard/student/resources"
                  className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  View Resources
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card className="cursor-pointer rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col items-center gap-5 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50">
                  <TrendingUp className="h-8 w-8 text-orange-400" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-[#141b2f]">
                    Insights
                  </h3>
                  <p className="text-sm text-slate-500">View your stats</p>
                </div>
                <Link
                  href="/dashboard/student/insights"
                  className="inline-flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
                >
                  See Performance
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
        {/* My Badges */}
        <section className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-500" />
            <h2 className="text-xl font-bold text-[#141b2f]">My Badges</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {/* Quick Learner */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm">
              <Award className="mb-2 h-8 w-8 text-blue-500" />
              <span className="text-sm font-semibold text-[#141b2f]">
                Quick Learner
              </span>
            </div>

            {/* Team Player */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm">
              <Award className="mb-2 h-8 w-8 text-cyan-500" />
              <span className="text-sm font-semibold text-[#141b2f]">
                Team Player
              </span>
            </div>

            {/* Problem Solver */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-5 shadow-sm">
              <Award className="mb-2 h-8 w-8 text-orange-500" />
              <span className="text-sm font-semibold text-[#141b2f]">
                Problem Solver
              </span>
            </div>

            {/* Locked */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 py-5 shadow-sm">
              <Award className="mb-2 h-8 w-8 text-slate-400" />
              <span className="text-sm font-semibold text-slate-600">
                Locked
              </span>
            </div>
          </div>
        </section>
        {/* Assessment Chart Section */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-[#141b2f]">
                  Assessment Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] w-full">
                {loading ? (
                  <div className="flex h-full items-center justify-center">
                    Loading chart...
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      data={chartData}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Score"
                        dataKey="A"
                        stroke="#2563EB"
                        fill="#2563EB"
                        fillOpacity={0.6}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
