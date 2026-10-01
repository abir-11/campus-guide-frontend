'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, GraduationCap, Briefcase, ShieldCheck } from "lucide-react";
import { loginUserAction } from "../_actions/auth";

const roleConfig = {
  student: { icon: GraduationCap, label: "Student", desc: "Access dashboard & career tools", dest: "/dashboard" },
  mentor: { icon: Briefcase, label: "Mentor", desc: "Manage sessions & services", dest: "/mentor/dashboard" },
  admin: { icon: ShieldCheck, label: "Admin", desc: "Full platform control", dest: "/admin/dashboard" },
} as const;

export function LoginForm() {
  const [selectedRole, setSelectedRole] = useState<"student" | "mentor" | "admin">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      
      const res = await loginUserAction({ email, password });

      if (!res.success) {
        setError(res.message);
        return;
      }

      const cfg = roleConfig[selectedRole];
      router.push(cfg.dest);
    } catch (err: any) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-[#1F2937] font-display mb-1">Welcome back</h1>
      <p className="text-[#6B7280] text-sm mb-8">Sign in to your UIU Campus Guide account</p>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {(Object.entries(roleConfig) as [keyof typeof roleConfig, typeof roleConfig[keyof typeof roleConfig]][]).map(([key, cfg]) => {
          const Icon = cfg.icon;
          const active = selectedRole === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => { setSelectedRole(key); setError(""); }}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
                active ? "border-[#F97316] bg-orange-50" : "border-[#E5E7EB] hover:border-orange-200"
              }`}
            >
              <Icon size={20} className={active ? "text-[#F97316]" : "text-[#9CA3AF]"} />
              <span className={`text-xs font-bold ${active ? "text-[#F97316]" : "text-[#6B7280]"}`}>{cfg.label}</span>
              <span className="text-[10px] text-[#9CA3AF] text-center leading-tight hidden sm:block">{cfg.desc}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-[#374151] mb-1.5">Email address*</label>
          <input
            type="email"
            placeholder="you@gmail.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm text-[#1F2937] bg-white focus:outline-none focus:ring-2 focus:ring-[#F97316]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#374151] mb-1.5">Password*</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 pr-10 text-sm text-[#1F2937] bg-white focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#F97316] text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          {loading ? "Signing in..." : `Sign in as ${roleConfig[selectedRole].label}`}
        </button>

        <p className="text-center text-sm text-[#6B7280]">
          Don't have an account?{" "}
          <Link href="/register" className="text-[#F97316] font-semibold">Create account</Link>
        </p>
      </form>
    </>
  );
}