"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface DeleteStudentModalProps {
  open: boolean;
  onClose: () => void;
  student: any;
  onDeleteSuccess: () => void;
}

export default function DeleteStudentModal({
  open,
  onClose,
  student,
  onDeleteSuccess,
}: DeleteStudentModalProps) {
  if (!open || !student) return null;

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/teachers/students/${student.id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Student deleted");
      onDeleteSuccess();
      onClose();
    },
    onError: () => {
      toast.error("Delete failed");
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold text-red-600">
          Delete Student?
        </h2>

        <p className="mb-4 text-gray-700">Are you sure you want to delete:</p>

        <div className="mb-4 rounded border bg-gray-50 p-3">
          <p>
            <strong>Alias:</strong> {student.alias}
          </p>
          <p>
            <strong>Email:</strong> {student?.user?.email}
          </p>
          <p>
            <strong>Class:</strong> {student?.class?.className}
          </p>
          <p>
            <strong>School:</strong> {student?.school?.name}
          </p>
        </div>

        <p className="mb-6 text-sm text-gray-600">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="rounded border px-4 py-2">
            Cancel
          </button>

          <button
            disabled={deleteMutation.isPending}
            onClick={() => deleteMutation.mutate()}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
