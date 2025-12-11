"use client";
import { useEffect, useState } from "react";

export default function TeacherModal({ open, onClose, editData }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [schoolId, setSchoolId] = useState("");

  const [schools, setSchools] = useState([]);

  // Load schools list
  useEffect(() => {
    const loadSchools = async () => {
      const res = await fetch("/api/admin/schools");
      const data = await res.json();
      setSchools(data.schools ?? []);
    };
    loadSchools();
  }, []);

  // Pre-fill data when editing
  useEffect(() => {
    if (editData) {
      setName(editData.name);
      setEmail(editData.user.email);
      setSchoolId(editData.schoolId ?? "");
      setPassword(""); // no password shown
    } else {
      setName("");
      setEmail("");
      setSchoolId("");
      setPassword("");
    }
  }, [editData]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let payload: any = { name, email, schoolId };

    if (!editData) {
      // POST requires password
      payload.password = password;
    }

    if (editData) {
      await fetch(`/api/admin/teacher-profile/${editData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/admin/teacher-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    onClose();
  };

  if (!open) return null;

  return (
    <div className="bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-[#143E73]">
          {editData ? "Edit Teacher" : "Add Teacher"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* NAME */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/*EMAIL*/}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD (ONLY FOR ADD) */}
          {!editData && (
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                className="mt-1 w-full rounded-lg border px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          )}

          {/* SCHOOL DROPDOWN */}
          <div>
            <label className="text-sm font-medium">School</label>
            <select
              className="mt-1 w-full rounded-lg border px-3 py-2"
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
              required
            >
              <option value="">Select School</option>
              {schools.map((school: any) => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              className="rounded-lg bg-gray-300 px-4 py-2"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-white"
            >
              {editData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
