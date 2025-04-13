"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

export default function GoogleLogin() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
}

function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if we have userId in URL (from backend callback)
    const userId = searchParams.get("userId");
    if (userId) {
      // Store userId in localStorage
      localStorage.setItem("userId", userId);
      // Skip onboarding and redirect directly to dashboard
      router.push("/dashboard");
    }
  }, [searchParams, router]);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError("");
    try {
      window.location.href = "http://localhost:8000/auth/google/";
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to login with Google. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#F98500] to-[#EA7400] p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-4">Welcome to SoulSpeak!</h1>
        <p className="text-white text-lg">Please login to continue</p>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Email/Password Fields */}
      <div className="w-full max-w-md space-y-4 mb-6">
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#F98500] placeholder-slate-500"
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full px-4 py-3 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#F98500] placeholder-slate-500"
        />
      </div>

      {/* OR Separator */}
      <div className="flex items-center mb-6">
        <hr className="w-full border-t-1 border-slate-300" />
        <span className="mx-3 text-white">OR</span>
        <hr className="w-full border-t-1 border-slate-300" />
      </div>

      {/* Google Login Button */}
      <button 
        className="flex items-center gap-3 px-6 py-3 bg-white text-[#F98500] font-semibold text-lg rounded-full shadow-md hover:bg-[#FBE2B0] hover:shadow-lg transition-all duration-300"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        <Image 
          className="w-6 h-6" 
          src="https://www.svgrepo.com/show/475656/google-color.svg" 
          loading="lazy" 
          alt="google logo" 
          width={500} 
          height={500}
        />
        <span>{isLoading ? "Loading..." : "Login with Google"}</span>
      </button>

      {/* Other Login Options (Email/Password)
      <div className="mt-6">
        <p className="text-white text-center text-sm">
          Don't have an account? <a href="/signup" className="text-[#FBE2B0] hover:text-white">Sign up</a>
        </p>
      </div> */}
    </div>
  );
}
