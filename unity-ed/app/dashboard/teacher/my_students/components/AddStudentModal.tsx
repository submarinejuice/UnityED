"use client";

import { Button } from "@/components/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

interface AddStudentModalProps {
  open: boolean;
  onClose: () => void;
  editData?: any;
}

export default function AddStudentModal({ open, onClose, editData }: AddStudentModalProps) {
  const isEdit = !!editData;

  const [alias, setAlias] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [schoolId, setSchoolId] = useState("");
  const [classId, setClassId] = useState("");
  const [teacherId, setTeacherId] = useState("");

  // Prefill on edit
  useEffect(() => {
    if (open && editData) {
      setAlias(editData.alias);
      setPlayerId(editData.user.email || "");
      setSchoolId(editData.schoolId?.toString() || "");
      setClassId(editData.classId?.toString() || "");
      setTeacherId(editData.teacherId?.toString() || "");
    } else {
      setAlias("");
      setPlayerId("");
      setSchoolId("");
      setClassId("");
      setTeacherId("");
    }
  }, [open, editData]);

  // Fetch schools
  const { data: schoolsData } = useQuery({
    queryKey: ["schools"],
    queryFn: () => fetch("/api/schools").then((r) => r.json()),
    enabled: open,
  });

  // Fetch teachers
  const { data: teachersData } = useQuery({
    queryKey: ["teachers"],
    queryFn: () => fetch("/api/teachers").then((r) => r.json()),
    enabled: open,
  });

  // Fetch classes
  const { data: classesData } = useQuery({
    queryKey: ["classes"],
    queryFn: () => fetch("/api/teachers/classes").then((r) => r.json()),
    enabled: open,
  });

  // Create student
  const createStudent = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/teachers/students", {
        method: "POST",
        body: JSON.stringify({
          alias,
          playerId,
          schoolId: Number(schoolId),
          classId: Number(classId),
          teacherId: teacherId ? Number(teacherId) : null,
        }),
      });

      if (!res.ok) throw new Error();
      return res.json();
    },
    onSuccess: () => {
      toast.success("Student created");
      onClose();
    },
  });

  // Update student
  const updateStudent = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/teachers/students/${editData.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          alias,
          playerId,
          schoolId: Number(schoolId),
          classId: Number(classId),
          teacherId: teacherId ? Number(teacherId) : null,
        }),
      });
      console.log("resposnse is here", res.json());
      if (!res.ok) throw new Error();
      return res.json();
    },
    onSuccess: () => {
      toast.success("Student updated");
      onClose();
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <ToastContainer />

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {isEdit ? "Edit Student" : "Add New Student"}
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-4">
          {/* Alias */}
          <div>
            <label className="text-sm font-medium">Alias</label>
            <input
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="w-full rounded border px-3 py-2"
              placeholder="John Doe"
            />
          </div>

          {/* Player ID */}
          <div>
            <label className="text-sm font-medium">Player ID (optional)</label>
            <input
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              className="w-full rounded border px-3 py-2"
              placeholder="UUID"
            />
          </div>

          {/* School */}
          <div>
            <label className="text-sm font-medium">School</label>
            <select
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
              className="w-full rounded border px-3 py-2"
            >
              <option value="">Select School</option>
              {(schoolsData?.schools || []).map((s: any) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Class */}
          <div>
            <label className="text-sm font-medium">Class</label>
            <select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              className="w-full rounded border px-3 py-2"
            >
              <option value="">Select Class</option>
              {(classesData?.classes || []).map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.className}
                </option>
              ))}
            </select>
          </div>

          {/* Teacher (optional) */}
          <div>
            <label className="text-sm font-medium">Assign Teacher</label>
            <select
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
              className="w-full rounded border px-3 py-2"
            >
              <option value="">Optional</option>
              {(teachersData?.teachers || []).map((t: any) => (
                <option key={t.id} value={t.id}>
                  {t.email}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <Button onClick={onClose}>Cancel</Button>

          <Button
            className="bg-emerald-500 text-white"
            disabled={createStudent.isPending || updateStudent.isPending}
            onClick={() =>
              isEdit ? updateStudent.mutate() : createStudent.mutate()
            }
          >
            {createStudent.isPending || updateStudent.isPending
              ? "Saving..."
              : isEdit
                ? "Update Student"
                : "Create Student"}
          </Button>
        </div>
      </div>
    </div>
  );
}
