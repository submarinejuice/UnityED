"use client";

import React from "react";
import Image from "next/image";
import { Users, BarChart, FileText, Settings, Clock, ClipboardList } from "lucide-react";
import TeacherHero from "@/components/TeacherHero";

// --- Reusable Card Components ---
const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:border-blue-300 hover:-translate-y-1 cursor-pointer h-full">
    <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-linear-to-br from-blue-100 to-blue-50 text-blue-600 mb-6 shadow-sm">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

const StepCard = ({ number, title, desc }: { number: string; title: string; desc: string }) => (
  <div className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
    <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-600 to-blue-700 flex items-center justify-center font-bold text-lg text-white mb-4">{number}</div>
    <h5 className="font-semibold text-base text-gray-900 mb-2">{title}</h5>
    <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
  </div>
);

const TestimonialCard = ({ quote, name, role }: { quote: string; name: string; role: string }) => (
  <div className="bg-white shadow-md border border-gray-100 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full">
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-yellow-400">★</span>
      ))}
    </div>
    <p className="text-gray-700 mb-6 text-base leading-relaxed italic">"{quote}"</p>
    <div className="border-t border-gray-100 pt-4">
      <p className="font-semibold text-gray-900">{name}</p>
      <p className="text-gray-600 text-sm mt-1">{role}</p>
    </div>
  </div>
);

