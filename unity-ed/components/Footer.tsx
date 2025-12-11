import Link from "next/link";
import {
  GraduationCap,
  Linkedin,
  Instagram,
  Youtube,
  FileText,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-5xl px-4 py-10">
        {/* Top grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <span className="text-base text-sky-700">UnityEd</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-600">
              Empowering education through interactive
              <br />
              gameplay and innovative learning.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-800">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/footer/company/about_us"
                  className="text-slate-600 hover:text-slate-900"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/footer/company/our_team"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/footer/company/careers"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-800">
              Community
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.linkedin.com/company/unityed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/unityed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
                >
                  <Instagram className="h-4 w-4" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@unityed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
                >
                  <Youtube className="h-4 w-4" />
                  YouTube
                </a>
              </li>
              <li>
                <Link
                  href="/footer/community/blogs"
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
                >
                  <FileText className="h-4 w-4" />
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-800">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/footer/support/contact_us"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/footer/support/faq"
                  className="text-slate-600 hover:text-slate-900"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + copyright */}
        <hr className="mt-10 border-slate-200" />
        <p className="pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} UnityEd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
