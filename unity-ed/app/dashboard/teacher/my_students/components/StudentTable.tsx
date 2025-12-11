"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/button";
import {
  Users,
  Plus,
  Edit,
  MessageSquare,
  UserCircle,
  Trash2,
} from "lucide-react";

import AddStudentModal from "./AddStudentModal";
import DeleteStudentModal from "./DeleteStudentModal";

// // Delete student
// const deleteStudent = useMutation({
//   mutationFn: async (id) => {
//     const res = await fetch(`/api/teachers/students/${id}`, {
//       method: "DELETE",
//     });
//     if (!res.ok) throw new Error();
//     return res.json();
//   },
//   onSuccess: () => {
//     toast.success("Student deleted");
//     onClose();
//   },
//   onError: () => {
//     toast.error("Failed to delete student");
//   },
// });

export default function StudentTable() {
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteStudent, setDeleteStudent] = useState(null);

  // Fetch Students API
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await fetch("/api/teachers/students");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  const students = data?.students ?? [];

  // Get classes from student.class.className
  const classes = useMemo(() => {
    const cls = students.map((s: any) => ({
      id: s.class.id,
      className: s.class.className,
    }));

    // Remove duplicates
    const unique = Array.from(new Map(cls.map((c: any) => [c.id, c])).values());

    return unique;
  }, [students]);

  // Filter State
  const [selectedClass, setSelectedClass] = useState("all");

  const filteredStudents = useMemo(() => {
    if (selectedClass === "all") return students;
    return students.filter((s: any) => s.class.id.toString() === selectedClass);
  }, [selectedClass, students]);

  return (
    <div className="w-full">
      {/* Modal */}
      <AddStudentModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditData(null);
          refetch();
        }}
        editData={editData}
      />
      <DeleteStudentModal
        open={deleteModalOpen}
        student={deleteStudent}
        onClose={() => setDeleteModalOpen(false)}
        onDeleteSuccess={() => refetch()}
      />

      <Card className="rounded-xl border p-10 shadow-sm">
        <CardHeader className="flex items-center justify-between px-2 pb-8">
          <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-900">
            <Users className="h-6 w-6" />
            Student Management
          </CardTitle>

          <Button
            className="bg-blue-600 px-4 py-2 text-white"
            onClick={() => {
              setEditData(null);
              setOpenModal(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Student
          </Button>
        </CardHeader>

        <CardContent className="px-2">
          {/* Class Select */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium">
              Select Class
            </label>

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-48 rounded-lg border px-4 py-2"
            >
              <option value="all">All</option>

              {classes.map((cls: any) => (
                <option key={cls.id} value={cls.id}>
                  {cls.className}
                </option>
              ))}
            </select>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-xl border">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left font-semibold">Student Name</th>
                  <th className="p-4 text-left font-semibold">Player ID</th>
                  <th className="p-4 text-left font-semibold">Class</th>
                  <th className="p-4 pr-6 text-right font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {!isLoading &&
                  filteredStudents.map((student: any) => (
                    <tr
                      key={student.id}
                      className="border-t transition hover:bg-gray-50"
                    >
                      <td className="p-4 font-medium">{student.alias}</td>

                      <td className="p-4">
                        <code className="rounded-md bg-gray-100 px-3 py-1 text-sm">
                          {student.user.email || "—"}
                        </code>
                      </td>

                      <td className="p-4">{student.class.className}</td>

                      <td className="p-4 pr-6">
                        <div className="flex justify-end gap-4">
                          <Edit
                            className="h-4 w-4 cursor-pointer"
                            onClick={() => {
                              setEditData(student);
                              setOpenModal(true);
                            }}
                          />
                          <Trash2
                            className="h-4 w-4 cursor-pointer text-red-600"
                            onClick={() => {
                              setDeleteModalOpen(true);
                              setDeleteStudent(student);
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}

                {filteredStudents.length === 0 && !isLoading && (
                  <tr>
                    <td
                      colSpan={5}
                      className="p-6 text-center text-gray-500 italic"
                    >
                      No students found in this class
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
