"use client";

import React from "react";
import { Brain, Star, RefreshCw, Zap, Gift, User, PawPrint, Home, Leaf, Globe, MessageCircle, Shield, Activity, BookOpen, Trophy, TrendingUp } from "lucide-react";

// --- Reusable Card Components ---
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex flex-col items-center text-center p-8 bg-white rounded-3xl shadow-xl transition duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer h-full border border-gray-100">
    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 mb-6 shadow-lg">{icon}</div>
    <h3 className="text-2xl font-extrabold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 flex-grow text-base">{description}</p>
  </div>
);

const TestimonialCard = ({ quote, name, title }: { quote: string; name: string; title: string }) => (
  <div className="bg-white shadow-xl p-6 rounded-2xl border-t-4 border-blue-500 transition duration-300 hover:shadow-2xl h-full transform hover:-translate-y-1">
    <p className="text-gray-700 mb-4 text-sm italic">"{quote}"</p>
    <p className="font-bold text-base text-pink-600">{name}</p>
    <p className="text-gray-500 text-xs">{title}</p>
  </div>
);

// --- Sections ---
const HeroSection = () => (
  <div className="bg-white pt-24 pb-32 lg:pt-36 lg:pb-40 relative overflow-hidden text-gray-900 text-center">
    <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 w-full max-w-sm mx-auto h-40 flex items-center justify-center">
        <span className="text-9xl transform rotate-3">🎮🧠</span>
      </div>
      <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
        Build Your <span className="text-indigo-600">Choices</span> and Shape Your Future
      </h1>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4 font-medium">
        Welcome to the UnityED Game Experience. Learn decision-making, emotional intelligence, and social skills while having fun.
      </p>
      <p className="text-indigo-500 font-semibold text-lg">Start your journey today. Become the hero of your own story.</p>
      <button className="mt-15 bg-indigo-500 text-white font-extrabold text-lg px-8 py-3 rounded-full shadow-lg shadow-indigo-300 hover:bg-indigo-600 transition duration-300 transform active:scale-95">
        Play the Game Now
      </button>
    </div>
  </div>
);

const FeaturesSection = () => (
  <div className="py-20 bg-blue-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <p className="text-base font-bold uppercase text-blue-700 mb-2 tracking-wider">SOCIAL EMOTIONAL GROWTH</p>
      <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-12">How the Game Helps You Become a Better Human</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <FeatureCard
          icon={<Star className="h-8 w-8" />}
          title="Understand Choices"
          description="Learn how your actions affect friends, classmates, teachers, and the school world. Every decision gives feedback that helps you grow."
        />
        <FeatureCard
          icon={<RefreshCw className="h-8 w-8" />}
          title="Practice Responses"
          description="Interact with characters, face realistic situations, and try different responses. Handle conflict, help others, or explore risky choices."
        />
        <FeatureCard
          icon={<Zap className="h-8 w-8" />}
          title="Grow Confidently"
          description="Earn rewards as you improve emotional awareness, empathy, and decision-making. Build habits that boost confidence in real life."
        />
      </div>
    </div>
  </div>
);

const FeatureHighlight = ({ title, subtitle, content, color, reverse }: { title: string; subtitle?: string; content: string; color: "blue" | "pink"; reverse?: boolean }) => (
  <div className={`py-24 lg:py-32 ${color === "blue" ? "bg-white" : "bg-blue-100"} text-gray-900 border-b border-gray-100`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`flex flex-col lg:flex-row items-center ${reverse ? "lg:flex-row-reverse" : ""} lg:space-x-16`}>
        <div className="lg:w-1/2 mb-10 lg:mb-0">
          {subtitle && <p className={`text-base font-bold uppercase mb-4 tracking-wider ${color === "blue" ? "text-indigo-600" : "text-indigo-800"}`}>{subtitle}</p>}
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-snug mb-6 text-gray-900">{title}</h2>
          <p className="text-lg text-gray-700">{content}</p>
        </div>
        <div className="lg:w-1/2 w-full flex justify-center">
          <div className="w-full max-w-md h-80 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-8 border-4 border-white ring-4 ring-blue-200">
            {color === "blue" ? <span className="text-8xl">🧠</span> : <span className="text-8xl">🎁</span>}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TestimonialSection = () => (
  <div className="py-20 bg-white border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Real Impact, Real Growth</h2>
      <p className="text-lg text-gray-600 mb-12 font-medium">Hear how our game is changing lives for the better.</p>
      <div className="grid md:grid-cols-3 gap-6">
        <TestimonialCard
          quote="This game helped me handle tough situations at school. I learned how my actions affect others."
          name="Ethan M."
          title="7th Grade Student"
        />
        <TestimonialCard
          quote="A fantastic, safe way for my child to explore emotions and behaviors with sensitivity."
          name="Sarah P."
          title="Parent, 4th Grader"
        />
        <TestimonialCard
          quote="I gained insight into identifying emotions and reacting calmly. Scenarios felt real and feedback was helpful."
          name="Chloe D."
          title="9th Grade Student"
        />
      </div>
    </div>
  </div>
);

const CallToAction = () => (
  <div className="py-20 bg-blue-100 border-t border-gray-200">
    <div className="max-w-4xl mx-auto text-center bg-white p-12 rounded-3xl shadow-2xl transform hover:scale-[1.01] transition duration-300">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Ready to Shape Your Choices?</h2>
      <p className="text-lg text-gray-600 mb-8 font-medium">Start your journey of self-discovery and emotional strength today.</p>
      <button className="bg-indigo-500 text-white font-extrabold text-lg px-8 py-3 rounded-full shadow-lg shadow-indigo-300 hover:bg-indigo-600 transition duration-300 transform active:scale-95">
        Play the Game Now
      </button>
    </div>
  </div>
);

// --- Main Page ---
export default function GamePage() {
  return (
    <div className="min-h-screen bg-blue-50 font-sans">
      <HeroSection />
      <FeaturesSection />
      <FeatureHighlight
        title="Emotional Intelligence: The most powerful skill you can build."
        subtitle="SELF-AWARENESS"
        content="UnityED’s emotional-learning engine analyzes your choices to help you understand your strengths, areas to improve, and how your decisions impact others. Unlock suggestions, hints, and mentor guidance to support your personal growth."
        color="blue"
      />
      <FeatureHighlight
        title="Play More. Unlock More Rewards and Customizations."
        subtitle="REWARDS & GAMEPLAY"
        content="Earn skins, pets with powers, decorate your house, and grow magical plants while exploring the school world."
        color="pink"
        reverse
      />
      <FeatureHighlight
        title="Explore the Game World and Engage in Quests."
        subtitle="GAME WORLD & KARMA SYSTEM"
        content="Meet NPCs, complete special roles, climb leaderboards, and see how your decisions shape the world."
        color="blue"
      />
      <FeatureHighlight
        title="Your Mentor Guides You Through Challenges."
        subtitle="MENTOR SYSTEM"
        content="Never get stuck. Learn emotional skills like handling peer pressure, being assertive, managing frustration, and helping others."
        color="pink"
        reverse
      />
      <TestimonialSection />
      <CallToAction />
    </div>
  );
}
