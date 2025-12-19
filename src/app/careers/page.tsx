'use client'

import { AnimatePresence } from 'framer-motion'
import CareersPage from '@/pages/CareersPage'

export default function Careers() {
  return (
    <AnimatePresence mode="wait">
      <CareersPage />
    </AnimatePresence>
  )
}

