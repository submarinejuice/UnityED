import { Card } from "@/components/ui/card";
import { GraduationCap, Target, Heart } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#f5f8ff]">
      <main className="w-full max-w-6xl mx-auto px-4 lg:px-0 py-10">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Heading */}
          <section className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-[#141b2f]">About UnityEd</h1>
            <p className="text-lg text-slate-600">
              Transforming education through interactive gameplay and innovative
              learning experiences
            </p>
          </section>

          {/* Mission / Vision / Values */}
          <section className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center space-y-4 rounded-2xl border border-slate-200 shadow-sm bg-white">
              <div className="mx-auto w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-[#141b2f]">Our Mission</h3>
              <p className="text-sm text-slate-600">
                To make learning engaging and accessible through gamified
                educational experiences.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 rounded-2xl border border-slate-200 shadow-sm bg-white">
              <div className="mx-auto w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-[#141b2f]">Our Vision</h3>
              <p className="text-sm text-slate-600">
                A world where every student discovers the joy of learning through
                interactive play.
              </p>
            </Card>

            <Card className="p-6 text-center space-y-4 rounded-2xl border border-slate-200 shadow-sm bg-white">
              <div className="mx-auto w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg text-[#141b2f]">Our Values</h3>
              <p className="text-sm text-slate-600">
                Innovation, inclusivity, and excellence in educational technology.
              </p>
            </Card>
          </section>

          {/* Story */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#141b2f]">Our Story</h2>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              UnityEd was founded with a simple belief: learning should be fun,
              engaging, and accessible to everyone. We combine cutting-edge
              educational research with game design principles to create
              experiences that students love and teachers trust.
            </p>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">
              Our platform serves students and educators worldwide, helping them
              achieve better learning outcomes through interactive gameplay,
              real-time analytics, and personalized learning paths.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
