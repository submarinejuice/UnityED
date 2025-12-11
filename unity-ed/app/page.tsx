"use client";
import WatchDemoButton from "@/components/classes/WatchDemoButton";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
  FaGamepad,
  FaChartBar,
  FaChalkboardTeacher,
  FaUserFriends,
  FaBookOpen,
  FaChartLine,
} from "react-icons/fa";
import Link from "next/link";
export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <main>
                {/* Hero Section */}
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2">
          <div className="space-y-6">
            <h1 className="text-4xl leading-tight font-extrabold text-blue-800 md:text-5xl">
              Empowering Learning Through Play
            </h1>
            <p className="text-lg text-gray-700">
              Our educational games make learning engaging and fun.
            </p>
            <div className="flex flex-wrap gap-4">
              <WatchDemoButton />
              {!session && (
                <Link href="/login">
                  <button className="transform rounded-full bg-amber-300 px-8 py-3 font-semibold text-gray-900 shadow-lg transition hover:bg-amber-400 active:scale-95">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="flex justify-center">
              {" "}
              <Image
                src="/images/hero.png"
                alt="Learning Robot"
                width={400}
                height={400}
                className="scale-120 object-contain"
              />{" "}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <h2 className="mb-12 text-center text-3xl font-extrabold text-blue-800 md:text-4xl">
          Our Features
        </h2>
        <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-20 md:grid-cols-3">
          {[
            {
              icon: <FaGamepad className="text-3xl text-yellow-400" />,
              title: "Interactive Gaming",
              text: "Engage students with fun and educational challenges",
            },
            {
              icon: <FaChartBar className="text-3xl text-blue-600" />,
              title: "Real-time Progress Track",
              text: "Monitor student progress with live analytics",
            },
            {
              icon: <FaChalkboardTeacher className="text-3xl text-blue-600" />,
              title: "Teacher’s Dashboard",
              text: "Access detailed reports and insights",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex h-full flex-col items-center rounded-3xl bg-white p-8 text-center shadow-xl transition hover:shadow-2xl"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="mb-2 text-xl font-extrabold text-gray-900">
                {item.title}
              </h3>
              <p className="text-base text-gray-600">{item.text}</p>
            </div>
          ))}
        </section>

        {/* Why Choose Section */}
        <section className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="mb-12 text-center text-3xl font-extrabold text-blue-800 md:text-4xl">
            Why Choose UnityED?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: <FaUserFriends className="text-3xl text-gray-700" />,
                title: "Student Tracking",
                text: "Monitor individual student progress with detailed analytics and performance metrics in real-time.",
              },
              {
                icon: <FaChartLine className="text-3xl text-gray-700" />,
                title: "Data Visualization",
                text: "Transform raw data into actionable insights with beautiful charts and comprehensive reports.",
              },
              {
                icon: <FaBookOpen className="text-3xl text-gray-700" />,
                title: "Class Management",
                text: "Access data-driven insights to simplify classroom management and boost performance.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex h-full flex-col items-center rounded-3xl bg-white p-8 text-center shadow-xl transition hover:shadow-2xl"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="mb-2 text-xl font-extrabold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-base text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Engaging Gameplay Section */}
        <section className="bg-blue-50 py-20">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-blue-800 md:text-4xl">
                Engaging Educational Gameplay
              </h2>
              <p className="text-base text-gray-700">
                Our Unity-powered game makes learning fun and interactive.
                Students explore, solve problems, and develop critical thinking
                skills while teachers gain valuable insights.
              </p>
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-800">
                  Building Social Skills Through Play
                </h4>
                <ul className="list-inside list-disc space-y-1 text-sm text-gray-700">
                  <li>
                    <b>Interactive Gaming:</b> Choice-driven scenarios and
                    role-play.
                  </li>
                  <li>
                    <b>Foster Belonging:</b> Builds empathy and inclusion.
                  </li>
                  <li>
                    <b>Emotional Intelligence:</b> Recognize feelings and
                    regulate responses.
                  </li>
                  <li>
                    <b>Anti-Bullying:</b> Encourages accountability and empathy.
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative h-72 w-full overflow-hidden rounded-3xl shadow-lg md:h-96">
              <Image
                src="/images/gameplay.png"
                alt="Educational Gameplay"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 60vw, 400px"
              />
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2 className="mb-12 text-3xl font-extrabold text-blue-800 md:text-4xl">
            What Teachers Are Saying
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex h-full flex-col justify-between rounded-3xl bg-white p-8 text-left shadow-xl transition hover:shadow-2xl"
              >
                <p className="mb-4 text-sm text-gray-700 italic">
                  “UnityED has completely transformed my classroom. I can now
                  see exactly where each student is struggling and provide
                  targeted support.”
                </p>
                <div>
                  <p className="font-bold text-blue-600">Jennifer Williams</p>
                  <p className="text-sm text-gray-500">4th Grade Teacher</p>
                  <p className="text-sm text-gray-500">Lincoln Elementary</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-8 bg-linear-to-r from-blue-600 to-blue-800 py-24 md:py-32 text-center rounded-3xl mx-6">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">
              Ready to Transform Your Classroom?
            </h2>
            <p className="mb-10 text-lg text-blue-50">
              Start your free trial today and see the difference UnityED can make.
            </p>
            <button className="transform rounded-full bg-white px-8 py-3.5 font-bold text-blue-600 shadow-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-2xl active:scale-95">
              Get Started
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
