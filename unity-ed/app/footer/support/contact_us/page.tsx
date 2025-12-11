"use client";

import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-[#f5f8ff]">
      <main className="w-full max-w-6xl mx-auto px-4 lg:px-0 py-12">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Page Heading */}
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold text-[#141b2f]">Contact Us</h1>
            <p className="text-lg text-slate-600">
              We&apos;d love to hear from you. Get in touch with our team.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Email Card */}
            <Card className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#141b2f]">Email</h3>
                  <a
                    href="mailto:support@unityed.com"
                    className="text-[#2563EB] text-sm hover:underline"
                  >
                    support@unityed.com
                  </a>
                </div>
              </div>
            </Card>

            {/* Phone Card */}
            <Card className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#141b2f]">Phone</h3>
                  <p className="text-sm text-slate-600">+1 (555) 123-4567</p>
                </div>
              </div>
            </Card>

            {/* Office Address */}
            <Card className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm md:col-span-2">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#141b2f]">Office</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    123 Education Street
                    <br />
                    San Francisco, CA 94102
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
