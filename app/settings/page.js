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
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

export default function SettingsPage() {
  const router = useRouter();

  const initialForm = { name: "", phone: "" };
  const initialAm = { hour: "", minute: "" };
  const initialPm = { hour: "", minute: "" };

  const [formData, setFormData] = useState(initialForm);
  const [amTime, setAmTime] = useState(initialAm);
  const [pmTime, setPmTime] = useState(initialPm);
  const [hasChanged, setHasChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  useEffect(() => {
    // Check authentication
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId');
      if (!storedUserId) {
        router.push('/login');
        return;
      }
      setUserId(storedUserId);
      fetchUserDetails(storedUserId);
    }
  }, [router]);

  const fetchUserDetails = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/users/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }
      
      const userData = await response.json();
      
      // Update form data
      setFormData({
        name: userData.name || "",
        phone: userData.phone || ""
      });
      
      // Parse AM time if exists
      if (userData.timeam) {
        const [hour, minute] = userData.timeam.split(':');
        setAmTime({
          hour: parseInt(hour),
          minute: minute
        });
      }
      
      // Parse PM time if exists
      if (userData.timepm) {
        const [hour, minute] = userData.timepm.split(':');
        setPmTime({
          hour: parseInt(hour),
          minute: minute
        });
      }
      
    } catch (error) {
      console.error('Error fetching user details:', error);
      showAlert('Failed to load user details', 'error');
    } finally {
      setLoading(false);
    }
  };

  const saveChanges = async () => {
    if (!userId) return;
    
    try {
      setSaving(true);
      
      // Format times
      const timeam = amTime.hour && amTime.minute ? `${amTime.hour}:${amTime.minute}` : '';
      const timepm = pmTime.hour && pmTime.minute ? `${pmTime.hour}:${pmTime.minute}` : '';
      
      const response = await fetch(`http://localhost:8000/api/users/${userId}/onboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          timeam,
          timepm
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update user details');
      }
      
      showAlert('Settings updated successfully', 'success');
      
    } catch (error) {
      console.error('Error updating user details:', error);
      showAlert('Failed to update settings', 'error');
    } finally {
      setSaving(false);
    }
  };
  
  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userId');
      router.push('/login');
    }
  };
  
  const showAlert = (message, severity = 'success') => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setAlertOpen(true);
  };
  
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  useEffect(() => {
    // Track changes to form data
    if (loading) return; // Don't check for changes during initial load
    
    const hasFormChanged = 
      formData.name !== initialForm.name || 
      formData.phone !== initialForm.phone;
      
    const hasAmChanged = 
      amTime.hour !== initialAm.hour || 
      amTime.minute !== initialAm.minute;
      
    const hasPmChanged = 
      pmTime.hour !== initialPm.hour || 
      pmTime.minute !== initialPm.minute;
      
    setHasChanged(hasFormChanged || hasAmChanged || hasPmChanged);
  }, [formData, amTime, pmTime, loading]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress sx={{ color: '#F99A00' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <IconButton onClick={() => router.back()} sx={{ color: '#F99A00' }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ color: '#F99A00', fontWeight: 600 }}>
            Your Settings
          </Typography>
        </div>
        <IconButton 
          onClick={handleLogout} 
          sx={{ 
            color: '#F99A00',
            backgroundColor: 'rgba(249, 154, 0, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(249, 154, 0, 0.2)',
            }
          }}
        >
          <LogoutIcon />
        </IconButton>
      </div>
      
      <Box display="flex" justifyContent="center" mb={2}>
        <Avatar sx={{ width: 200, height: 200, bgcolor: '#F99A00' }}>
          <PersonIcon sx={{ fontSize: 40, color: 'white', width: 100, height: 100 }} />
        </Avatar>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mt: 2, borderRadius: 3, boxShadow: '0 4px 20px rgba(59, 219, 227, 0.5)', }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#1D5C5F' }}>
          Personal Information
        </Typography>

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
          sx={{ mb: 4 }}
        />

        <Typography variant="h6" sx={{ mb: 2, color: '#1D5C5F' }}>
          Morning Call Time
        </Typography>

        <Box display="flex" gap={2} mb={4}>
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
            <InputLabel sx={{ color: '#F99A00' }}>Minute</InputLabel>
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

        <Typography variant="h6" sx={{ mb: 2, color: '#1D5C5F' }}>
          Evening Call Time
        </Typography>

        <Box display="flex" gap={2} mb={4}>
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#F99A00' }}>Hour</InputLabel>
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
            <InputLabel sx={{ color: '#F99A00' }}>Minute</InputLabel>
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

        <Box display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>

          <Button
            variant="contained"
            disabled={!hasChanged || saving}
            onClick={saveChanges}
            sx={{
              backgroundColor: '#F99A00',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#e88a00',
              },
            }}
          >
            {saving ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
          </Button>
        </Box>
      </Paper>
      
      <Snackbar 
        open={alertOpen} 
        autoHideDuration={6000} 
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
