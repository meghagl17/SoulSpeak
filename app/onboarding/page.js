"use client"

import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material"

export default function Onboarding() {
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
    
  const handleNext = () => {
    router.push("/dashboard")
  }  

  const hourOptions = Array.from({ length: 12 }, (_, i) => i + 1)
  const minuteOptions = ["00", "15", "30", "45"]

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 space-y-4 bg-gray-100">
      <h1 className="text-2xl font-semibold">Onboarding</h1>
      <p className="text-sm text-center mb-4">Welcome to the onboarding page!</p>

      <Input placeholder="name" name="name" onChange={handleChange} />
      <Input placeholder="Phone" name="phone" onChange={handleChange} />

      <div className="w-full">
        <p className="font-medium mt-4 mb-2">Select AM Time</p>
        <div className="flex gap-4">
          <FormControl fullWidth>
            <InputLabel>Hour</InputLabel>
            <Select
              value={amTime.hour}
              label="Hour"
              onChange={(e) => setAmTime((prev) => ({ ...prev, hour: e.target.value }))}
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
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  )
}
