'use client'

import { AnimatePresence } from 'framer-motion'
import AuctionPage from '@/pages/AuctionPage'

export default function Auction() {
  return (
    <AnimatePresence mode="wait">
      <AuctionPage />
    </AnimatePresence>
  )
}

