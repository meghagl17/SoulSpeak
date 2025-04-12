"use client";
import React, { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

const GoogleLogin = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Check for user parameter from backend callback
  useEffect(() => {
    const user = searchParams.get("user");
    if (user) {
      // User has been authenticated via backend
      // You could store user info in localStorage or context
      localStorage.setItem("user", user);
      router.push("/"); // Redirect to home page
    }
  }, [searchParams, router]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      // Instead of using NextAuth's signIn, we'll redirect to our backend
      window.location.href = "http://localhost:8000/auth/google";
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to login with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle direct NextAuth login if needed
  const handleNextAuthGoogleLogin = () => {
    signIn("google", { callbackUrl: `/` });
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