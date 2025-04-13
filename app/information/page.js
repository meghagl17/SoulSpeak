"use client"

import { useRouter } from "next/navigation"
import { ArrowDown } from "lucide-react"

export default function WorkflowPage() {
  const router = useRouter()

  const handleNext = () => {
    router.push("/onboarding")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-gradient-to-br from-[#38EDFA] to-[#1E9BA2]">
      <h1 className="text-4xl font-bold text-[#1D5C5F] mb-12 font-[Quicksand]">
        Welcome to Vocalogue!
      </h1>

      <div className="flex flex-col items-center space-y-6 mb-10">
        <StepBox content=" Sign up and create your profile" />
        <AnimatedArrow />
        <StepBox content="Select your preferred times to call" />
        <AnimatedArrow />
        <StepBox content="Get scheduled calls and journal with your AI buddy" />
        <AnimatedArrow />
        <StepBox content="View your day summary, mood trends, and more!" />
      </div>

      <button
        onClick={handleNext}
        className="mt-4 px-6 py-3 bg-[#1D5C5F] text-white rounded-full shadow-lg hover:bg-[#EA9408] transition-all duration-200 active:scale-95"
      >
        Next
      </button>
    </div>
  )
}

// Cute step card
const StepBox = ({ content }) => (
  <div className="bg-white p-4 rounded-2xl shadow-md w-72 text-center border border-pink-200">
    <p className="text-[#FF9900] font-medium">{content}</p>
  </div>
)

// Animated arrow
const AnimatedArrow = () => (
  <ArrowDown className="text-[#1D5C5F] animate-bounce" />
)
