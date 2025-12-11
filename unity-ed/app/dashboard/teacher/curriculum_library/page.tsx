"use client";
import React, { FC, useState, useEffect } from "react";
import {
  BookOpen,
  Search,
  Filter,
  Layers,
  Zap,
  Heart,
  Star,
  Eye,
  Send,
  MessageSquare,
  Clock,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Shield,
  Volume2,
  Users,
} from "lucide-react";
import DashboardTeacher from "../page";

// MOCK DATA

const mockResources = [
  {
    id: 1,
    type: "Lesson",
    category: "Empathy",
    title: "Empathy & Perspective Taking: Roleplaying Guide",
    difficulty: "Medium",
    duration: "45 min",
    rating: 4.5,
    icon: Heart,
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
    description:
      "This comprehensive lesson introduces students to the concept of perspective-taking. It includes interactive roleplaying scenarios designed to help students understand the feelings and motivations of others in conflict situations. Key areas covered are active listening, non-verbal cues, and validating emotions. Suitable for small group activities.",
  },
  {
    id: 2,
    type: "Game",
    category: "Bystander",
    title: "The Bystander Challenge: Quick Scenarios",
    difficulty: "Easy",
    duration: "10 min",
    rating: 4.8,
    icon: Zap,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-50",
    description:
      "A fast-paced, decision-making game covering three common bullying situations (physical, verbal, cyber). Students are presented with a challenge and must choose the most effective intervention strategy within a short time limit. This resource is perfect for quick warm-ups or exit tickets.",
  },
  {
    id: 3,
    type: "Assessment",
    category: "Self-Awareness",
    title: "Social Awareness Quiz V2: Identifying Conflict",
    difficulty: "Hard",
    duration: "15 min",
    rating: 4.1,
    icon: MessageSquare,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50",
    description:
      "A detailed post-module assessment covering complex social dynamics, including implicit bias and groupthink. The assessment utilizes case studies and open-ended questions to gauge a student's ability to recognize subtle forms of bullying and implement preventive measures.",
  },
  {
    id: 4,
    type: "Lesson",
    category: "Intervention",
    title: "Speak Up Safely: Techniques for Reporting",
    difficulty: "Easy",
    duration: "30 min",
    rating: 4.9,
    icon: Volume2,
    iconColor: "text-green-600",
    bgColor: "bg-green-50",
    description:
      "A crucial lesson focusing on safe and effective reporting procedures. Students learn who to report to, how to document incidents (e.g., cyberbullying evidence), and the importance of confidentiality. This lesson empowers students to take action without putting themselves at risk.",
  },
  {
    id: 5,
    type: "Game",
    category: "Digital Safety",
    title: "Cyber Shield Strategy Game",
    difficulty: "Medium",
    duration: "20 min",
    rating: 4.3,
    icon: Shield,
    iconColor: "text-indigo-600",
    bgColor: "bg-indigo-50",
    description:
      "An engaging strategy game where students manage their digital footprint and respond to various online harassment scenarios. It emphasizes privacy settings, blocking tools, and recognizing phishing or baiting attempts commonly used in cyberbullying.",
  },
  {
    id: 6,
    type: "Assessment",
    category: "Group Dynamics",
    title: "Peer Relations Health Check",
    difficulty: "Medium",
    duration: "10 min",
    rating: 4.2,
    icon: Users,
    iconColor: "text-teal-600",
    bgColor: "bg-teal-50",
    description:
      "A short, anonymous survey designed to monitor the general health of classroom peer relationships. It looks for indicators of social isolation, exclusionary behavior, and general student well-being before specific incidents arises.",
  },
];

const ResourceListRow: FC<{ resource: (typeof mockResources)[0] }> = ({
  resource,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ToggleIcon = isExpanded ? ChevronUp : ChevronDown;
  const Icon = resource.icon;
  const isFavorite = resource.id === 1;

  // No need for topRadius, bottomRadius, borderClasses, isFirst, isLast

  return (
    <div
      className={`rounded-xl border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl ${isExpanded ? "shadow-none" : ""}`}
    >
      <div
        className={`flex items-center justify-between space-x-6 rounded-xl bg-white p-5 transition duration-300 ${isExpanded ? "rounded-b-none" : ""} hover:bg-gray-50`}
      >
        {/* Icon and Title Block*/}
        <div className="flex min-w-0 flex-1 items-center space-x-4">
          {isFavorite ? (
            <Heart className="h-6 w-6 flex-shrink-0 fill-red-500 text-red-500" />
          ) : (
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-lg ${resource.bgColor} flex-shrink-0 shadow-inner`}
            >
              <Icon
                className={`h-6 w-6 ${resource.iconColor}`}
                strokeWidth={2}
              />
            </div>
          )}

          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-gray-900">
              {resource.title}
            </h3>
            <p className="text-xs font-medium text-gray-500 uppercase">
              {resource.category} • {resource.type}
            </p>
          </div>
        </div>

        {/* Details Block */}
        <div className="flex hidden flex-shrink-0 items-center space-x-6 text-sm text-gray-600 md:flex">
          <span className="flex items-center">
            <Clock className="mr-1.5 h-4 w-4 text-gray-400" />
            {resource.duration}
          </span>
          {/* Difficulty Badge */}
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
              resource.difficulty === "Easy"
                ? "bg-green-100 text-green-700"
                : resource.difficulty === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
            }`}
          >
            {resource.difficulty}
          </span>
          {/* Rating */}
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
            {resource.rating.toFixed(1)}
          </div>
        </div>

        {/* Actions Block */}
        <div className="flex flex-shrink-0 space-x-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition duration-150 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300"
          >
            <ToggleIcon className="mr-1.5 h-4 w-4" />
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>

      {/* Expansion Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
      >
        <div
          className={`rounded-b-xl border-x border-b border-gray-200 bg-gray-50 p-6`}
        >
          <h4 className="mb-3 text-base font-bold text-gray-800">
            Resource Details:
          </h4>
          <p className="text-sm leading-relaxed text-gray-700">
            {resource.description}
          </p>
          <div className="mt-4 flex justify-end border-t border-gray-200 pt-3"></div>
        </div>
      </div>
    </div>
  );
};

//MAIN PAGE COMPONENT

const CurriculumLibraryPage: FC = () => {
  const SearchInput = (
    <input
      type="text"
      placeholder="Search curriculum by title, type, or category..."
      className="w-full rounded-xl border border-gray-300 py-3 pr-4 pl-10 text-lg transition focus:border-blue-500 focus:ring-blue-500"
    />
  );

  return (
    <DashboardTeacher>
      <div className="min-h-screen bg-[#f3f4f6] py-10">
        <div className="mx-auto max-w-7xl space-y-10 px-6 lg:px-12">
          {/* Header */}
          <header className="border-b border-gray-200 pb-8">
            <h1 className="flex items-center text-4xl font-bold text-gray-800">
              <BookOpen
                className="mr-4 h-8 w-8 text-orange-600"
                strokeWidth={2.5}
              />
              Curriculum Library
            </h1>
            <p className="mt-2 text-lg text-gray-500">
              Browse and assign educational resources for the anti-bullying
              module.
            </p>
          </header>

          <div className="pt-4">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Available Resources ({mockResources.length})
            </h2>
            <div className="space-y-6">
              {mockResources.map((resource) => (
                <ResourceListRow key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardTeacher>
  );
};

export default CurriculumLibraryPage;
