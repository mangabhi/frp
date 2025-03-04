import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, Card, CardContent, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import Layout from './Layout';

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({ name: '', date: '' });
  const [editingClass, setEditingClass] = useState(null);

  useEffect(() => {
    // Fetch initial classes data from an API or local storage
    const fetchClasses = async () => {
      // Replace with your actual API call
      const initialClasses = [
        { id: 1, name: 'Yoga', date: '2025-03-01' },
        { id: 2, name: 'Pilates', date: '2025-03-05' },
        { id: 3, name: 'Zumba', date: '2025-03-10' },
      ];
      setClasses(initialClasses);
    };
    fetchClasses();
  }, []);

  const handleAddClass = () => {
    if (newClass.name && newClass.date) {
      setClasses([...classes, { ...newClass, id: classes.length + 1 }]);
      setNewClass({ name: '', date: '' });
    }
  };

  const handleEditClass = (classItem) => {
    setEditingClass(classItem);
    setNewClass({ name: classItem.name, date: classItem.date });
  };

  const handleUpdateClass = () => {
    setClasses(classes.map((classItem) => (classItem.id === editingClass.id ? newClass : classItem)));
    setEditingClass(null);
    setNewClass({ name: '', date: '' });
  };

  const handleDeleteClass = (classId) => {
    setClasses(classes.filter((classItem) => classItem.id !== classId));
  };

  return (
    <Layout>
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={4}>
      <Typography variant="h4" gutterBottom>
        Class Management
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={4} width="100%">
        <TextField
          label="Class Name"
          value={newClass.name}
          onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
          sx={{ mb: 2, width: '100%' }}
        />
        <TextField
          label="Class Date"
          type="date"
          value={newClass.date}
          onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
          sx={{ mb: 2, width: '100%' }}
          InputLabelProps={{ shrink: true }}
        />
        {editingClass ? (
          <Button variant="contained" color="primary" onClick={handleUpdateClass} sx={{ mb: 2 }}>
            Update Class
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleAddClass} sx={{ mb: 2 }}>
            Add Class
          </Button>
        )}
      </Box>
      <Box width="100%">
        {classes.map((classItem) => (
          <Card key={classItem.id} variant="outlined" sx={{ mb: 2, width: '100%' }}>
            <CardContent>
              <Typography variant="h6">{classItem.name}</Typography>
              <Typography color="textSecondary">{classItem.date}</Typography>
              <Box display="flex" justifyContent="flex-end">
                <IconButton color="primary" onClick={() => handleEditClass(classItem)}>
                  <Edit />
                </IconButton>
                <IconButton color="secondary" onClick={() => handleDeleteClass(classItem.id)}>
                  <Delete />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
    </Layout>
  );
};

export default ClassManagement;