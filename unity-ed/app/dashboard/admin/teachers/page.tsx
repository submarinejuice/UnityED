"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AdminDashboardPage from "../page";
import { Pencil, Trash2 } from "lucide-react";
import TeacherModal from "./components/TeacherModal";

export default function ManageTeachersPage() {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [schoolFilter, setSchoolFilter] = useState("");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const res = await fetch("/api/admin/teacher-profile", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch teachers");
      return res.json();
    },
  });

  const teachers = data?.teachers ?? [];

  const schoolNames = Array.from(
    new Set(teachers.map((t: any) => t.school?.name as string))
  ).filter(Boolean) as string[];

  const filteredTeachers = teachers.filter((t: any) => {
    if (!schoolFilter) return true;
    return t.school?.name === schoolFilter;
  });

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this teacher?");
    if (!confirmed) return;

    await fetch(`/api/admin/teacher-profile/${id}`, {
      method: "DELETE",
    });

    refetch();
  };

  return (
    <AdminDashboardPage>
      <div className="m-4 flex min-h-screen bg-gray-50">
        <div className="w-full p-5">
          <TeacherModal
            open={open}
            editData={editData}
            onClose={() => {
              setOpen(false);
              setEditData(null);
              refetch();
            }}
          />

          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#143E73]">
              Manage Teachers
            </h1>

            <button
              className="rounded-lg bg-emerald-600 px-4 py-2 text-white"
              onClick={() => setOpen(true)}
            >
              + Add Teacher
            </button>
          </div>

          {/* FILTER UI */}
          <div className="mb-4 flex items-center gap-4">
            <select
              className="rounded-lg border border-gray-300 px-3 py-2"
              value={schoolFilter}
              onChange={(e) => setSchoolFilter(e.target.value)}
            >
              <option value="">All Schools</option>
              {schoolNames.map((name, idx) => (
                <option key={idx} value={name}>
                  {name}
                </option>
              ))}
            </select>

            {schoolFilter && (
              <button
                onClick={() => setSchoolFilter("")}
                className="text-sm text-red-600 hover:underline"
              >
                Clear Filter
              </button>
            )}
          </div>

          <div className="overflow-x-auto rounded-lg bg-white shadow-md">
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead className="bg-[#143E73] text-white">
                <tr>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">School</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredTeachers.map((t: any) => (
                  <tr key={t.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{t.name}</td>
                    <td className="px-6 py-4">{t.user.email}</td>
                    <td className="px-6 py-4">{t.school?.name ?? "—"}</td>

                    <td className="flex justify-end space-x-4 px-6 py-4 text-right">
                      <button
                        className="flex items-center gap-1 text-blue-600 hover:underline"
                        onClick={() => {
                          setEditData(t);
                          setOpen(true);
                        }}
                      >
                        <Pencil size={14} /> Edit
                      </button>

                      <button
                        className="flex items-center gap-1 text-red-600 hover:underline"
                        onClick={() => handleDelete(t.id)}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {!filteredTeachers.length && !isLoading && (
                  <tr>
                    <td className="p-4 text-center text-gray-500" colSpan={4}>
                      No teachers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminDashboardPage>
  );
}
