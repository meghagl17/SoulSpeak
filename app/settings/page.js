'use client';

import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
  Avatar,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';

const initialForm = { name: "", phone: "" };
const initialAm = { hour: "", minute: "" };
const initialPm = { hour: "", minute: "" };

export default function SettingsPage() {
  const router = useRouter();

  const [formData, setFormData] = useState(initialForm);
  const [amTime, setAmTime] = useState(initialAm);
  const [pmTime, setPmTime] = useState(initialPm);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    const hasFormChanged = JSON.stringify(formData) !== JSON.stringify(initialForm);
    const hasAmChanged = JSON.stringify(amTime) !== JSON.stringify(initialAm);
    const hasPmChanged = JSON.stringify(pmTime) !== JSON.stringify(initialPm);
    setHasChanged(hasFormChanged || hasAmChanged || hasPmChanged);
  }, [formData, amTime, pmTime]);

  return (
    <Box sx={{ p: 3 }}>
      <div className="flex items-center mb-3 gap-2">
        <IconButton onClick={() => router.back()} sx={{ color: '#F99A00' }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" sx={{ color: '#F99A00', fontWeight: 600 }}>
          Your Settings
        </Typography>
      </div>
      
      <Box display="flex" justifyContent="center" mb={2}>
        <Avatar sx={{ width: 200, height: 200 }}>
          <PersonIcon sx={{ fontSize: 40, color: 'white', width: 100, height: 100 }} />
        </Avatar>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mt: 2, borderRadius: 3, boxShadow: '0 4px 20px rgba(59, 219, 227, 0.5)', }}>

        <TextField
          fullWidth
          label="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Phone Number"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          sx={{ mb: 2 }}
        />

        <Box display="flex" gap={2} mb={2}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#F99A00' }}>Hour</InputLabel>
            <Select
              value={amTime.hour}
              onChange={(e) => setAmTime({ ...amTime, hour: e.target.value })}
              label="AM Hour"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel sx={{ color: '#F99A00' }}>AM Minute</InputLabel>
            <Select
              value={amTime.minute}
              onChange={(e) => setAmTime({ ...amTime, minute: e.target.value })}
              label="AM Minute"
            >
              {['00', '15', '30', '45'].map((min) => (
                <MenuItem key={min} value={min}>
                  {min}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box display="flex" gap={2} mb={3}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#F99A00' }}>PM Hour</InputLabel>
            <Select
              value={pmTime.hour}
              onChange={(e) => setPmTime({ ...pmTime, hour: e.target.value })}
              label="PM Hour"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel sx={{ color: '#F99A00' }}>PM Minute</InputLabel>
            <Select
              value={pmTime.minute}
              onChange={(e) => setPmTime({ ...pmTime, minute: e.target.value })}
              label="PM Minute"
            >
              {['00', '15', '30', '45'].map((min) => (
                <MenuItem key={min} value={min}>
                  {min}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          disabled={!hasChanged}
          onClick={() => console.log("Save")}
          sx={{
            backgroundColor: '#F99A00',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#e88a00',
            },
          }}
        >
          Save Changes
        </Button>
      </Paper>
    </Box>
  );
}
