import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import ChatAnimation from '../components/ChatAnimation';

function Home() {
  return (
    <Container sx={{ mt: 12 }}>
      {/* Centered Title */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h1" component="h1" sx={{
          color: '#ff3b00',
          fontWeight: '500',
          textTransform: 'none',
          fontSize: '5rem',
        }}>
          ADA-X
        </Typography>
      </Box>

      {/* Two-column layout */}
      <Grid container spacing={4} alignItems="flex-start">
        {/* Left Column - Description */}
        <Grid item xs={12} md={5}>
          <Typography variant="h5" align="left" sx={{ lineHeight: 1.6 }}>
            ADA-X is an AI-powered software with the mission of providing structured, transparent explanations
            on customer reviews. It extracts meaningful insights using natural language processing, helping 
            businesses better understand customer sentiment and improve decision-making.
            <br /><br />
            Some more descriptions
          </Typography>
        </Grid>

        {/* Right Column - Animation Placeholder */}
        <Grid item xs={12} md={7}>
          {/* Add your <AnimatedDemo /> component here later */}
          <ChatAnimation />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
