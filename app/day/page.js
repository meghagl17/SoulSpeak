'use client';

import React, { useEffect, useState } from 'react';
import { Suspense } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Collapse,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import MoodComponent from '../components/mood';

export default function DayViewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DayView />
    </Suspense>
  );
}

function DayView() {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const todayFormatted = dayjs(date).format('MMMM D, YYYY');

  const completedTasks = ['task 1', 'task 2', 'task 3'];
  const todoTasks = ['task 4', 'task 5'];

  const [completedOpen, setCompletedOpen] = useState(false);
  const [todoOpen, setTodoOpen] = useState(false);
  // const [moodOpen, setMoodOpen] = useState(false);

  const handleBack = () => {
    window.history.back();
  };

  useEffect(() => {
    setMood({
      happy: 75,
      sad: 40,
      angry: 20,
      calm: 90,
    });
  }, []);

  const [mood, setMood] = useState({
    happy: 0,
    sad: 0,
    angry: 0,
    calm: 0,
  });

  return (
    <Box className="p-6 min-h-screen bg-gray-50">
      <div className="flex items-center mb-6 gap-2">
        <IconButton onClick={handleBack}>
          <ArrowBackIosIcon />
        </IconButton>
        <Box className="p-4 rounded-xl bg-white shadow-md flex-1">
          <Typography variant="h5" fontWeight="bold" className="londrina">
            {todayFormatted}
          </Typography>
        </Box>
      </div>

      <div className="mb-6 mr-6 flex">
        <div className="mr-2 w-1/2">
          <Paper
            elevation={3}
            className="p-4 h-64 rounded-xl flex flex-col"
            style={{ backgroundColor: '#F99A00' }}>
            <Typography
              variant="h6"
              className="font-semibold text-white"
              style={{ borderBottom: '2px solid white', marginBottom: '8px'}}>
              Morning
            </Typography>
            <Typography variant="body2" className="text-gray-600 annie text-white">
              My day was good, i worked on the project for cruzhacks. Went to the dining hall.
            </Typography>
          </Paper>
        </div>
        <div className="w-1/2">
          <Paper
            elevation={3}
            className="p-4 h-64 rounded-xl flex flex-col"
            style={{ backgroundColor: '#3BDBE3' }}>
            <Typography
              variant="h6"
              className="font-semibold text-white"
              style={{ borderBottom: '2px solid white', marginBottom: '8px' }}>
              Night
            </Typography>
            <Typography variant="body2" className="text-gray-600 annie">
              My day was good, i worked on the project for cruzhacks. Went to the dining hall.
            </Typography>
          </Paper>
        </div>
      </div>

      {/* Completed tasks dropdown */}
      <Box className="mb-4">
        <Typography variant="h6" className="mb-2 font-semibold flex items-center">
          <Paper
            className="p-2 rounded-md w-full flex justify-between londrina"
            onClick={() => setCompletedOpen(!completedOpen)}
          >
            Completed Tasks
            <IconButton size="small" className="ml-2">
              {completedOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </IconButton>
          </Paper>
        </Typography>
        <Collapse in={completedOpen}>
          {completedTasks.map((task, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox checked disabled />}
              label={<span className="loved">{task}</span>}
            />
          ))}
        </Collapse>
      </Box>

      {/* To-Do tasks dropdown */}
      <Box className="mb-4">
        <Typography variant="h6" className="mb-2 font-semibold flex items-center">
          <Paper
            className="p-2 rounded-md w-full flex justify-between londrina"
            onClick={() => setTodoOpen(!todoOpen)}
          >
            Incomplete Tasks
            <IconButton size="small" className="ml-2">
              {todoOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </IconButton>
          </Paper>
        </Typography>
        <Collapse in={todoOpen}>
          {todoTasks.map((task, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox disabled />}
              label={<span className="loved">{task}</span>}
            />
          ))}
        </Collapse>
      </Box>

      {/* <Box>
        <Typography variant="h6" className="mb-2 font-semibold flex items-center">
          <Paper
            className="p-2 rounded-md w-full flex justify-between"
            onClick={() => setMoodOpen(!moodOpen)}
          >
            Mood
            <IconButton size="small" className="ml-2">
              {moodOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </IconButton>
          </Paper>
        </Typography>
        <Collapse in={moodOpen}>
            <MoodComponent mood={mood} className = "mt-10"/>
        </Collapse>
      </Box> */}
      <MoodComponent mood={mood} className = "mt-10"/>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Annie+Use+Your+Telescope&display=swap');
      
        .annie {
          font-family: 'Annie Use Your Telescope', cursive;
          font-size: 1rem;
          text-color: white;
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

<style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Londrina+Solid&display=swap');
  
    .londrina {
      font-family: 'Londrina Solid', cursive;
      color: #1D5C5F;
      font-size: 1.5rem;
    }
  `}</style>
  
    </Box>
  );
}
