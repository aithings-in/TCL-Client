'use client'

import { AnimatePresence } from 'framer-motion'
import ContactPage from '@/pages/ContactPage'

export default function Contact() {
  return (
    <AnimatePresence mode="wait">
      <ContactPage />
    </AnimatePresence>
  )
}

