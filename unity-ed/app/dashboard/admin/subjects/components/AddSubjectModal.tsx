"use client";

import { ToastContainer, toast } from "react-toastify";
import { Button } from "@/components/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";

interface AddSubjectModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddSubjectModal({ open, onClose }: AddSubjectModalProps) {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");

  useEffect(() => {
    if (!open) setName("");
  }, [open]);

  // Create subject
  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/admin/subjects", {
        method: "POST",
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error("Failed to create subject");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Subject added");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      onClose();
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <ToastContainer />

      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Subject</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Subject Name</label>
            <input
              className="w-full border px-3 py-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Mathematics"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            className="bg-emerald-500 text-white"
            onClick={() => createMutation.mutate()}
          >
            Add Subject
          </Button>
        </div>
      </div>
    </div>
  );
}
