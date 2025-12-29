"use client";

import { AnimatePresence } from "framer-motion";
import GalleryPage from "@/pages/GalleryPage";

export default function Gallery() {
  return (
    <AnimatePresence mode="wait">
      <GalleryPage />
    </AnimatePresence>
  );
}
