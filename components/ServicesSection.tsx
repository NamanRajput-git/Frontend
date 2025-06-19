'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const ServicesSection: React.FC = () => {
  return (
    <Box
      id="services"
      sx={{
        py: 8,
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" mb={8}>
          <Typography variant="h2" component="h2" gutterBottom>
            Our Services
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Comprehensive solutions to help your business grow
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ServicesSection;