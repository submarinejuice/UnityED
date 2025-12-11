import { Button } from "@/components/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

interface AddClassModalProps {
  open: boolean;
  onClose: () => void;
  editData?: any;
}

export default function AddClassModal({ open, onClose, editData }: AddClassModalProps) {
  const isEdit = !!editData;
  const queryClient = useQueryClient();
  const [schoolId, setSchoolId] = useState("");
  const [className, setClassName] = useState("");
  const [teacherId, setTeacherId] = useState("");

  // Prefill form in edit mode
  useEffect(() => {
    if (open && editData) {
      setSchoolId(editData.schoolId?.toString() || "");
      setClassName(editData.className || "");
      setTeacherId(editData.teacherId?.toString() || "");
    } else {
      setSchoolId("");
      setClassName("");
      setTeacherId("");
    }
  }, [open, editData]);

  // Fetch schools
  const { data: schoolsData } = useQuery({
    queryKey: ["schools"],
    queryFn: async () => {
      const res = await fetch("/api/schools");
      return res.json();
    },
    enabled: open,
  });

  // Fetch teachers
  const { data: teachersData } = useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const res = await fetch("/api/teachers");
      return res.json();
    },
    enabled: open,
  });

  // Create class
  const createClass = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/teachers/classes", {
        method: "POST",
        body: JSON.stringify({
          schoolId: Number(schoolId),
          className,
          teacherId: teacherId ? Number(teacherId) : null,
        }),
      });
      if (!res.ok) throw new Error("Failed to create class");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Class created");
      queryClient.invalidateQueries({ queryKey: ["admin-classes"] });
      onClose();
    },
  });

  // Update class
  const updateClass = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/teachers/classes/${editData.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          schoolId: Number(schoolId),
          className,
          teacherId: teacherId ? Number(teacherId) : null,
        }),
      });
      if (!res.ok) throw new Error("Failed to update class");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Class updated");
      onClose();
    },
  });

  if (!open) return null;

  const schools = schoolsData?.schools ?? [];
  const teachers = teachersData?.teachers ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <ToastContainer />
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {isEdit ? "Edit Class" : "Create New Class"}
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Select School</label>
            <select
              className="w-full rounded border px-3 py-2"
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
            >
              <option value="">Choose School</option>
              {schools.map((s: any) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Class Name</label>
            <input
              className="w-full rounded border px-3 py-2"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Class 5A"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Teacher</label>
            <select
              className="w-full rounded border px-3 py-2"
              value={teacherId}
              onChange={(e) => setTeacherId(e.target.value)}
            >
              {teachers.map((t: any) => (
                <option key={t.id} value={t.id}>
                  {t.email}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            className="bg-emerald-500 text-white"
            onClick={() =>
              isEdit ? updateClass.mutate() : createClass.mutate()
            }
          >
            {isEdit ? "Update Class" : "Create Class"}
          </Button>
        </div>
      </div>
    </div>
  );
}
