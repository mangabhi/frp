import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
// import Layout from './layout';
import { Box, Typography, CircularProgress } from '@mui/material';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const nav = useNavigate();
  
  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
        <Typography variant="h6" style={{ marginLeft: '10px' }}>Loading...</Typography>
      </Box>
  )

  if (isAuthenticated) {
    return children
  }
  else {
    nav('/login')
  }

};

export default PrivateRoute;