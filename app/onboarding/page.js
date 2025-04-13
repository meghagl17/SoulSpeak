"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect, Suspense } from "react"
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material"

export default function Onboarding() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingPage />
    </Suspense>
  );
}

function OnboardingPage() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  })

  const [amTime, setAmTime] = useState({ hour: "", minute: "" })
  const [pmTime, setPmTime] = useState({ hour: "", minute: "" })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const router = useRouter()
    
  const handleNext = async () => {
    try {
      setLoading(true)
      setError("")

      // Validate inputs
      if (!formData.name || !formData.phone || !amTime.hour || !amTime.minute || !pmTime.hour || !pmTime.minute) {
        setError("Please fill in all fields")
        return
      }

      // Format times
      const timeam = `${amTime.hour}:${amTime.minute}`
      const timepm = `${pmTime.hour}:${pmTime.minute}`

      const response = await fetch(`http://localhost:8000/api/users/${userId}/onboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          timeam: timeam,
          timepm: timepm
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to update user details')
      }

      // Store userId in localStorage before redirecting
      localStorage.setItem('userId', userId)
      
      // Redirect to dashboard on success
      router.push("/dashboard")
    } catch (err) {
      console.error('Error updating user details:', err)
      setError(err.message || 'Failed to update user details')
    } finally {
      setLoading(false)
    }
  }

  // Redirect if no userId is present
  useEffect(() => {
    if (!userId) {
      router.push('/login')
    }
  }, [userId, router])

  const hourOptions = Array.from({ length: 12 }, (_, i) => i + 1)
  const minuteOptions = ["00", "15", "30", "45"]

  if (!userId) {
    return null // Don't render anything while redirecting
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4 bg-gray-100">
      <h1 className="text-2xl font-semibold">Complete Your Profile</h1>
      <p className="text-sm text-center mb-4">Please provide your details to continue</p>

      {error && (
        <div className="w-full max-w-md p-3 text-red-500 bg-red-100 rounded">
          {error}
        </div>
      )}

      <div className="w-full max-w-md space-y-4">
        <Input 
          placeholder="Name" 
          name="name" 
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
        />
        <Input 
          placeholder="Phone" 
          name="phone" 
          value={formData.phone}
          onChange={handleChange}
          disabled={loading}
        />

        <div className="w-full">
          <p className="font-medium mt-4 mb-2">Select AM Time</p>
          <div className="flex gap-4">
            <FormControl fullWidth>
              <InputLabel>Hour</InputLabel>
              <Select
                value={amTime.hour}
                label="Hour"
                onChange={(e) => setAmTime((prev) => ({ ...prev, hour: e.target.value }))}
                disabled={loading}
              >
                {hourOptions.map((hour) => (
                  <MenuItem key={hour} value={hour}>
                    {hour}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Minute</InputLabel>
              <Select
                value={amTime.minute}
                label="Minute"
                onChange={(e) => setAmTime((prev) => ({ ...prev, minute: e.target.value }))}
                disabled={loading}
              >
                {minuteOptions.map((minute) => (
                  <MenuItem key={minute} value={minute}>
                    {minute}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="w-full">
          <p className="font-medium mt-4 mb-2">Select PM Time</p>
          <div className="flex gap-4">
            <FormControl fullWidth>
              <InputLabel>Hour</InputLabel>
              <Select
                value={pmTime.hour}
                label="Hour"
                onChange={(e) => setPmTime((prev) => ({ ...prev, hour: e.target.value }))}
                disabled={loading}
              >
                {hourOptions.map((hour) => (
                  <MenuItem key={hour} value={hour}>
                    {hour}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Minute</InputLabel>
              <Select
                value={pmTime.minute}
                label="Minute"
                onChange={(e) => setPmTime((prev) => ({ ...prev, minute: e.target.value }))}
                disabled={loading}
              >
                {minuteOptions.map((minute) => (
                  <MenuItem key={minute} value={minute}>
                    {minute}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="w-full flex justify-end mt-6">
          <Button 
            onClick={handleNext} 
            disabled={loading}
          >
            {loading ? "Saving..." : "Next"}
          </Button>
        </div>
      </div>
    </div>
  )
}
