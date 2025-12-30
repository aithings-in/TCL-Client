"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { StylishButton } from "@/components/ui/stylish-button";
import Link from "next/link";
import carouselContent from "@/data/carousel_content.json";

const NewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const items = carouselContent;

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [items.length, isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume auto-play after 10 seconds
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const currentItem = items[currentIndex];

  return (
    <section
      className="w-full h-[calc(100vh-64px)] relative overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Carousel Container */}
      <div className="relative w-full h-full flex flex-col">
        {/* Background Image - Takes available space but leaves room for content */}
        <div className="absolute inset-0 flex-1 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/50"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Overlay - Positioned at bottom with space for dots */}
        <div className="absolute inset-x-0 bottom-8 sm:bottom-10 md:bottom-12 lg:bottom-14 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 z-10">
          <div className="w-full max-w-2xl xl:max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="space-y-1.5 sm:space-y-2 md:space-y-3"
              >
                {/* Article Tag */}
                <div className="inline-block mb-1 sm:mb-1.5 md:mb-2">
                  <span className="bg-brandBlue text-white text-[10px] xs:text-xs sm:text-sm md:text-base font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1.5 lg:px-4 lg:py-2 rounded">
                    {currentItem.type}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-white leading-tight mb-1 sm:mb-1.5 md:mb-2 line-clamp-2 sm:line-clamp-3">
                  {currentItem.title}
                </h2>

                {/* Date */}
                <p className="text-white/80 text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg mb-1.5 sm:mb-2 md:mb-3">
                  {currentItem.date}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 sm:gap-3 pt-0.5 sm:pt-1">
                  <Link href={currentItem.readMoreUrl}>
                    <StylishButton
                      size="sm"
                      variant="primary"
                      icon={ExternalLink}
                      iconPosition="right"
                      className="text-[10px] xs:text-xs sm:text-sm md:text-base "
                    >
                      <span className="hidden sm:inline">Read More</span>
                      <span className="sm:hidden">Read</span>
                    </StylishButton>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Buttons - Centered vertically */}
        <button
          onClick={goToPrevious}
          className="absolute left-1.5 sm:left-2 md:left-3 lg:left-4 xl:left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#CE357C] active:bg-[#CE357C]/80 text-white p-2 sm:p-2.5 md:p-3 lg:p-4 rounded-full transition-all z-20 backdrop-blur-sm touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-1.5 sm:right-2 md:right-3 lg:right-4 xl:right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-[#CE357C] active:bg-[#CE357C]/80 text-white p-2 sm:p-2.5 md:p-3 lg:p-4 rounded-full transition-all z-20 backdrop-blur-sm touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" />
        </button>

        {/* Dots Indicator - Positioned at very bottom */}
        <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 lg:bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-10">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full touch-manipulation min-w-[8px] min-h-[8px] ${
                index === currentIndex
                  ? "bg-white w-5 h-1.5 sm:w-6 sm:h-2 md:w-8 md:h-2.5 lg:w-10 lg:h-3"
                  : "bg-white/40 w-1.5 h-1.5 sm:w-2 sm:h-2 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsCarousel;
