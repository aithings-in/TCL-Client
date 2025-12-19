'use client'

import { AnimatePresence } from 'framer-motion'
import HomePage from '@/pages/HomePage'

export default function Home() {
  return (
    <AnimatePresence mode="wait">
      <HomePage />
    </AnimatePresence>
  )
}

