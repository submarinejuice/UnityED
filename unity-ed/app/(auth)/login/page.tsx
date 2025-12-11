"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { PrismaClient, UserRole } from "@prisma/client";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>(UserRole.TEACHER);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      role,
    });

    setIsLoading(false);

    if (res?.ok) {
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json();
      const userRole = session?.user?.role?.toUpperCase();

      if (userRole === "ADMIN") router.push("/dashboard/admin");
      else if (userRole === "TEACHER") router.push("/dashboard/teacher");
      else router.push("/dashboard/student");
    } else {
      toast.error(res?.error || "Invalid credentials or role");
      // setError(res?.error || "Invalid credentials or role");
    }
  };

  return (
    <div className="min-h-screen flex">
      <ToastContainer />
      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#143E73] to-[#316CF4] p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFCE34] rounded-full opacity-10 -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FFCE34] rounded-full opacity-10 -ml-48 -mb-48" />

        <div className="relative z-10">
          <h1 className="text-white text-4xl font-bold mb-2">UnityED</h1>
          <p className="text-blue-100">Empowering Learning Through Play</p>
          <div className="relative m-5 w-full h-65 md:h-96 rounded-2xl overflow-hidden">
            <Image
              src="/images/gameplay.png"
              alt="Educational Gameplay"
              fill
              className="object-fit"
            />
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-white text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-blue-100 text-lg mb-8">
            Sign in to access your personalized learning dashboard and continue
            your educational journey.
          </p>
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex-1">
              <p className="text-[#FFCE34] font-semibold text-2xl">1000+</p>
              <p className="text-blue-100 text-sm">Active Students</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex-1">
              <p className="text-[#FFCE34] font-semibold text-2xl">50+</p>
              <p className="text-blue-100 text-sm">Schools</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL (FORM) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-block lg:hidden mb-4">
              <h1 className="text-[#143E73] text-3xl font-bold">UnityED</h1>
            </div>
            <h2 className="text-3xl font-bold text-[#143E73] mb-2">Sign In</h2>
            <p className="text-gray-600">
              Choose your role and sign in to continue
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ROLE TOGGLE */}
            <div>
              <label className="block text-sm font-medium text-[#143E73] mb-2">
                Select Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["TEACHER", "STUDENT", "ADMIN"].map((roleOption) => (
                  <button
                    key={roleOption}
                    type="button"
                    onClick={() => setRole(roleOption)}
                    className={`py-2 px-4 rounded-lg font-medium text-sm transition-all ${
                      role === roleOption
                        ? "bg-[#316CF4] text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-300 hover:border-[#316CF4]"
                    }`}
                  >
                    {roleOption}
                  </button>
                ))}
              </div>
            </div>

            {/* EMAIL / CODE */}
            <div>
              <label className="block text-sm font-medium text-[#143E73] mb-2">
                {role === UserRole.STUDENT ? "Code" : "Email Address"}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={role === UserRole.STUDENT ? "text" : "email"}
                  placeholder={
                    role === UserRole.STUDENT
                      ? "Enter your code"
                      : "Enter your email"
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#316CF4] focus:border-transparent outline-none transition"
                  required
                />
              </div>
            </div>

            {/* PASSWORD (not for student) */}
            {role !== UserRole.STUDENT && (
              <div>
                <label className="block text-sm font-medium text-[#143E73] mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#316CF4] focus:border-transparent outline-none transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* REMEMBER + FORGOT */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#316CF4] border-gray-300 rounded focus:ring-[#316CF4]"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-[#316CF4] hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#316CF4] text-white py-3 rounded-lg font-semibold hover:bg-[#2554C7] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* REGISTER LINK – only for TEACHER */}
          {role === UserRole.TEACHER && (
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-[#316CF4] font-semibold hover:underline"
                >
                  Register here
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
