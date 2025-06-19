'use client'

import React, { useState } from 'react'
import { Box } from '@mui/material'
import Loader from '@/components/Loader'
import Navigation from '@/components/Navbar'
import Hero from '@/components/Hero'
import FeaturesSection from '@/components/FeaturesSection'
import ServicesSection from '@/components/ServicesSection'
import StatsSection from '@/components/StatsSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <Loader onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <Box>
      <Navigation
        sections={[
          { id: 'features', title: 'Features' },
          { id: 'services', title: 'Services' },
          { id: 'stats', title: 'Stats' },
          { id: 'testimonials', title: 'Testimonials' },
          { id: 'contact', title: 'Contact' },
        ]}
      />
      <Hero
        id="hero"
        title="Welcome to Our Platform"
        subtitle="Experience the future of web development with our cutting-edge platform"
        ctaText="Get Started"
        ctaLink="#contact"
      />
      <FeaturesSection />
      <ServicesSection />
      <StatsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </Box>
  )
}

export default HomePage 