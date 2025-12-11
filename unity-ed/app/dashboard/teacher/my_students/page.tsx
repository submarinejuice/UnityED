"use client";

import { Plus, Pencil, School, GraduationCap } from "lucide-react";
import { Button } from "@/components/button";
import { useState } from "react";
import AddStudentModal from "./components/AddStudentModal";
import { useQuery } from "@tanstack/react-query";
import StudentCardSkeleton from "./components/StudentCardSkeleton";
import DashboardTeacher from "../page";
import StudentTable from "./components/StudentTable";

export default function MyStudentsPage() {
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // Fetch students
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await fetch("/api/teachers/students");
      if (!res.ok) throw new Error("Failed to fetch students");
      return res.json();
    },
  });

  const students = data?.students ?? [];

  return (
    <DashboardTeacher>
      {/* Page Content (table) */}
      <StudentTable />
    </DashboardTeacher>
  );
}
