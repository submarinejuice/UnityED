"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { Users, Building2, Settings, BarChart3, Bookmark } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface School {
  id: string;
  name: string;
  createdAt: string;
}

interface DashboardResponse {
  totalSchools: number;
  totalTeachers: number;
  totalClasses: number;
  recentSchools: School[];
  name: string;
}


// MAIN COMPONENT

export default function AdminDashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Fetch stats (FULLY TYPED)
  const { data } = useQuery<DashboardResponse>({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/admin/dashboard");
      if (!res.ok) throw new Error("Failed to load dashboard");
      return res.json();
    },
  });

  const stats = {
    totalSchools: data?.totalSchools ?? 0,
    totalTeachers: data?.totalTeachers ?? 0,
    totalClasses: data?.totalClasses ?? 0,
    recentSchools: data?.recentSchools ?? [],
    myname: data?.name ?? "Admin",
  };

  const navItems = [
    {
      icon: Users,
      label: "Manage Teachers",
      path: "/dashboard/admin/teachers",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Building2,
      label: "Manage Schools",
      path: "/dashboard/admin/schools",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: Settings,
      label: "Settings",
      path: "/dashboard/admin/settings",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: BarChart3,
      label: "Analytics",
      path: "/dashboard/admin/analytics",
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="w-full bg-[#f5f8ff]">
      <main className="mx-auto w-full max-w-6xl space-y-10 px-4 py-10 lg:px-0">
        {/* Header */}
        <section className="space-y-1">
          <h2 className="text-4xl font-bold text-[#141b2f]">
            Hi, Admin – {stats.myname}
          </h2>
          <p className="text-sm text-slate-500 md:text-base">
            Platform overview & controls
          </p>
        </section>

        {/* STAT CARDS */}
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* Schools */}
          <Card className="rounded-2xl border bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Schools
              </CardTitle>
              <Building2 className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#141b2f]">
                {stats.totalSchools}
              </div>
              <p className="text-xs text-slate-500">Schools registered</p>
            </CardContent>
          </Card>

          {/* Teachers */}
          <Card className="rounded-2xl border bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Teachers
              </CardTitle>
              <Users className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#141b2f]">
                {stats.totalTeachers}
              </div>
              <p className="text-xs text-slate-500">Teachers onboarded</p>
            </CardContent>
          </Card>

          {/* Classes */}
          <Card className="rounded-2xl border bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Classes
              </CardTitle>
              <Bookmark className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#141b2f]">
                {stats.totalClasses}
              </div>
              <p className="text-xs text-slate-500">Classes created</p>
            </CardContent>
          </Card>

          {/* Progress */}
          <Card className="rounded-2xl border bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Avg. Progress
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#141b2f]">78%</div>
              <p className="text-xs text-slate-500">Across all schools</p>
            </CardContent>
          </Card>
        </section>

{/* NAVIGATION CARDS */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {navItems.map(({ icon: Icon, label, path, color }) => {
            const isActive = pathname.startsWith(path);

            return (
              <Link key={path} href={path}>
                <AdminCard
                  className={`cursor-pointer rounded-2xl border p-8 shadow-sm transition-all hover:shadow-md ${
                    isActive
                      ? "border-blue-600 bg-blue-600 text-white" // ACTIVE STATE
                      : "border-slate-200 bg-white text-[#141b2f]" // NORMAL STATE
                  }`}
                >
                  <div className="flex flex-col items-center gap-4 text-center">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${isActive ? "bg-white text-blue-600" : color} // ICON BG + TEXT`}
                    >
                      <Icon className="h-8 w-8" />
                    </div>

                    <h3
                      className={`text-lg font-bold ${
                        isActive ? "text-white" : "text-[#141b2f]"
                      }`}
                    >
                      {label}
                    </h3>
                  </div>
                </AdminCard>
              </Link>
            );
          })}
        </section>


        {/* PAGE CONTENT */}
        <div className="mt-10 w-full">{children}</div>

        {/* RECENT SCHOOLS */}
        <section className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Schools</h2>
            <Link
              href="/dashboard/admin/schools"
              className="text-sm font-medium text-green-600 hover:underline"
            >
              View All
            </Link>
          </div>

          {stats.recentSchools.length === 0 && (
            <p className="text-gray-500">No schools found.</p>
          )}

          <div className="space-y-3">
            {stats.recentSchools.map((school: School) => (
              <div
                key={school.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
              >
                <div>
                  <p className="font-medium">{school.name}</p>
                  <p className="text-sm text-gray-500">
                    Added: {new Date(school.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm text-gray-400">ID: {school.id}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
interface AdminCardProps {
  children: React.ReactNode;
  className?: string;
}
function AdminCard({ children, className = "" }: AdminCardProps) {
  return (
    <div
      className={`rounded-lg border transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  );
}
