"use client";
import AdminDashboardPage from "../page";
export default function AdminSettingsPage() {
  return (
    <AdminDashboardPage>
      <div className="flex min-h-screen w-full justify-center p-5">
        <div className="justify-center p-5">
          <h1 className="mb-4 text-2xl font-bold text-[#143E73]">Settings</h1>
          <p className="mb-6 text-gray-600">
            Manage your account and system configurations here.
          </p>

          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
            <form className="space-y-4">
              <div>
                <label className="mb-1 block font-medium text-gray-700">
                  Admin Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-md border border-gray-300 p-2"
                  defaultValue="admin@unityed.com"
                />
              </div>

              <div>
                <label className="mb-1 block font-medium text-gray-700">
                  Change Password
                </label>
                <input
                  type="password"
                  className="w-full rounded-md border border-gray-300 p-2"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="rounded-md bg-[#316CF4] px-4 py-2 text-white transition hover:bg-[#2554C7]"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminDashboardPage>
  );
}
