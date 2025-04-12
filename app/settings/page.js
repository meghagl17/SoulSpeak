'use client';

import { Box, TextField, Typography, Button, Paper, FormControl, InputLabel, MenuItem, Select, IconButton } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function SettingsPage() {
    const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleBack = () => {
    window.history.back();
  };

  const [amTime, setAmTime] = useState({ hour: "", minute: "" });
  const [pmTime, setPmTime] = useState({ hour: "", minute: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Saved:', formData, amTime, pmTime);
    router.push('/dashboard');
  };

  const hourOptions = Array.from({ length: 12 }, (_, i) => i + 1);
  const minuteOptions = Array.from({ length: 60 }, (_, i) => (i < 10 ? `0${i}` : `${i}`));

  return (
    <Box className="p-4 min-h-screen bg-gray-50 flex flex-col justify-between">
      <Box className="mb-6 p-4 rounded-xl bg-white shadow-md flex items-center">
        <IconButton onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight="bold">
          Settings
        </Typography>
      </Box>

      <Paper elevation={3} className="rounded-xl p-6 mx-auto w-full max-w-md bg-white">
        <Box className="flex flex-col gap-4">
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />

          <Typography className="mt-2 font-semibold">AM Time</Typography>
          <Box className="flex gap-4">
            <FormControl fullWidth>
              <InputLabel>Hour</InputLabel>
              <Select
                value={amTime.hour}
                onChange={(e) => setAmTime((prev) => ({ ...prev, hour: e.target.value }))}
              >
                {hourOptions.map((hour) => (
                  <MenuItem key={hour} value={hour}>{hour}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Minute</InputLabel>
              <Select
                value={amTime.minute}
                onChange={(e) => setAmTime((prev) => ({ ...prev, minute: e.target.value }))}
              >
                {minuteOptions.map((min) => (
                  <MenuItem key={min} value={min}>{min}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Typography className="mt-2 font-semibold">PM Time</Typography>
          <Box className="flex gap-4">
            <FormControl fullWidth>
              <InputLabel>Hour</InputLabel>
              <Select
                value={pmTime.hour}
                onChange={(e) => setPmTime((prev) => ({ ...prev, hour: e.target.value }))}
              >
                {hourOptions.map((hour) => (
                  <MenuItem key={hour} value={hour}>{hour}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Minute</InputLabel>
              <Select
                value={pmTime.minute}
                onChange={(e) => setPmTime((prev) => ({ ...prev, minute: e.target.value }))}
              >
                {minuteOptions.map((min) => (
                  <MenuItem key={min} value={min}>{min}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Paper>

      <Box className="mt-6">
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="rounded-xl"
          onClick={handleSave}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
