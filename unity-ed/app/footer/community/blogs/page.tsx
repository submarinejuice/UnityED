"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const posts = [
  {
    title: "The Future of Gamified Learning",
    excerpt:
      "Exploring how game mechanics are revolutionizing education and student engagement.",
    date: "March 15, 2024",
    category: "Education",
    slug: "future-of-gamified-learning",
  },
  {
    title: "5 Ways Teachers Can Use Analytics",
    excerpt:
      "Practical tips for leveraging real-time analytics to improve student outcomes.",
    date: "March 10, 2024",
    category: "Teaching",
    slug: "5-ways-teachers-can-use-analytics",
  },
  {
    title: "Student Success Story: Emily's Journey",
    excerpt:
      "How one student improved their grades by 40% using UnityEd's interactive platform.",
    date: "March 5, 2024",
    category: "Success Stories",
    slug: "student-success-story-emilys-journey",
  },
  {
    title: "Making Math Fun Through Games",
    excerpt:
      "Innovative approaches to teaching mathematics using game-based learning.",
    date: "February 28, 2024",
    category: "Education",
    slug: "making-math-fun-through-games",
  },
];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-[#f5f8ff]">
      {/* Match dashboard container width + padding */}
      <main className="w-full max-w-6xl mx-auto px-4 lg:px-0 py-10">
        {/* Page heading */}
        <section className="text-center space-y-3 mb-10">
          <h1 className="text-4xl font-bold text-[#141b2f]">UnityEd Blog</h1>
          <p className="text-base text-slate-600">
            Insights, stories, and tips from the world of educational technology
          </p>
        </section>

        {/* Blog cards */}
        <section className="space-y-6">
          {posts.map((post) => (
            <Card
              key={post.slug}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow p-6 space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-slate-500">{post.date}</span>
                  <span className="text-slate-400">•</span>
                  <span className="font-medium text-[#2563EB]">
                    {post.category}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-[#141b2f]">
                  {post.title}
                </h2>
                <p className="text-slate-600">{post.excerpt}</p>
              </div>

              <Button
                variant="outline"
                asChild
                className="
                  mt-2 border-slate-300 
                  text-[#2563EB] 
                  bg-white 
                  hover:bg-white 
                  hover:text-black 
                  hover:border-black 
                  transition-colors
                "
              >
                <Link href={`/footer/community/blogposts/${post.slug}`}>
                  Read More
                </Link>
              </Button>
            </Card>
          ))}
        </section>
      </main>
    </div>
  );
}
