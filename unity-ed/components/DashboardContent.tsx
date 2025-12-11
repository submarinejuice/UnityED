"use client";
import React from "react";
// import Sidebar from "./Sidebar";
// import Topbar from "./topbar";
// import Navbar from "./Navbar";

// Minimal dashboard view to embed inside home
export default function DashboardContent() {
  return (
    
      <div className="flex min-h-[70vh] bg-gray-50 rounded-lg overflow-hidden shadow">
     
            {/* Sidebar */}
            <div className="w-64">
              {/* <Sidebar /> */}
              <div>Sidebar Placeholder</div>
            </div>

      <div className="flex-1">
        {/* <Topbar /> */}
        <div>Topbar Placeholder</div>
        <main className="p-6">
          <h3 className="text-xl font-semibold mb-3">Dashboard Overview</h3>
          <p className="text-sm text-gray-600 mb-6">KPIs and charts will go here.</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow">Active Students<br /><strong>14</strong></div>
            <div className="bg-gray-50 p-4 rounded-lg shadow">Attempts<br /><strong>43</strong></div>
            <div className="bg-gray-50 p-4 rounded-lg shadow">Average Score<br /><strong>74.1</strong></div>
            <div className="bg-gray-50 p-4 rounded-lg shadow">Last Updated<br /><strong>2025-10-27</strong></div>
          </div>
        </main>
      </div>
    </div>
  );
}
