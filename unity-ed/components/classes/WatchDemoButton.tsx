"use client";
import { useState } from "react";

export default function WatchDemoButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-6 py-3 rounded-full bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition transform active:scale-95"
      >
        Watch Demo
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-black font-bold text-xl"
            >
              ✕
            </button>

            {/* Video */}
           <iframe
  width="100%"
  height="400"
  src="https://www.youtube.com/embed/ijOazEhTwSY" // <-- embed URL
  title="Demo Video"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>

          </div>
        </div>
      )}
    </>
  );
}
