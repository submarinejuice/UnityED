"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminDashboardPage from "../page";
import { useState } from "react";
import { Button } from "@/components/button";
import AddSubjectModal from "./components/AddSubjectModal";

export default function ManageSubjectsPage() {
  const queryClient = useQueryClient();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const [addOpen, setAddOpen] = useState(false);

  // Fetch subjects
  const { data, isLoading, isError } = useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const res = await fetch("/api/admin/subjects");
      if (!res.ok) throw new Error("Failed to fetch subjects");
      return res.json();
    },
  });

  const subjects = data?.subjects ?? [];

  // Update subject
  const updateMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/admin/subjects/${editingId}`, {
        method: "PATCH",
        body: JSON.stringify({ name: editName }),
      });
      if (!res.ok) throw new Error("Failed to update subject");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      setEditingId(null);
    },
  });

  const startEditing = (subject: any) => {
    setEditingId(subject.id);
    setEditName(subject.name);
  };

  return (
    <AdminDashboardPage>
      <div className="flex min-h-screen m-4 bg-gray-50">
        
        <AddSubjectModal open={addOpen} onClose={() => setAddOpen(false)} />

        <div className="w-full p-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-[#143E73]">Manage Subjects</h1>

            <Button
              className="bg-[#143E73] text-white"
              onClick={() => setAddOpen(true)}
            >
              Add New Subject
            </Button>
          </div>

        {isLoading && <p>Loading subjects...</p>}
        {isError && <p className="text-red-600">Failed to load subjects.</p>}

        {!isLoading && !isError && (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-[#143E73] text-white">
                <tr>
                  <th className="px-6 py-3">Subject Name</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {subjects.length === 0 && (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No subjects found.
                    </td>
                  </tr>
                )}

                {subjects.map((subject: any) => {
                  const isEditing = editingId === subject.id;

                  return (
                    <tr key={subject.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="border px-2 py-1 rounded w-full"
                          />
                        ) : (
                          subject.name
                        )}
                      </td>

                      <td className="px-6 py-4 text-right">
                        {!isEditing ? (
                          <button
                            className="text-blue-600 hover:underline"
                            onClick={() => startEditing(subject)}
                          >
                            Edit
                          </button>
                        ) : (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => updateMutation.mutate()}
                              className="text-green-600 hover:underline"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="text-red-600 hover:underline"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </div>
    </AdminDashboardPage>
  );
}
