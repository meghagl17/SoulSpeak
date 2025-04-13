'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Collapse,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { useSearchParams } from 'next/navigation';
import MoodComponent from '../components/mood';

// Import API - creating a mock API client since we can't directly import from outside Next.js app directory
// We'll implement this directly here instead of trying to import from outside the Next.js app
class DailyBuddyAPI {
  constructor(base_url="http://localhost:8000/api") {
    this.base_url = base_url;
    // For demo purposes, hardcoding user_id
    // In production, this would come from authentication
    this.user_id = typeof window !== 'undefined' ? localStorage.getItem('userId') || "user-123" : "user-123";
  }
  
  // Summary Methods (Morning/Night entries)
  async get_summary(date, am_pm=null) {
    let url = `${this.base_url}/summary`;
    let params = new URLSearchParams({
      user_id: this.user_id,
      date: date
    });
    
    if (am_pm !== null) {
      params.append("am_pm", am_pm);
    }
    
    try {
      const response = await fetch(`${url}?${params.toString()}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Error fetching summary:", error);
      return [];
    }
  }
  
  async create_update_summary(date, text, am_pm) {
    const url = `${this.base_url}/summary`;
    const data = {
      user_id: this.user_id,
      date: date,
      text: text,
      am_pm: am_pm
    };
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Error creating/updating summary:", error);
      return null;
    }
  }
  
  // Task Methods
  async get_tasks(date) {
    const url = `${this.base_url}/tasks`;
    const params = new URLSearchParams({
      userId: this.user_id,
      date: date
    });
    
    try {
      const response = await fetch(`${url}?${params.toString()}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  }
  
  async create_task(date, description, completed=false) {
    const url = `${this.base_url}/tasks`;
    const data = {
      user_id: this.user_id,
      date: date,
      description: description,
      completed: completed
    };
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Error creating task:", error);
      return null;
    }
  }
  
  async update_task(task_id, description=null, completed=null) {
    const url = `${this.base_url}/tasks/${task_id}`;
    const data = { user_id: this.user_id };
    
    if (description !== null) data.description = description;
    if (completed !== null) data.completed = completed;
    
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Error updating task:", error);
      return null;
    }
  }
  
  async delete_task(task_id) {
    const url = `${this.base_url}/tasks/${task_id}`;
    const params = new URLSearchParams({
      userId: this.user_id
    });
    
    try {
      const response = await fetch(`${url}?${params.toString()}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      return false;
    }
  }
  
  // Mood Methods
  async get_mood(date) {
    const url = `${this.base_url}/mood`;
    const params = new URLSearchParams({
      userId: this.user_id,
      date: date
    });
    
    try {
      const response = await fetch(`${url}?${params.toString()}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Error fetching mood:", error);
      return null;
    }
  }
  
  async create_update_mood(date, happy, sad, angry, calm) {
    const url = `${this.base_url}/mood`;
    const data = {
      user_id: this.user_id,
      date: date,
      happy: happy,
      sad: sad,
      angry: angry,
      calm: calm
    };
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("Error creating/updating mood:", error);
      return null;
    }
  }
}

