'use client';

import React, { useEffect, useState } from 'react';
import { Box, Fade, Typography } from '@mui/material';
import { motion } from 'framer-motion';

interface LoaderProps {
  onLoadingComplete: () => void;
}

const EnhancedLoader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 10;
      });
    }, 100);

    // Set a minimum display time of 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      setProgress(100);
      setTimeout(() => {
        onLoadingComplete();
      }, 800); // Smooth fade out
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  return (
    <Fade in={isVisible} timeout={800}>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          overflow: 'hidden',
        }}
      >
        {/* Background Video */}
        <Box
          component={motion.div}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            opacity: 0.8,
          }}
        >
          <Box
            component="video"
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={handleVideoLoaded}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              minWidth: '100%',
              minHeight: '100%',
              width: 'auto',
              height: 'auto',
              transform: 'translate(-50%, -50%)',
              objectFit: 'cover',
              opacity: isVideoLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
          >
            <source src="/assets/loader.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </Box>
        </Box>

        {/* Content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: '400px',
            px: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Minimal Progress Bar Only */}
          <Box
            component={motion.div}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
            sx={{
              height: '3px',
              backgroundColor: 'primary.main',
              borderRadius: '2px',
              maxWidth: '100%',
              mx: 'auto',
              mb: 0,
              boxShadow: '0 0 10px rgba(33, 150, 243, 0.3)',
            }}
          />
        </Box>
      </Box>
    </Fade>
  );
};

export default EnhancedLoader;
