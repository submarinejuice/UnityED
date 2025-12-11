"use client";

import { Users, Plus, Pencil } from "lucide-react";
import { Button } from "@/components/button";
import TeacherLayout from "@/components/TeacherLayout";
import { useState } from "react";
import AddClassModal from "./AddClassModal";
import { useQuery } from "@tanstack/react-query";
import ClassCardSkeleton from "./ClassCardSkeleton";
import { Trash2 } from "lucide-react";

import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

export default function MyClassesPage() {
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await fetch("/api/teachers/classes");
      if (!res.ok) throw new Error("Failed to fetch classes");
      return res.json();
    },
  });

  const classes = data?.classes ?? [];
  // Delete class
  const deleteClass = useMutation({
    mutationFn: async (name: string) => {
      const res = await fetch(`/api/teachers/classes/${name}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete class");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Class deleted");
      refetch();
    },
  });

  return (
    <div className="flex min-h-screen w-full bg-[#F8FAFC]">
      <div className="w-full space-y-6 p-6">
        {/* Modal */}
        <AddClassModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setEditData(null);
            refetch();
          }}
          editData={editData}
        />

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Classes</h1>
            <p className="text-gray-500">Manage and monitor all your classes</p>
          </div>

          <Button
            className="flex items-center gap-2 bg-emerald-500 text-white hover:bg-emerald-600"
            onClick={() => {
              setEditData(null);
              setOpenModal(true);
            }}
          >
            <Plus size={16} /> New Class
          </Button>
        </div>

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ClassCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && classes.length === 0 && (
          <div className="py-10 text-center text-gray-500">
            No classes found. Click <strong>New Class</strong> to create one.
          </div>
        )}

        {/* Grid */}
        {!isLoading && classes.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {classes.map((cls: any) => (
              <div
                key={cls.id}
                className="relative rounded-2xl border bg-white p-5 shadow-sm transition-all hover:shadow-md"
              >
                {/* Edit button */}
                <button
                  onClick={() => {
                    setEditData(cls);
                    setOpenModal(true);
                  }}
                  className="absolute top-3 right-3 text-gray-500 hover:text-emerald-600"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => {
                    deleteClass.mutate(cls.className);
                  }}
                >
                  <Trash2 className="h-4 w-4 cursor-pointer text-red-600" />
                </button>
                <h2 className="mb-3 text-lg font-semibold">{cls.className}</h2>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>Students</span>
                    </div>
                    <span className="font-semibold">
                      {cls._count?.students ?? 0}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Teacher</span>
                    <span className="font-semibold">
                      {cls.teacher?.email || "—"}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="mb-1 text-sm text-gray-600">Class Progress</p>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-emerald-500"
                      style={{ width: "60%" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
