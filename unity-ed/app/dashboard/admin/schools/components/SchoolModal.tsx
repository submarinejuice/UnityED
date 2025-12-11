"use client";
import { useState, useEffect } from "react";

export default function SchoolModal({ open, onClose, editData, onSubmit }: any) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    contactNumber: "",
  });

  useEffect(() => {
    if (editData) {
      setForm({
        name: editData.name,
        address: editData.address || "",
        contactNumber: editData.contactNumber || "",
      });
    } else {
      setForm({ name: "", address: "", contactNumber: "" });
    }
  }, [editData]);

  if (!open) return null;

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow-xl space-y-4">
        <h2 className="text-xl font-bold">
          {editData ? "Edit School" : "Add School"}
        </h2>

        <input
          placeholder="School Name"
          className="w-full border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Address"
          className="w-full border p-2 rounded"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          placeholder="Contact Number"
          className="w-full border p-2 rounded"
          value={form.contactNumber}
          onChange={(e) =>
            setForm({ ...form, contactNumber: e.target.value })
          }
        />

        <div className="flex justify-end gap-3">
          <button className="px-4 py-2 border rounded" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={handleSubmit}
          >
            {editData ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}
