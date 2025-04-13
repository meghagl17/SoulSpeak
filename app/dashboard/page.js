"use client"

import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import TextField from '@mui/material/TextField'
import { Checkbox, FormControlLabel, IconButton, createTheme, ThemeProvider, Typography } from '@mui/material'
import { Settings } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MoodComponent from '../components/mood';

export default function Dashboard() {
  const [value, setValue] = useState(dayjs())
  const [tasks, setTasks] = useState([])
  const [mood, setMood] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
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

  useEffect(() => {
    // Simple authentication check
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/login');
      return;
    }

    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        const currentDate = dayjs().format('YYYY-MM-DD');

        const tasksResponse = await fetch(`http://localhost:8000/api/tasks?userId=${userId}&date=${currentDate}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        const moodResponse = await fetch(`http://localhost:8000/api/mood?userId=${userId}&date=${currentDate}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!tasksResponse.ok || !moodResponse.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const tasksData = await tasksResponse.json();
        const moodData = await moodResponse.json();

        setTasks(tasksData);
        setMood(moodData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const theme = createTheme({
    typography: {
      fontFamily: '"Loved by the King", cursive',
    },
    components: {
      MuiPickersDay: {
        styleOverrides: {
          root: {
            fontSize: '1.2rem',
            '&.Mui-selected': {
              backgroundColor: '#F99A00',
              color: 'white',
              '&:hover': {
                backgroundColor: '#ff9800',
              },
            },
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md mb-6">
      <Typography variant="h5" className="londrina">
        Hello, User
      </Typography>
        <IconButton onClick={() => router.push('/settings')}>
          <Settings fontSize="large" />
        </IconButton>
      </div>

      <div className="shadow-lg rounded-xl drop-shadow-[0_3px_2px_#F99A00]">
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
      </div>

      <div className="mt-8 flex gap-6">
        <div className="w-1/2 bg-[#3BDBE3] rounded-xl shadow-md p-4">
            <h3 className="text-lg font-semibold">Today's Tasks</h3>
            <div className="h-0.5 bg-white w-full mb-4"></div>
            {tasks.map((task) => (
            <FormControlLabel
                key={task.id}
                control={
                <Checkbox
                    checked={task.completed}
                    onChange={() => handleCheckboxChange(task.id)}
                />
                }
                label={task.description}
            />
            ))}
        </div>

        <div className="flex flex-col gap-4 w-1/2">
      {/* <div className="bg-white rounded-xl shadow-md p-4 text-center h-auto flex flex-col items-center justify-center">
        <h3 className="text-lg font-semibold text-">Mood</h3>

      </div> */}
      <MoodComponent mood={mood} />

      <div className="bg-white rounded-xl shadow-md p-1 text-center h-32 flex items-center justify-center">
        <div className="bg-[#F99A00] rounded-xl shadow-md p-2 text-center flex items-center justify-center loved">
          <span className="text-white">you got this! Good luck!</span>
        </div>
      </div>
    </div>
      </div>
    </div>


    <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Londrina+Solid&display=swap');
  
    .londrina {
      font-family: 'Londrina Solid', cursive;
      color: #F99A00;
      font-size: 2.5rem;
    }
  `}</style>

  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Loved+by+the+King&display=swap');
  
    .loved {
      font-family: 'Loved by the King', cursive;
      color: #F99A00;
      font-size: 1.5rem;
    }
  `}</style>

    <style jsx>{`
        progress::-webkit-progress-bar {
          background-color: #e0e0e0;
          border-radius: 999px;
        }

        progress::-webkit-progress-value {
          background-color: #3BDBE3;
          border-radius: 999px;
        }
    `}</style>
    </ThemeProvider>
  )
}
