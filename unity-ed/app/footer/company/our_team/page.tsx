import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const team = [
  { name: "Sarah Johnson", role: "CEO & Co-Founder", initials: "SJ" },
  { name: "Michael Chen", role: "CTO & Co-Founder", initials: "MC" },
  { name: "Emily Rodriguez", role: "Head of Product", initials: "ER" },
  { name: "David Kim", role: "Lead Game Designer", initials: "DK" },
  { name: "Lisa Thompson", role: "Head of Education", initials: "LT" },
  { name: "James Wilson", role: "Lead Engineer", initials: "JW" },
];

export default function OurTeamPage() {
  return (
    <div className="min-h-screen bg-[#f5f8ff]">
      <main className="w-full max-w-6xl mx-auto px-4 lg:px-0 py-10">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Heading */}
          <section className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-[#141b2f]">Our Team</h1>
            <p className="text-lg text-slate-600">
              Meet the passionate people behind UnityEd
            </p>
          </section>

          {/* Team grid */}
          <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <Card
                key={member.name}
                className="p-6 text-center space-y-4 rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                <Avatar className="mx-auto h-24 w-24">
                  <AvatarFallback className="h-full w-full flex items-center justify-center text-2xl font-semibold bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg text-[#141b2f]">
                    {member.name}
                  </h3>
                  <p className="text-sm text-slate-600">{member.role}</p>
                </div>
              </Card>
            ))}
          </section>

          {/* Join our team */}
          <section className="text-center space-y-3 pt-4">
            <h2 className="text-2xl font-bold text-[#141b2f]">Join Our Team</h2>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
              We&apos;re always looking for talented individuals who share our
              passion for education and innovation.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