const PriceCard = ({ title, price, features, highlight }: { title: string; price: string; features: string[]; highlight?: boolean }) => (
  <div className={`relative p-8 rounded-2xl transition-all duration-300 ${highlight ? "bg-linear-to-br from-blue-600 to-blue-800 text-white shadow-2xl transform scale-105 border-0" : "bg-white border border-gray-200 shadow-lg hover:shadow-2xl hover:border-blue-300"}`}>
    {highlight && <div className="absolute top-0 right-0 bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-xs font-bold">POPULAR</div>}
    <div className="mb-8">
      <h3 className={`text-2xl font-bold mb-2 ${highlight ? "text-white" : "text-gray-900"}`}>{title}</h3>
      <div className="flex items-baseline gap-1">
        <span className={`text-4xl font-extrabold ${highlight ? "text-white" : "text-blue-600"}`}>{price}</span>
        {price !== "Custom" && <span className={highlight ? "text-blue-100" : "text-gray-600"}>per month</span>}
      </div>
    </div>
    <ul className={`space-y-3 mb-8 ${highlight ? "text-blue-50" : "text-gray-700"}`}>
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3">
          <span className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${highlight ? "bg-blue-400" : "bg-blue-100"}`}>
            <span className={`text-xs font-bold ${highlight ? "text-white" : "text-blue-600"}`}>✓</span>
          </span>
          <span className="text-sm">{f}</span>
        </li>
      ))}
    </ul>
    <button className={`w-full px-6 py-3 rounded-full font-semibold transition-all duration-300 transform active:scale-95 ${highlight ? "bg-white text-blue-700 hover:bg-blue-50 shadow-lg hover:shadow-xl" : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"}`}>
      {highlight ? "Start Free Trial" : title === "School" ? "Contact Sales" : "Get Started"}
    </button>
  </div>
);

// --- Page Sections ---
const FeaturesSection = () => (
  <section className="py-24 md:py-32 bg-linear-to-b from-blue-50 via-white to-blue-50">
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Teacher Dashboard Features</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Comprehensive tools to manage, track, and support your students' learning journey</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard icon={<BarChart className="h-7 w-7" />} title="Real-Time Analytics" desc="View comprehensive analytics on student performance, engagement, and progress instantly." />
        <FeatureCard icon={<Users className="h-7 w-7" />} title="Class Management" desc="Easily manage multiple classes, add students, and organize learning activities efficiently." />
        <FeatureCard icon={<FileText className="h-7 w-7" />} title="Detailed Reports" desc="Generate comprehensive reports for individual students or entire classes with insights." />
        <FeatureCard icon={<Settings className="h-7 w-7" />} title="Customizable Settings" desc="Tailor the learning experience to match your curriculum and teaching style perfectly." />
        <FeatureCard icon={<Clock className="h-7 w-7" />} title="Time Tracking" desc="Monitor how much time students spend on different activities and topics." />
        <FeatureCard icon={<ClipboardList className="h-7 w-7" />} title="Assignment Tracking" desc="Create assignments, track completion rates, and review student submissions effortlessly." />
      </div>
    </div>
  </section>
);

const HowItWorksSection = () => (
  <section className="py-24 md:py-32 bg-white">
    <div className="max-w-6xl mx-auto px-6 sm:px-8">
      <div className="mb-16 text-center">
        <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Get started in three simple steps</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StepCard number="1" title="Create Your Account" desc="Sign up for a free teacher account and set up your profile in minutes." />
        <StepCard number="2" title="Add Your Students" desc="Create classes and invite students with simple, shareable access codes." />
        <StepCard number="3" title="Track Progress" desc="Monitor student activity and use insights to improve learning outcomes." />
      </div>
    </div>
  </section>
);

const WhyTeachersLove = () => (
  <section className="py-20 bg-blue-50">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
      <div className="order-2 md:order-1">
        <Image src="/images/teachers-why.png" alt="teachers" width={560} height={360} className="rounded-3xl shadow-lg" />
      </div>
      <div className="order-1 md:order-2 bg-white p-8 rounded-3xl shadow-xl">
        <h3 className="text-2xl font-extrabold mb-4">Why Teachers Love UnityED</h3>
        <ul className="space-y-3 text-gray-700 text-sm">
          <li>✔ Save hours of grading and administrative work</li>
          <li>✔ Identify struggling students before they fall behind</li>
          <li>✔ Personalize learning based on individual student needs</li>
          <li>✔ Engage students with interactive, game-based learning</li>
          <li>✔ Generate professional reports for parents and administrators</li>
          <li>✔ Access comprehensive curriculum-aligned content</li>
        </ul>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-24 md:py-32 bg-linear-to-b from-blue-50 to-white">
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Teachers Are Saying</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Trusted by educators transforming their classrooms</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <TestimonialCard quote="UnityED has completely transformed my classroom. I can now see exactly where each student is struggling and provide targeted support." name="Jennifer Williams" role="4th Grade Teacher" />
        <TestimonialCard quote="This platform saved me hours and helped me personalize learning for each student. A game-changer!" name="Michael R." role="6th Grade Teacher" />
        <TestimonialCard quote="Engaging, intuitive, and incredibly insightful tools for both teachers and students alike. Highly recommended." name="Aisha K." role="5th Grade Teacher" />
      </div>
    </div>
  </section>
);

const PricingSection = () => (
  <section className="py-24 md:py-32 bg-linear-to-b from-white via-blue-50 to-white">
    <div className="max-w-7xl mx-auto px-6 sm:px-8">
      <div className="mb-20 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Choose the perfect plan for your classroom. All plans include core features with priority support.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
        <PriceCard title="Free" price="$0" features={["Up to 30 students", "Basic analytics", "Email support", "Community access"]} />
        <PriceCard highlight title="Professional" price="$29" features={["Unlimited students", "Advanced analytics", "Priority support", "Custom reports", "Detailed insights"]} />
        <PriceCard title="School" price="Custom" features={["Unlimited teachers", "Admin dashboard", "Dedicated support", "Training sessions", "API access"]} />
      </div>
      <div className="mt-16 text-center">
        <p className="text-gray-600 text-lg">Need a custom plan? <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Contact our team</span></p>
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-24 md:py-32 bg-linear-to-r from-blue-600 via-blue-700 to-blue-800">
    <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Classroom?</h2>
      <p className="text-xl text-blue-50 mb-10 max-w-2xl mx-auto leading-relaxed">Join thousands of teachers using UnityED to create engaging, data-driven learning experiences.</p>
      <button className="px-10 py-4 rounded-full bg-white text-blue-700 font-bold shadow-lg transition-all duration-300 hover:bg-blue-50 hover:shadow-2xl active:scale-95 inline-block">
        Get Started Today
      </button>
      <p className="text-blue-100 mt-6 text-sm">No credit card required • Free 14-day trial</p>
    </div>
  </section>
);

// --- Main Page ---
export default function TeacherDashboardLanding() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <TeacherHero />
      <FeaturesSection />
      <HowItWorksSection />
      <WhyTeachersLove />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
    </div>
  );
}
