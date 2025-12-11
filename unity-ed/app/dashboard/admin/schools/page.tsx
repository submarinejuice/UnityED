"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminDashboardPage from "../page";
import SchoolModal from "./components/SchoolModal";

// Define types
interface School {
  id: number;
  name: string;
  address?: string;
  contactNumber?: string;
  _count?: {
    students: number;
  };
}

export default function ManageSchoolsPage() {
  const queryClient = useQueryClient();

  // modal state (ONLY FOR CREATE)
  const [openModal, setOpenModal] = useState(false);

  // inline editing
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState({
    name: "",
    address: "",
    contactNumber: "",
  });

  // ================================
  // FETCH SCHOOLS
  // ================================
  const { data, isLoading, isError } = useQuery({
    queryKey: ["schools"],
    queryFn: async () => {
      const res = await fetch("/api/admin/schools");
      if (!res.ok) throw new Error("Failed to fetch schools");
      return res.json();
    },
  });

  const schools: School[] = data?.schools ?? [];

  // ================================
  // CREATE SCHOOL MUTATION
  // ================================
  const createMutation = useMutation({
    mutationFn: async (formData: any) => {
      const res = await fetch("/api/admin/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to create school");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schools"] });
      setOpenModal(false);
    },
  });

  // ================================
  // UPDATE SCHOOL INLINE MUTATION
  // ================================
  const inlineUpdateMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/admin/schools/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editValues),
      });
      if (!res.ok) throw new Error("Failed to update school");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schools"] });
      setEditingId(null);
    },
  });

  // ================================
  // DELETE SCHOOL
  // ================================
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/admin/schools/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete school");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schools"] });
    },
  });

  // ================================
  // HANDLERS
  // ================================
  const startEditing = (school: School) => {
    setEditingId(school.id);
    setEditValues({
      name: school.name,
      address: school.address || "",
      contactNumber: school.contactNumber || "",
    });
  };

  const cancelInlineEdit = () => {
    setEditingId(null);
    setEditValues({ name: "", address: "", contactNumber: "" });
  };

  const submitInlineEdit = () => inlineUpdateMutation.mutate();

  return (
    <AdminDashboardPage>
      <div className="m-4 flex min-h-screen bg-gray-50">
        <div className="w-full p-8">
          {/* TITLE + BUTTON */}
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#143E73]">
              Manage Schools
            </h1>

            <button
              className="rounded bg-blue-600 px-4 py-2 text-white"
              onClick={() => setOpenModal(true)}
            >
              Add School
            </button>
          </div>

          {/* CREATE NEW SCHOOL MODAL */}
          <SchoolModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            editData={null}
            onSubmit={(formData: any) => createMutation.mutate(formData)}
          />

          {isLoading && <div>Loading...</div>}
          {isError && <div className="text-red-600">Failed to load</div>}

          {!isLoading && !isError && (
            <div className="overflow-x-auto rounded-lg bg-white shadow-md">
              <table className="min-w-full text-left text-sm text-gray-700">
                <thead className="bg-[#143E73] text-white">
                  <tr>
                    <th className="px-6 py-3">School Name</th>
                    <th className="px-6 py-3">Address</th>
                    <th className="px-6 py-3">Contact</th>
                    <th className="px-6 py-3">Students</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {schools.map((school: School) => {
                    const isEditing = editingId === school.id;

                    return (
                      <tr key={school.id} className="border-b">
                        {/* NAME */}
                        <td className="px-6 py-4">
                          {isEditing ? (
                            <input
                              value={editValues.name}
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  name: e.target.value,
                                })
                              }
                              className="w-full rounded border px-2 py-1"
                            />
                          ) : (
                            school.name
                          )}
                        </td>

                        {/* ADDRESS */}
                        <td className="px-6 py-4">
                          {isEditing ? (
                            <input
                              value={editValues.address}
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  address: e.target.value,
                                })
                              }
                              className="w-full rounded border px-2 py-1"
                            />
                          ) : (
                            school.address || "—"
                          )}
                        </td>

                        {/* CONTACT */}
                        <td className="px-6 py-4">
                          {isEditing ? (
                            <input
                              value={editValues.contactNumber}
                              onChange={(e) =>
                                setEditValues({
                                  ...editValues,
                                  contactNumber: e.target.value,
                                })
                              }
                              className="w-full rounded border px-2 py-1"
                            />
                          ) : (
                            school.contactNumber || "—"
                          )}
                        </td>

                        {/* STUDENTS */}
                        <td className="px-6 py-4">
                          {school._count?.students ?? 0}
                        </td>

                        {/* ACTIONS */}
                        <td className="px-6 py-4 text-right">
                          {!isEditing ? (
                            <div className="flex justify-end gap-3">
                              <button
                                className="text-blue-600"
                                onClick={() => startEditing(school)}
                              >
                                Edit
                              </button>

                              <button
                                className="text-red-600"
                                onClick={() => deleteMutation.mutate(school.id)}
                              >
                                Delete
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-end gap-2">
                              <button
                                className="text-green-600"
                                onClick={submitInlineEdit}
                              >
                                Save
                              </button>
                              <button
                                className="text-red-600"
                                onClick={cancelInlineEdit}
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}

                  {schools.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-4 text-center text-gray-500"
                      >
                        No schools found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminDashboardPage>
  );
}
