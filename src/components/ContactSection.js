import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const ContactSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#f4f8ff',
        padding: '40px 20px',
        marginTop: '60px',
        borderTop: '1px solid #e0e0e0',
      }}
    >
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#050c43' }}>
        Contact
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography sx={{ fontWeight: 500 }}>Name: Lingjun Gao</Typography>
          <Typography>Email: lingjun0203@gmail.com</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography sx={{ fontWeight: 500 }}>Name: Antonio Rago</Typography>
          <Typography>Email: antonio.rago@kcl.ac.uk</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactSection;
