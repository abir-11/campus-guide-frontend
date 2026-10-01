'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, Briefcase, CheckCircle } from "lucide-react";
import { registerUserAction } from "../_actions/auth";

export function RegisterForm() {
  const [role, setRole] = useState<"student" | "mentor">("student");
  const [done, setDone] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "OTHER">("MALE");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await registerUserAction({
        name: `${firstName} ${lastName}`.trim(),
        email,
        password,
        phoneNumber,
        departmentId: "35b3a094-b4c5-4c43-b4fd-3c152f98ec38",
        profilePhoto: "https://example.com/profile.jpg",
        gender,
      });

      if (!res.success) {
        setError(res.message);
        return;
      }

      setDone(true);
    } catch (err: any) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-[#1F2937] mb-2">Account Created!</h1>
        <p className="text-[#374151] text-sm mb-8">Welcome to UIU Campus Guide.</p>
        <button
          onClick={() => router.push(role === "student" ? "/dashboard" : "/mentor/dashboard")}
          className="w-full bg-[#F97316] text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
        >
          Go to My Dashboard
        </button>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-[#1F2937] font-display mb-1">Create your account</h1>
      <p className="text-[#6B7280] text-sm mb-8">Join UIU Campus Guide — free for all UIU students</p>

      <div className="flex gap-3 mb-6">
        {(["student", "mentor"] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRole(r)}
            className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
              role === r ? "border-[#F97316] bg-orange-50" : "border-[#E5E7EB] hover:border-orange-200"
            }`}
          >
            {r === "student" ? <GraduationCap size={22} className={role === r ? "text-[#F97316]" : "text-[#9CA3AF]"} /> : <Briefcase size={22} className={role === r ? "text-[#F97316]" : "text-[#9CA3AF]"} />}
            <span className={`text-sm font-bold ${role === r ? "text-[#F97316]" : "text-[#6B7280]"}`}>{r === "student" ? "Student" : "Mentor"}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm text-[#1F2937] bg-white focus:outline-none focus:ring-2 focus:ring-[#F97316]"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm text-[#1F2937] bg-white focus:outline-none focus:ring-2 focus:ring-[#F97316]"
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm text-[#1F2937] bg-white focus:outline-none focus:ring-2 focus:ring-[#F97316]"
          required
        />

        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm text-[#1F2937] bg-white focus:outline-none focus:ring-2 focus:ring-[#F97316]"
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm text-[#1F2937] bg-white focus:outline-none focus:ring-2 focus:ring-[#F97316]"
          required
        />

        <select
          value={gender}
          onChange={(e) => setGender(e.target.value as any)}
          className="w-full border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-sm text-[#1F2937] bg-white focus:outline-none focus:ring-2 focus:ring-[#F97316]"
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        {error && <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#F97316] text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p className="text-center text-sm text-[#6B7280]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#F97316] font-semibold">Sign in</Link>
        </p>
      </form>
    </>
  );
}