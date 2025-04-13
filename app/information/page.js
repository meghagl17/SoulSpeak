"use client"

import { useRouter } from "next/navigation"
import { ArrowDown } from "lucide-react"
// import Link from "next/link"

export default function WorkflowPage() {
  const router = useRouter()

  const handleNext = () => {
    router.push("/onboarding")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-gradient-to-br from-[#E0FBFC] via-[#C2F0F2] to-[#A0E7EC]">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#164C4F] mb-12 font-[Quicksand] text-center">
        Welcome to <span className="text-[#F98500]">Vocalogue!</span>
      </h1>

      <div className="flex flex-col items-center space-y-8 mb-12 w-full max-w-md">
        <StepBox content="Sign up and create your profile" />
        <AnimatedArrow />
        <StepBox content="Select your preferred times to call" />
        <AnimatedArrow />
        <StepBox content="Get scheduled calls and journal with your AI buddy" />
        <AnimatedArrow />
        <StepBox content="View your day summary, mood trends, and more!" />
      </div>

      <button
        onClick={handleNext}
        className="mt-6 bg-[#F98500] hover:bg-[#e27b00] text-white font-semibold py-3 px-6 rounded-full shadow-lg transition"
      >
        Get Started
      </button>
    </div>
  )
}

// Components

function StepBox({ content }) {
  return (
    <div className="bg-white text-[#1D5C5F] px-6 py-4 rounded-2xl shadow-md w-full text-center text-base sm:text-lg font-medium">
      {content}
    </div>
  )
}

function AnimatedArrow() {
  return (
    <ArrowDown className="text-[#1D5C5F] animate-bounce" size={24} />
  )
}
