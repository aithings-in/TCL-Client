'use client'

import { AnimatePresence } from 'framer-motion'
import PlayerJourneyPage from '@/pages/PlayerJourneyPage'

export default function Journey() {
  return (
    <AnimatePresence mode="wait">
      <PlayerJourneyPage />
    </AnimatePresence>
  )
}

