import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const careersEmail = "careers@unityed.com";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#f5f8ff]">
      <main className="w-full max-w-6xl mx-auto px-4 lg:px-0 py-10">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Heading */}
          <section className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-[#141b2f]">Join Our Team</h1>
            <p className="text-lg text-slate-600">
              Help us transform education through innovative technology
            </p>
          </section>

          {/* Main careers card */}
          <Card className="p-8 space-y-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#141b2f]">We&apos;re Hiring!</h2>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                At UnityEd, we&apos;re always looking for talented individuals who are passionate
                about education and technology. Whether you&apos;re a developer, designer, educator,
                or marketing professional, we&apos;d love to hear from you.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold text-[#141b2f]">How to Apply</h3>
              <p className="text-sm md:text-base text-slate-600">
                Interested in joining our team? Send your resume and a brief introduction to:
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <a
                  href={`mailto:${careersEmail}`}
                  className="text-[#2563EB] font-medium hover:underline flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  {careersEmail}
                </a>
                <Button asChild className="px-5">
                  <a href={`mailto:${careersEmail}`}>
                    Email Your Resume
                  </a>
                </Button>
              </div>
            </div>
          </Card>

          {/* Why UnityEd */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#141b2f]">Why UnityEd?</h2>
            <Card className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
              <ul className="space-y-3 text-sm md:text-base text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#2563EB] mt-1">•</span>
                  <span>Flexible remote work options</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2563EB] mt-1">•</span>
                  <span>Professional growth and learning opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2563EB] mt-1">•</span>
                  <span>Work on meaningful projects that impact education</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2563EB] mt-1">•</span>
                  <span>Collaborative and inclusive team culture</span>
                </li>
              </ul>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