export default function DayViewPage() {
  const searchParams = useSearchParams();
  const date = searchParams.get('date') || dayjs().format('YYYY-MM-DD');
  const todayFormatted = dayjs(date).format('MMMM D, YYYY');
  
  // API client
  const api = new DailyBuddyAPI();
  
  // States for data
  const [summaries, setSummaries] = useState({
    morning: '',
    night: '',
  });
  
  const [tasks, setTasks] = useState([]);
  const [mood, setMood] = useState({
    happy: 50,
    sad: 50,
    angry: 50,
    calm: 50,
  });
  
  // UI states
  const [completedOpen, setCompletedOpen] = useState(false);
  const [todoOpen, setTodoOpen] = useState(false);
  const [moodOpen, setMoodOpen] = useState(false);
  
  // Dialog states
  const [summaryDialogOpen, setSummaryDialogOpen] = useState(false);
  const [editingSummaryType, setEditingSummaryType] = useState(null); // 'morning' or 'night'
  const [summaryText, setSummaryText] = useState('');
  
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskDescription, setTaskDescription] = useState('');
  
  const [moodDialogOpen, setMoodDialogOpen] = useState(false);
  const [editingMood, setEditingMood] = useState(null);
  
  // Fetch data on component mount
  useEffect(() => {
    fetchSummaries();
    fetchTasks();
    fetchMood();
  }, [date]);
  
  // API call functions
  const fetchSummaries = async () => {
    try {
      const data = await api.get_summary(date);
      const morningEntry = data.find(entry => entry.am_pm === true);
      const nightEntry = data.find(entry => entry.am_pm === false);
      
      setSummaries({
        morning: morningEntry ? morningEntry.text : '',
        night: nightEntry ? nightEntry.text : '',
      });
    } catch (error) {
      console.error('Error fetching summaries:', error);
    }
  };
  
  const fetchTasks = async () => {
    try {
      const data = await api.get_tasks(date);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  
  const fetchMood = async () => {
    try {
      const data = await api.get_mood(date);
      if (data) {
        setMood({
          happy: data.happy,
          sad: data.sad,
          angry: data.angry,
          calm: data.calm,
        });
      }
    } catch (error) {
      console.error('Error fetching mood:', error);
    }
  };
  
  // Handler functions
  const handleBack = () => {
    window.history.back();
  };
  
  // Summary handlers
  const handleOpenSummaryDialog = (type) => {
    setEditingSummaryType(type);
    setSummaryText(summaries[type]);
    setSummaryDialogOpen(true);
  };
  
  const handleCloseSummaryDialog = () => {
    setSummaryDialogOpen(false);
    setEditingSummaryType(null);
    setSummaryText('');
  };
  
  const handleSaveSummary = async () => {
    try {
      const am_pm = editingSummaryType === 'morning';
      await api.create_update_summary(date, summaryText, am_pm);
      
      setSummaries(prev => ({
        ...prev,
        [editingSummaryType]: summaryText
      }));
      
      handleCloseSummaryDialog();
    } catch (error) {
      console.error('Error saving summary:', error);
    }
  };
  
  // Task handlers
  const handleOpenTaskDialog = (task = null) => {
    if (task) {
      setEditingTask(task);
      setTaskDescription(task.description);
    } else {
      setEditingTask(null);
      setTaskDescription('');
    }
    setTaskDialogOpen(true);
  };
  
  const handleCloseTaskDialog = () => {
    setTaskDialogOpen(false);
    setEditingTask(null);
    setTaskDescription('');
  };
  
  const handleSaveTask = async () => {
    try {
      if (editingTask) {
        // Update existing task
        await api.update_task(editingTask.id, taskDescription);
        setTasks(prev => 
          prev.map(task => 
            task.id === editingTask.id 
              ? { ...task, description: taskDescription } 
              : task
          )
        );
      } else {
        // Create new task
        const newTask = await api.create_task(date, taskDescription);
        setTasks(prev => [...prev, newTask]);
      }
      
      handleCloseTaskDialog();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };
  
  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete_task(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  const handleToggleTaskComplete = async (task) => {
    try {
      await api.update_task(task.id, null, !task.completed);
      setTasks(prev => 
        prev.map(t => 
          t.id === task.id 
            ? { ...t, completed: !t.completed } 
            : t
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  // Mood handlers
  const handleOpenMoodDialog = () => {
    setEditingMood({...mood});
    setMoodDialogOpen(true);
  };
  
  const handleCloseMoodDialog = () => {
    setMoodDialogOpen(false);
    setEditingMood(null);
  };
  
  const handleSaveMood = async () => {
    try {
      await api.create_update_mood(
        date, 
        editingMood.happy, 
        editingMood.sad, 
        editingMood.angry, 
        editingMood.calm
      );
      
      setMood({...editingMood});
      handleCloseMoodDialog();
    } catch (error) {
      console.error('Error saving mood:', error);
    }
  };
  
  const handleMoodChange = (type, value) => {
    setEditingMood(prev => ({
      ...prev,
      [type]: value
    }));
  };
  
  // Get completed and todo tasks
  const completedTasks = tasks.filter(task => task.completed);
  const todoTasks = tasks.filter(task => !task.completed);

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
            <div className="flex justify-between items-center" style={{ borderBottom: '2px solid white', marginBottom: '8px'}}>
              <Typography
                variant="h6"
                className="font-semibold text-white">
                Morning
              </Typography>
              <IconButton size="small" onClick={() => handleOpenSummaryDialog('morning')}>
                <EditIcon fontSize="small" style={{ color: 'white' }}/>
              </IconButton>
            </div>
            <Typography variant="body2" className="text-gray-600 annie text-white">
              {summaries.morning || "No morning entry yet. Click the edit icon to add one."}
            </Typography>
          </Paper>
        </div>
        <div className="w-1/2">
          <Paper
            elevation={3}
            className="p-4 h-64 rounded-xl flex flex-col"
            style={{ backgroundColor: '#3BDBE3' }}>
            <div className="flex justify-between items-center" style={{ borderBottom: '2px solid white', marginBottom: '8px' }}>
              <Typography
                variant="h6"
                className="font-semibold text-white">
                Night
              </Typography>
              <IconButton size="small" onClick={() => handleOpenSummaryDialog('night')}>
                <EditIcon fontSize="small" style={{ color: 'white' }}/>
              </IconButton>
            </div>
            <Typography variant="body2" className="text-gray-600 annie">
              {summaries.night || "No night entry yet. Click the edit icon to add one."}
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
            <div className="flex items-center">
              <span className="mr-2">{completedTasks.length}</span>
              <IconButton size="small">
                {completedOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </IconButton>
            </div>
          </Paper>
        </Typography>
        <Collapse in={completedOpen}>
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between mb-2">
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={task.completed} 
                      onChange={() => handleToggleTaskComplete(task)}
                    />
                  }
                  label={<span className="loved">{task.description}</span>}
                />
                <div>
                  <IconButton size="small" onClick={() => handleOpenTaskDialog(task)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteTask(task.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            ))
          ) : (
            <Typography className="italic text-gray-500 ml-2">No completed tasks</Typography>
          )}
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
            <div className="flex items-center">
              <IconButton size="small" onClick={(e) => {
                e.stopPropagation();
                handleOpenTaskDialog();
              }}>
                <AddIcon fontSize="small" />
              </IconButton>
              <span className="mr-2 ml-2">{todoTasks.length}</span>
              <IconButton size="small">
                {todoOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </IconButton>
            </div>
          </Paper>
        </Typography>
        <Collapse in={todoOpen}>
          {todoTasks.length > 0 ? (
            todoTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between mb-2">
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={task.completed} 
                      onChange={() => handleToggleTaskComplete(task)}
                    />
                  }
                  label={<span className="loved">{task.description}</span>}
                />
                <div>
                  <IconButton size="small" onClick={() => handleOpenTaskDialog(task)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDeleteTask(task.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            ))
          ) : (
            <Typography className="italic text-gray-500 ml-2">No tasks to do</Typography>
          )}
        </Collapse>
      </Box>

      {/* Mood section */}
      <Box>
        <Typography variant="h6" className="mb-2 font-semibold flex items-center">
          <Paper
            className="p-2 rounded-md w-full flex justify-between londrina"
            onClick={() => setMoodOpen(!moodOpen)}
          >
            Mood
            <div className="flex items-center">
              <IconButton size="small" onClick={(e) => {
                e.stopPropagation();
                handleOpenMoodDialog();
              }}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" className="ml-2">
                {moodOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </IconButton>
            </div>
          </Paper>
        </Typography>
        <Collapse in={moodOpen}>
          <MoodComponent mood={mood} className="mt-10"/>
        </Collapse>
      </Box>

      {/* Dialogs */}
      {/* Summary Dialog */}
      <Dialog 
        open={summaryDialogOpen} 
        onClose={handleCloseSummaryDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingSummaryType === 'morning' ? 'Edit Morning Entry' : 'Edit Night Entry'}
        </DialogTitle>
        <DialogContent>
          <TextareaAutosize
            minRows={5}
            style={{ width: '100%', padding: '10px', marginTop: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
            value={summaryText}
            onChange={(e) => setSummaryText(e.target.value)}
            placeholder="Write about your day..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSummaryDialog}>Cancel</Button>
          <Button onClick={handleSaveSummary} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Task Dialog */}
      <Dialog 
        open={taskDialogOpen} 
        onClose={handleCloseTaskDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Description"
            type="text"
            fullWidth
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTaskDialog}>Cancel</Button>
          <Button onClick={handleSaveTask} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Mood Dialog */}
      <Dialog 
        open={moodDialogOpen} 
        onClose={handleCloseMoodDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Mood</DialogTitle>
        <DialogContent>
          {editingMood && (
            <div className="flex flex-col gap-4 mt-4">
              {['happy', 'sad', 'angry', 'calm'].map((moodType) => (
                <div key={moodType} className="w-full">
                  <div className="flex items-center mb-1">
                    <span className="text-xl mr-2">{getEmoji(moodType)}</span>
                    <Typography>{moodType.charAt(0).toUpperCase() + moodType.slice(1)}</Typography>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={editingMood[moodType]}
                    onChange={(e) => handleMoodChange(moodType, parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseMoodDialog}>Cancel</Button>
          <Button onClick={handleSaveMood} color="primary">Save</Button>
        </DialogActions>
      </Dialog>

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

// Helper function for emoji display
const getEmoji = (moodType) => {
  const moodEmojis = {
    happy: '😊',
    sad: '😢',
    angry: '😡',
    calm: '😌',
  };
  return moodEmojis[moodType] || '😊';
};
