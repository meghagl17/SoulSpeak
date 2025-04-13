"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

const GoogleLogin = () => {
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
      window.location.href = "http://localhost:8000/auth/google";
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to login with Google. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-800">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <button 
        className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
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
    </div>
  );
};

export default GoogleLogin;