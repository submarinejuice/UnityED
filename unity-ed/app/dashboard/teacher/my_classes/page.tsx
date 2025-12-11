// app/(your-folder)/page.tsx
"use client";

import DashboardTeacher from "../page";
import MyClassComponent from "./components/Myclass";

export default function Page() {
  return (
    <DashboardTeacher>
      <div>
        <MyClassComponent />
      </div>
    </DashboardTeacher>
  );
}
