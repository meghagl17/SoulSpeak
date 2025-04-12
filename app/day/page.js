'use client';

import React from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  Grid,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';

export default function DayViewPage() {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  const todayFormatted = dayjs(date).format('MMMM D, YYYY');

  const completedTasks = ['task 1', 'task 2', 'task 3'];
  const todoTasks = ['task 4', 'task 5'];

  const handleBack = () => {
    window.history.back();
  };

  return (
    <Box className="p-6 min-h-screen bg-gray-50">
      <Box className="mb-6 p-4 rounded-xl bg-white shadow-md flex items-center">
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight="bold" className="ml-4">
          {todayFormatted}
        </Typography>
      </Box>

      <div className="mb-6 mr-6 flex">
        <div className="mr-2 w-1/2">
          <Paper elevation={3} className="p-4 h-64 rounded-xl flex flex-col">
            <Typography variant="h6" className="mb-2 font-semibold">Morning</Typography>
            <Typography variant="body2" className="text-gray-600">Placeholder content</Typography>
          </Paper>
        </div>
        <div className="w-1/2">
          <Paper elevation={3} className="p-4 h-64 rounded-xl flex flex-col">
            <Typography variant="h6" className="mb-2 font-semibold">Night</Typography>
            <Typography variant="body2" className="text-gray-600">Placeholder content</Typography>
          </Paper>
        </div>
      </div>

      <Box className="mb-4">
        <Typography variant="h6" className="mb-2 font-semibold">Completed</Typography>
        {completedTasks.map((task, index) => (
          <FormControlLabel
            key={index}
            control={<Checkbox checked disabled />}
            label={task}
          />
        ))}
      </Box>

      <Box>
        <Typography variant="h6" className="mb-2 font-semibold">Still To-Do</Typography>
        {todoTasks.map((task, index) => (
          <FormControlLabel
            key={index}
            control={<Checkbox disabled />}
            label={task}
          />
        ))}
      </Box>
    </Box>
  );
}
