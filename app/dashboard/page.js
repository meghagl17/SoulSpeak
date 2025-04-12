"use client"

import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import TextField from '@mui/material/TextField'
import { Checkbox, FormControlLabel, IconButton } from '@mui/material'
import { Settings } from '@mui/icons-material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [value, setValue] = useState(dayjs())
  const [tasks, setTasks] = useState([
    { id: 1, label: 'Task 1', checked: false },
    { id: 2, label: 'Task 2', checked: false },
    { id: 3, label: 'Task 3', checked: false },
    { id: 4, label: 'Task 4', checked: false },
  ]);

  const router = useRouter()

  const handleCheckboxChange = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const handleDateChange = (newValue) => {
    setValue(newValue)
    const formatted = newValue.format('YYYY-MM-DD');
    router.push(`/day?date=${formatted}`);
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold">Hello, User</h1>
        <IconButton onClick={() => router.push('/settings')}>
          <Settings fontSize="large" />
        </IconButton>
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          value={value}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
          hideToolbar
          displayStaticWrapperAs="desktop"
          disableCloseOnSelect
        />
      </LocalizationProvider>

      <div className="mt-8 flex gap-6">
        <div className="w-1/2 bg-white rounded-xl shadow-md p-4">
            <h3 className="text-lg font-semibold mb-4">Today's Tasks</h3>
            {tasks.map((task) => (
            <FormControlLabel
                key={task.id}
                control={
                <Checkbox
                    checked={task.checked}
                    onChange={() => handleCheckboxChange(task.id)}
                />
                }
                label={task.label}
            />
            ))}
        </div>

        <div className="flex flex-col gap-4 w-1/2">
          <div className="bg-white rounded-xl shadow-md p-6 text-center h-32 flex items-center justify-center">
            <span className="text-gray-700">Box 1 Placeholder</span>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center h-32 flex items-center justify-center">
            <span className="text-gray-700">Box 2 Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  )
}
