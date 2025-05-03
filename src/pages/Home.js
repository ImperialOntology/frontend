import React from 'react';
import { Typography, Box } from '@mui/material';
import AnimatedDemo from '../components/Animation';

function Home() {
  return (
    <Box sx={{ mt: 12 }}> 
      <Typography variant="h1" component="h1" align="center" gutterBottom sx={{ 
        color: '#ff3b00', 
        fontWeight: '500',
        textTransform: 'none',
        fontSize: '5rem', 
      }}>
        ADA-X
      </Typography>
      
      <Typography variant="h5" align="center" sx={{ mt: 4, mb: 6 }}>
        An AI-powered software with the mission of providing structured, transparent explanation on customer reviews
      </Typography>

      <AnimatedDemo />

    </Box>
  );
}

export default Home;