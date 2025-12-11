"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  FileText,
  Video,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

export default function StudentResources() {
  return (
    <div className="min-h-screen bg-[#f5f8ff]">
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 lg:px-0 py-10">
        {/* Header + Back button */}
        <div className="mb-8">
          <Link
            href="/dashboard/student"
            className="inline-flex items-center gap-2 mb-4 rounded-lg border-2 border-[#141b2f] bg-transparent px-4 py-2 text-sm font-semibold text-[#141b2f] hover:bg-[#141b2f] hover:text-white transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <h1 className="text-3xl font-bold mb-2 text-[#141b2f]">
            Learning Resources
          </h1>
          <p className="text-gray-800 font-medium">
            Instructions and curriculum materials
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="instructions" className="w-full">
          <TabsList className="inline-flex p-1 rounded-lg border border-slate-400 bg-white shadow-sm gap-1">
            <TabsTrigger
              value="instructions"
              className="
                px-4 py-1.5 rounded-md text-sm font-semibold
                text-[#141b2f]
                data-[state=active]:bg-slate-200
                data-[state=active]:border
                data-[state=active]:border-[#141b2f]
                data-[state=active]:text-[#141b2f]
              "
            >
              Instructions
            </TabsTrigger>

            <TabsTrigger
              value="curriculum"
              className="
                px-4 py-1.5 rounded-md text-sm font-semibold
                text-[#141b2f]
                data-[state=active]:bg-slate-200
                data-[state=active]:border
                data-[state=active]:border-[#141b2f]
                data-[state=active]:text-[#141b2f]
              "
            >
              Curriculum
            </TabsTrigger>
          </TabsList>

          {/* Instructions tab */}
          <TabsContent value="instructions" className="mt-6">
            <div className="grid gap-6">
              <Card className="rounded-2xl border border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#141b2f]">
                    <BookOpen className="h-5 w-5" />
                    How to Play the Game
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <InstructionItem
                    title="Getting Started"
                    text="Log in with your student code and start your adventure. Each student has a unique journey through the UnityEd world."
                  />
                  <InstructionItem
                    title="Navigation"
                    text="Use arrow keys to move your character. Press SPACE to interact with objects and NPCs. Press ESC to access the menu."
                  />
                  <InstructionItem
                    title="Missions & Challenges"
                    text="Complete missions to earn badges and progress through levels. Each mission teaches important concepts aligned with your curriculum."
                  />
                  <InstructionItem
                    title="Collaboration"
                    text="Work together with classmates on team challenges. Communication and cooperation are key to success!"
                  />
                </CardContent>
              </Card>

              <Card className="rounded-2xl border border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#141b2f]">
                    <Video className="h-5 w-5" />
                    Video Tutorials
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center">
                      <p className="text-sm text-slate-600">
                        Tutorial 1: Basic Controls
                      </p>
                    </div>
                    <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center">
                      <p className="text-sm text-slate-600">
                        Tutorial 2: Solving Puzzles
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Curriculum tab */}
          <TabsContent value="curriculum" className="mt-6">
            <div className="grid gap-6">
              <CurriculumCard
                title="Chapter 1: Introduction to Unity"
                lessons={[
                  {
                    title: "Lesson 1.1: Working Together",
                    text: "Learn the importance of teamwork and communication",
                  },
                  {
                    title: "Lesson 1.2: Understanding Differences",
                    text: "Explore diversity and inclusion concepts",
                  },
                  {
                    title: "Lesson 1.3: Building Bridges",
                    text: "Problem-solving through collaboration",
                  },
                ]}
              />

              <CurriculumCard
                title="Chapter 2: Communication Skills"
                lessons={[
                  {
                    title: "Lesson 2.1: Active Listening",
                    text: "Develop effective listening strategies",
                  },
                  {
                    title: "Lesson 2.2: Clear Expression",
                    text: "Express ideas clearly and respectfully",
                  },
                ]}
              />

              <Card className="rounded-2xl border border-slate-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#141b2f]">
                    <FileText className="h-5 w-5" />
                    Chapter 3: The Great Discovery (Current)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 border border-blue-300 rounded-lg">
                      <h4 className="font-semibold text-sm mb-1 text-[#141b2f]">
                        Lesson 3.1: Problem Analysis
                      </h4>
                      <p className="text-xs text-slate-700">
                        Break down complex problems into manageable parts
                      </p>
                    </div>
                    <div className="p-3 bg-slate-100 rounded-lg opacity-70">
                      <h4 className="font-semibold text-sm mb-1 text-slate-700">
                        Lesson 3.2: Creative Solutions
                      </h4>
                      <p className="text-xs text-slate-600">
                        🔒 Complete Lesson 3.1 to unlock
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

/* Helper components */

function InstructionItem({ title, text }: { title: string; text: string }) {
  return (
    <div className="flex gap-3">
      <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5 shrink-0" />
      <div>
        <h4 className="font-semibold mb-1 text-[#141b2f]">{title}</h4>
        <p className="text-sm text-slate-700">{text}</p>
      </div>
    </div>
  );
}

function CurriculumCard({
  title,
  lessons,
}: {
  title: string;
  lessons: { title: string; text: string }[];
}) {
  return (
    <Card className="rounded-2xl border border-slate-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#141b2f]">
          <FileText className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <div key={lesson.title} className="p-3 bg-slate-100 rounded-lg">
              <h4 className="font-semibold text-sm mb-1 text-[#141b2f]">
                {lesson.title}
              </h4>
              <p className="text-xs text-slate-700">{lesson.text}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
