"use client"

import { useRouter } from "next/navigation"
import { ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WorkflowPage() {
    const router = useRouter()
    
    const handleNext = () => {
        router.push("/onboarding")
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-8">App Workflow</h1>

      <div className="flex flex-col items-center space-y-6 mb-10">
        <Box content="Step 1: User signs up and creates profile" />
        <ArrowDown className="text-gray-500" />
        <Box content="Step 2: User selects preferences and interests" />
        <ArrowDown className="text-gray-500" />
        <Box content="Step 3: Algorithm generates book recommendations" />
        <ArrowDown className="text-gray-500" />
        <Box content="Step 4: User joins discussions and engages with community" />
      </div>

      <Button onClick={handleNext}>
        Next
      </Button>
    </div>
  )
}

function Box({ content }) {
  return (
    <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md text-center">
      <p className="text-sm text-gray-700">{content}</p>
    </div>
  )
}
