'use client'

import { AnimatePresence } from 'framer-motion'
import AboutPage from '@/pages/AboutPage'

export default function About() {
  return (
    <AnimatePresence mode="wait">
      <AboutPage />
    </AnimatePresence>
  )
}

