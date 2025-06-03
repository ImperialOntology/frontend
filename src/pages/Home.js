import React from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import ChatAnimation from '../components/ChatAnimation';

function Home() {
  return (
    <Container sx={{ mt: 8 }}>
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
          ADA-X is a Large Language Model-powered software that provides structured, transparent explanations of 
          customer reviews.
            <br /><br />
            The system mainly addresses two problems found in traditional review aggregation systems:
            <ul>
              <li> <strong>Over-simplification:</strong> A single score is not comprehensive enough for customers to understand 
                the pros and cons of a product.
              </li>
              <li><strong>Biased results:</strong> Traditional review aggregation systems often use machine learning algorithms,
                which may be contaminated by biased data.
              </li>
            </ul>
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
