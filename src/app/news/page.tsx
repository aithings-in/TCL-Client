'use client'

import { AnimatePresence } from 'framer-motion'
import NewsPage from '@/pages/NewsPage'

export default function News() {
  return (
    <AnimatePresence mode="wait">
      <NewsPage />
    </AnimatePresence>
  )
}

