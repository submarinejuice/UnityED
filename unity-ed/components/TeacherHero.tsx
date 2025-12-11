"use client";

import Image from "next/image";
import React from "react";
import WatchDemoButton from "./classes/WatchDemoButton";

export default function TeacherHero() {
  return (
    <section className="max-w-360 mx-auto px-6 sm:px-8 pt-20 md:pt-24 pb-20 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
      {/* Text Content */}
      <div className="bg-white rounded-3xl p-10 md:p-12 shadow-xl border border-gray-100">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          Empower Your Teaching with Data
        </h1>

        <p className="text-gray-700 text-base md:text-lg lg:text-xl mb-8 leading-relaxed">
          UnityED provides teachers with powerful tools to track student progress, 
          identify learning gaps, and make informed decisions that improve outcomes.
        </p>

        <div className="flex flex-wrap gap-4">
          <WatchDemoButton />
          <button className="px-6 py-3 rounded-full bg-amber-300 text-gray-900 font-semibold shadow hover:bg-amber-400 transition transform active:scale-95">
            Login
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="flex justify-center md:justify-end md:pr-8">
        <div
          className="
            relative 
            bg-blue-50 
            rounded-3xl 
            shadow-2xl 
            overflow-hidden

            w-72 h-72
            sm:w-80 sm:h-80
            md:w-[420px] md:h-[420px]
            lg:w-[500px] lg:h-[500px]
            xl:w-[550px] xl:h-[550px]
          "
        >
          <Image
            src="/images/teachers-hero.png"
            alt="Teachers illustration"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
