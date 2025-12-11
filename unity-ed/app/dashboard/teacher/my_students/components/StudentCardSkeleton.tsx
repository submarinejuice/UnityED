"use client";

export default function StudentCardSkeleton() {
  return (
    <div className="bg-white border rounded-2xl shadow-sm p-5 animate-pulse space-y-4">

      {/* Title Skeleton */}
      <div className="h-5 w-1/2 bg-gray-300 rounded"></div>

      {/* Students Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-20 bg-gray-300 rounded"></div>
        </div>
        <div className="h-4 w-6 bg-gray-300 rounded"></div>
      </div>

      {/* Teacher Row */}
      <div className="flex items-center justify-between">
        <div className="h-4 w-16 bg-gray-300 rounded"></div>
        <div className="h-4 w-24 bg-gray-300 rounded"></div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="h-4 w-28 bg-gray-300 rounded"></div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gray-300 h-2 rounded-full w-3/5"></div>
        </div>
      </div>

    </div>
  );
}
