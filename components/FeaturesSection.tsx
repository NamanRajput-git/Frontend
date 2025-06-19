'use client'

import React from 'react';
import { Box, Container, Typography, Button, Grid, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

const FeaturesSection: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <Box
      id="features"
      sx={{
        py: 8,
        backgroundColor: 'background.default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          {/* Video Side (hidden on mobile) */}
          <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 0,
                  paddingTop: '56.25%', // 16:9 aspect ratio
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: 3,
                  background: theme.palette.mode === 'dark' ? '#222' : '#eee',
                }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onLoadedData={() => setIsVideoLoaded(true)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: isVideoLoaded ? 1 : 0,
                    transition: 'opacity 1s ease-in-out',
                  }}
                  poster="/assets/features-services-poster.jpg"
                >
                  <source src="/assets/features-services.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* Optional: fallback image for slow networks or mobile */}
              </Box>
            </motion.div>
          </Grid>
          {/* Text Side */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            >
              <Box textAlign={{ xs: 'center', md: 'left' }} mb={4}>
                <Typography variant="h2" component="h2" gutterBottom>
                  Features
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  Discover the powerful features that make our platform unique. Designed for performance, security, and seamless user experience.
                </Typography>
              </Box>
              <Box>
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  color: theme.palette.text.primary,
                  fontSize: '1.1rem',
                  lineHeight: 1.7,
                }}>
                  <li>⚡ Blazing fast performance</li>
                  <li>🔒 Enterprise-grade security</li>
                  <li>🎨 Beautiful, adaptive UI</li>
                  <li>🌙 Light & Dark mode support</li>
                  <li>🔗 Seamless integrations</li>
                </ul>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;