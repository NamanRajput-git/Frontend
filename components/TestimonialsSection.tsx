'use client'

import React, { useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Grid,
  useTheme,
  alpha,
} from '@mui/material'
import { ChevronLeft, ChevronRight, Star } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'

const TestimonialsSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const theme = useTheme()

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      content: 'The team delivered an exceptional product that exceeded our expectations. Their attention to detail and commitment to quality is outstanding.',
      avatar: '👩‍💼',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'CTO, InnovaCorp',
      content: 'Working with this team was a game-changer for our business. They transformed our vision into a beautiful, functional reality.',
      avatar: '👨‍💻',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Founder, CreativeStudio',
      content: 'Professional, reliable, and incredibly talented. They helped us build a platform that our users absolutely love.',
      avatar: '👩‍🎨',
      rating: 5,
    },
    {
      name: 'David Kim',
      role: 'Product Manager, FutureTech',
      content: 'The best development team we have worked with. Fast delivery, excellent communication, and top-notch quality.',
      avatar: '👨‍💼',
      rating: 5,
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <Box
      id="testimonials"
      sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        overflow: 'hidden',
      }}
    >
      {/* Video Background (hidden on mobile) */}
      <Box
        component="video"
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/testimonials-poster.jpg"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -2,
          display: { xs: 'none', md: 'block' },
        }}
      >
        <source src="/assets/testimonials.mp4" type="video/mp4" />
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
          zIndex: -2,
          background: `url(/assets/testimonials-poster.jpg) center center / cover no-repeat`,
          filter: 'brightness(0.7)',
        }}
      />

      {/* Gradient Overlay (adapts to theme) */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(
            to bottom,
            ${alpha(theme.palette.background.default, 0.5)} 0%,
            ${alpha(theme.palette.background.default, 0.85)} 100%
          )`,
          zIndex: -1,
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h2"
              sx={{
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                color: 'white',
              }}
            >
              What Our Clients Say
            </Typography>
            <Typography
              variant="h6"
              sx={{ 
                maxWidth: 600, 
                mx: 'auto',
                color: 'rgba(255, 255, 255, 0.9)',
              }}
            >
              Real feedback from real clients who chose us for their projects
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8} sx={{ mx: 'auto' }}>
            <Box sx={{ position: 'relative' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card
                    sx={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      minHeight: 300,
                    }}
                  >
                    <CardContent sx={{ p: { xs: 3, md: 5 }, textAlign: 'center' }}>
                      <Box sx={{ mb: 3 }}>
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} sx={{ color: '#ffd700', fontSize: '1.5rem' }} />
                        ))}
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{
                          mb: 4,
                          fontStyle: 'italic',
                          lineHeight: 1.6,
                          color: 'text.primary',
                        }}
                      >
                        "{testimonials[currentTestimonial].content}"
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 60, height: 60, fontSize: '1.5rem' }}>
                          {testimonials[currentTestimonial].avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight={600}>
                            {testimonials[currentTestimonial].name}
                          </Typography>
                          <Typography color="text.secondary">
                            {testimonials[currentTestimonial].role}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </AnimatePresence>

              {/* Navigation buttons */}
              <IconButton
                onClick={prevTestimonial}
                sx={{
                  position: 'absolute',
                  left: -20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                }}
              >
                <ChevronLeft />
              </IconButton>

              <IconButton
                onClick={nextTestimonial}
                sx={{
                  position: 'absolute',
                  right: -20,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                }}
              >
                <ChevronRight />
              </IconButton>
            </Box>

            {/* Dots indicator */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
              {testimonials.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: index === currentTestimonial ? 'white' : 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'white',
                    },
                  }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default TestimonialsSection 