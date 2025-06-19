'use client';

'use client';

import { Box, Typography, Button, useTheme, alpha, useMediaQuery } from '@mui/material';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState, useRef } from 'react';

interface HeroProps {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

const Hero: React.FC<HeroProps> = ({ id, title, subtitle, ctaText, ctaLink }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isMounted, setIsMounted] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useViewportScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    setIsMounted(true);
    // Preload video
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, []);

  const handleVideoLoaded = () => {
    setIsVideoLoaded(true);
  };

  // Smooth scroll to section
  const handleScroll = (e: React.MouseEvent<Element>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      id={id}
      ref={ref}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '700px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Video Background with Parallax Effect */}
      <Box
        component={motion.div}
        style={{ y }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '120%',
          overflow: 'hidden',
          zIndex: -1,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Box
          component="video"
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={handleVideoLoaded}
          preload="auto"
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
            transition: 'opacity 1s ease-in-out',
          }}
          poster="/assets/homepage-poster.jpg"
        >
          <source src="/assets/homepage.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </Box>
      </Box>

      {/* Fallback static image for mobile */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          background: `url(/assets/homepage-poster.jpg) center center / cover no-repeat`,
          filter: 'brightness(0.7)',
        }}
      />

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(
            to bottom,
            ${alpha(theme.palette.background.default, 0.4)} 0%,
            ${alpha(theme.palette.background.default, 0.85)} 100%
          )`,
          zIndex: 0,
        }}
      />
      
      {/* Subtle Grid Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          zIndex: 0,
          opacity: 0.5,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          color: 'white',
          maxWidth: '1200px',
          px: { xs: 3, md: 6 },
          py: { xs: 12, md: 16 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView && isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 800,
              lineHeight: 1.1,
              mb: 3,
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.5rem' },
              fontWeight: 400,
              mb: 4,
              maxWidth: '800px',
              mx: 'auto',
              textShadow: '0 1px 3px rgba(0,0,0,0.3)',
            }}
          >
            {subtitle}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 3,
              justifyContent: 'center',
              flexWrap: 'wrap',
              mt: 4,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                size="large"
                href={ctaLink}
                sx={{
                  px: 5,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)',
                }}
              >
                {ctaText}
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outlined"
                size="large"
                href="#features"
                sx={{
                  px: 5,
                  py: 1.5,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                  },
                }}
              >
                Learn More
              </Button>
            </motion.div>
          </Box>
        </motion.div>

        {/* Scroll Indicator */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: 1, duration: 0.5 }}
          sx={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => handleScroll(e, 'features')}
        >
          <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
            Scroll Down
          </Typography>
          <Box
            component={motion.div}
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            sx={{
              width: '24px',
              height: '40px',
              borderRadius: '12px',
              border: '2px solid #fff',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '6px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '4px',
                height: '8px',
                borderRadius: '2px',
                background: '#fff',
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
