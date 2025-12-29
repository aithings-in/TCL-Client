import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { StylishButton } from "@/components/ui/stylish-button";
import { useLeagueType } from "@/hooks/useLeagueType";
import {
  Zap,
  ShieldCheck,
  UserCheck,
  BrainCircuit,
  Bot,
  Map,
  Award,
  Calendar,
  Table,
  BarChart3,
  Users,
  Eye,
  ThumbsUp,
  Star,
  Medal,
  Tv,
  TrendingUp,
  FileText,
  Plane,
  Trophy,
} from "lucide-react";
import CountUp from "react-countup";
import NewsCarousel from "@/components/NewsCarousel";
import { ChevronLeft, ChevronRight, Share2, ExternalLink } from "lucide-react";
import latestVideos from "@/data/latest_videos.json";
import magicMoments from "@/data/magic_moments.json";
import latestNews from "@/data/latestNews.json";
import content from "@/data/content.json";
import galleryImages from "@/data/gallery.json";
import MagicMomentCard from "@/components/MagicMomentCard";
import VideoCard from "@/components/VideoCard";
import NewsCard from "@/components/NewsCard";
import NewsGrid from "@/components/NewsGrid";
import PrizeCard from "@/components/PrizeCard";
import AIPlatformCard from "@/components/AIPlatformCard";
import WhyJoinCard from "@/components/WhyJoinCard";
import WhyChooseUsCard from "@/components/WhyChooseUsCard";

// Icon mapping for dynamic icons
const iconMap = {
  Calendar,
  Table,
  BarChart3,
  Users,
  BrainCircuit,
  Bot,
  Map,
  Award,
  Zap,
  UserCheck,
  ShieldCheck,
  ThumbsUp,
  Star,
  Medal,
  Tv,
  TrendingUp,
  FileText,
  Plane,
  Trophy,
};

// Helper function to get icon component by name
const getIcon = (iconName) => {
  return iconMap[iconName] || Award;
};

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

const Section = ({ children, id, className = "" }) => (
  <section
    id={id}
    className={`py-16 md:py-24 relative overflow-hidden ${className}`}
  >
    <div>{children}</div>
  </section>
);

const SectionTitle = ({ children, className = "", isWhiteBg = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, type: "spring" }}
    viewport={{ once: true }}
    className={`text-center mb-12 md:mb-16 ${className}`}
  >
    <h2
      className={`text-4xl md:text-6xl font-black mb-4 ${
        isWhiteBg ? "text-[#CE357C]" : "text-white"
      }`}
    >
      {children}
    </h2>
  </motion.div>
);

const InfoCard = ({
  icon,
  title,
  description,
  delay = 0,
  isWhiteBg = false,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, type: "spring" }}
    viewport={{ once: true }}
    className={`ipl-card rounded-xl p-6 md:p-8 text-center h-full hover:shadow-2xl hover:shadow-[#CE357C]/20 transition-all duration-300 hover:scale-105 group ${
      isWhiteBg ? "bg-white border-[#CE357C]/20" : ""
    }`}
  >
    <div className="flex flex-col items-center h-full">
      <div className="text-[#CE357C] w-16 h-16 md:w-20 md:h-20 mx-auto mb-5 md:mb-6 flex items-center justify-center rounded-full bg-[#CE357C]/10 group-hover:bg-[#CE357C]/20 transition-all duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3
        className={`text-xl md:text-2xl font-bold mb-3 md:mb-4 group-hover:text-[#CE357C] transition-colors duration-300 ${
          isWhiteBg ? "text-brandBlue" : "text-white"
        }`}
      >
        {title}
      </h3>
      <p
        className={`text-sm md:text-base leading-relaxed flex-grow ${
          isWhiteBg ? "text-gray-600" : "text-gray-300"
        }`}
      >
        {description}
      </p>
    </div>
  </motion.div>
);

const Counter = ({ end, suffix, prefix, title }) => (
  <motion.div
    className="text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, type: "spring" }}
    viewport={{ once: true }}
  >
    <p className="text-4xl md:text-6xl font-black neon-text-gradient">
      <CountUp end={end} duration={3} enableScrollSpy scrollSpyOnce />
      {suffix}
    </p>
    <p className="text-sm md:text-base text-gray-400 font-semibold mt-1">
      {title}
    </p>
  </motion.div>
);

const HomePage = () => {
  const router = useRouter();
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const { leagueType } = useLeagueType();

  const testimonials = content.homePage.testimonials.testimonials;

  // Get tournament-specific content based on league type
  const tournamentKey = leagueType.toLowerCase();
  const tournamentContent = content.tournaments[tournamentKey];
  const offlineLeaguePrizes = tournamentContent?.offlineLeague?.prizes || [];

  const handleTestimonialScroll = (direction) => {
    const container = document.getElementById("testimonials-container");
    if (!container) return;

    const scrollAmount = 400;
    const newIndex =
      direction === "next"
        ? (currentTestimonialIndex + 1) % testimonials.length
        : (currentTestimonialIndex - 1 + testimonials.length) %
          testimonials.length;

    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });

    setCurrentTestimonialIndex(newIndex);
  };

  // Auto-scroll detection to track which card is in view
  useEffect(() => {
    const container = document.getElementById("testimonials-container");
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      const cardWidth = containerWidth / 3; // Approximate card width for 3 cards
      const gap = 24; // gap-6 = 1.5rem = 24px
      const totalCardWidth = cardWidth + gap;
      const newIndex = Math.round(scrollLeft / totalCardWidth);
      const clampedIndex = Math.max(
        0,
        Math.min(newIndex, testimonials.length - 1)
      );
      setCurrentTestimonialIndex(clampedIndex);
    };

    container.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, [testimonials.length]);

  return (
    <PageTransition>
      <main>
        {/* News Carousel Section - Full Screen */}
        <div className="relative">
          <NewsCarousel />
        </div>

        {/* What Are You Looking For? Section */}
        <Section className="bg-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-brandPink text-center mb-8 md:mb-12">
              {content.homePage.whatAreYouLookingFor.title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
              {content.homePage.whatAreYouLookingFor.items.map(
                (item, index) => {
                  const IconComponent = getIcon(item.icon);
                  return (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-4 md:p-6 hover:border-[#CE357C] hover:bg-[#CE357C]/5 transition-all duration-300 flex flex-col items-center gap-3 text-left"
                    >
                      <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-brandBlue" />
                      <span className="text-sm md:text-base font-semibold text-black text-center">
                        {item.title}
                      </span>
                    </motion.button>
                  );
                }
              )}
            </div>
          </div>
        </Section>

        {/* TCL Selection Process Section */}
        <section className="w-full bg-white">
          <div className="flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Section - Selection Process (2/3 on desktop, full on mobile) */}
            <div className="w-full lg:w-2/3 bg-brandBlue relative overflow-hidden">
              {/* Pattern Background */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
                }}
              />

              <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8 sm:mb-10 md:mb-12"
                >
                  {content.homePage.selectionProcess.title}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                  {content.homePage.selectionProcess.items.map(
                    (item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: (index + 1) * 0.1 }}
                        className="flex flex-col"
                      >
                        <div className="border-t-2 border-dashed border-blue-400/50 pt-4 mb-4">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-sm sm:text-base md:text-lg text-white/90 mb-4 sm:mb-6 leading-relaxed">
                          {item.description}
                        </p>
                        <Link href={item.link}>
                          <StylishButton
                            variant="secondary"
                            size="sm"
                            icon={ExternalLink}
                            iconPosition="right"
                            className="text-xs sm:text-sm"
                          >
                            {item.linkText}
                          </StylishButton>
                        </Link>
                      </motion.div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Right Section - CTA (1/3 on desktop, full on mobile) */}
            <div className="w-full lg:w-1/3 bg-white flex items-center justify-center px-6 sm:px-8 md:px-12 py-8 sm:py-12 md:py-16">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left max-w-md"
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brandPink mb-4 sm:mb-6">
                  {content.homePage.selectionProcess.cta.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                  {content.homePage.selectionProcess.cta.description}
                </p>
                <Link href={content.homePage.selectionProcess.cta.link}>
                  <StylishButton variant="secondary" size="lg">
                    {content.homePage.selectionProcess.cta.buttonText}
                  </StylishButton>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <Section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-black mb-4 text-brandPink">
                {content.homePage.journeyFlowchart.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                {content.homePage.journeyFlowchart.subtitle}
              </p>
            </motion.div>

            {/*
              Journey steps - 3-row snake layout with connecting line
              Row 1: steps 1-3 (left to right)
              Row 2: steps 4-6 (right to left on desktop)
              Row 3: steps 7-9 (left to right)
            */}
            {/* Journey steps content with connecting lines */}
            <div className="max-w-5xl mx-auto relative">
              {(() => {
                const allSteps = content.homePage.journeyFlowchart.steps;
                const stepsPerRow = 3;
                const totalRows = Math.ceil(allSteps.length / stepsPerRow);
                const rows = [];

                // Split steps into rows
                for (let i = 0; i < totalRows; i++) {
                  rows.push(
                    allSteps.slice(i * stepsPerRow, (i + 1) * stepsPerRow)
                  );
                }

                return (
                  <div className="space-y-8 sm:space-y-12 relative">
                    {rows.map((rowSteps, rowIndex) => {
                      const isReversed = rowIndex % 2 === 1; // Odd rows are reversed
                      const isLastRow = rowIndex === rows.length - 1;

                      return (
                        <div
                          key={rowIndex}
                          className={`flex flex-wrap justify-evenly items-center relative gap-y-3 ${
                            isReversed ? "sm:flex-row-reverse" : ""
                          }`}
                        >
                          {rowSteps.map((step, index) => {
                            const isLastInRow = index === rowSteps.length - 1;
                            const isFirstInRow = index === 0;
                            const stepIndex = rowIndex * stepsPerRow + index;
                            const isLastStep =
                              stepIndex === allSteps.length - 1;

                            // For reversed rows, first step is visually last
                            const visualIndex = isReversed
                              ? rowSteps.length - 1 - index
                              : index;
                            const isVisualLast = isReversed
                              ? isFirstInRow
                              : isLastInRow;
                            const isVisualFirst = !isReversed
                              ? isLastInRow
                              : isFirstInRow;

                            return (
                              <React.Fragment key={step.num}>
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  transition={{
                                    duration: 0.5,
                                    delay: stepIndex * 0.1,
                                  }}
                                  viewport={{ once: true }}
                                  className="relative group z-10"
                                >
                                  {/* Step bubble with counter */}
                                  <div className="relative z-10">
                                    {/* Number circle */}
                                    <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full bg-brandBlue flex items-center justify-center shadow-lg shadow-brandBlue/40">
                                      <span className="text-xl md:text-2xl lg:text-3xl font-black text-white">
                                        {step.num}
                                      </span>
                                    </div>

                                    {/* Main label circle */}
                                    <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-white border-4 border-brandBlue shadow-xl flex items-center justify-center group-hover:border-brandPink group-hover:shadow-2xl group-hover:shadow-brandPink/20 transition-all duration-300">
                                      <span className="text-sm md:text-base lg:text-lg font-bold text-brandPink text-center px-2 leading-snug">
                                        {step.label}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Vertical connecting line from current row to next row */}
                                  {!isLastRow && isLastInRow && (
                                    <div className="hidden md:block absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-12 md:h-16 bg-brandBlue z-0">
                                      <div className="absolute inset-0 bg-brandBlue"></div>
                                    </div>
                                  )}
                                </motion.div>

                                {/* Horizontal connecting line between steps in same row */}
                                {!isLastInRow && (
                                  <div className="hidden md:flex items-center flex-1 min-w-[60px] max-w-[120px] h-0.5 mx-2">
                                    <div className="w-full h-0.5 bg-brandBlue rounded-full relative">
                                      <div className="absolute inset-0 bg-brandBlue/60"></div>
                                    </div>
                                  </div>
                                )}

                                {/* Mobile connecting lines */}
                                {!isLastInRow && (
                                  <div
                                    className={`${
                                      index % 2 !== 0
                                        ? "max-[450px]:hidden"
                                        : ""
                                    } md:hidden flex items-center mx-2`}
                                  >
                                    <div className="w-4 h-0.5 bg-brandBlue/50 relative"></div>
                                  </div>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        </Section>

        {/* AI Section */}
        {/* <section
          id="home"
          className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24"
        >
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover opacity-20"
              alt={content.homePage.hero.backgroundImageAlt}
              src={content.homePage.hero.backgroundImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brandBlue via-brandBlue/90 to-brandBlue/70"></div>
          </div>

          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <div className="absolute inset-0 z-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
  
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 border border-purple-500/40 rounded-full text-purple-300 text-sm font-semibold uppercase tracking-wide backdrop-blur-sm">
                🚀 Revolutionary Platform
              </span>
            </motion.div>

   
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 leading-tight"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl">
                {content.homePage.hero.title}
              </span>
            </motion.h1>


            <motion.p
              className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-medium mb-10 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {content.homePage.hero.subtitle}
            </motion.p>

  
            <motion.div
              className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <StylishButton
                variant="secondary"
                size="lg"
                className="text-base md:text-lg px-8 md:px-12 py-6 md:py-8"
                onClick={() => {
                  router.push("/register");
                }}
              >
                {content.homePage.hero.primaryButton.text}
              </StylishButton>
              <Link href={content.homePage.hero.secondaryButton.link}>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base md:text-lg font-bold px-8 md:px-12 py-6 md:py-8 border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm bg-brandBlue"
                >
                  {content.homePage.hero.secondaryButton.text}
                </Button>
              </Link>
            </motion.div>


            <div className="absolute inset-0 pointer-events-none z-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/20 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 3) * 20}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
          </div>
        </section> */}

        <Section className="bg-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brandPink uppercase tracking-wide">
                {content.homePage.magicMoments.title}
              </h2>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="bg-brandPink border-white/30 text-white hover:bg-[#CE357C] hover:border-[#CE357C] hover:text-white text-sm md:text-base px-4 md:px-6 font-semibold transition-all"
                >
                  {content.homePage.magicMoments.seeMoreButton}
                </Button>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const container = document.getElementById(
                        "magic-moments-container"
                      );
                      if (container) {
                        container.scrollBy({ left: -320, behavior: "smooth" });
                      }
                    }}
                    className="p-2 rounded-full border border-black/30 text-black/50 hover:bg-[#CE357C] hover:border-[#CE357C] hover:text-white transition-all"
                    aria-label="Previous images"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      const container = document.getElementById(
                        "magic-moments-container"
                      );
                      if (container) {
                        container.scrollBy({ left: 320, behavior: "smooth" });
                      }
                    }}
                    className="p-2 rounded-full border border-black/30 text-black hover:bg-[#CE357C] hover:border-[#CE357C] hover:text-white transition-all"
                    aria-label="Next images"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Magic Moments Carousel */}
            <div
              id="magic-moments-container"
              className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {magicMoments.map((moment, index) => (
                <MagicMomentCard
                  key={moment.id}
                  moment={moment}
                  index={index}
                />
              ))}
            </div>
          </div>
        </Section>

        {/* Offline League Section */}
        <Section
          id="league"
          className="bg-brandBlue relative overflow-hidden py-20 md:py-32"
        >
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0">
            {/* Animated gradient orbs */}
            <motion.div
              className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: "50px 50px",
                }}
              />
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            {/* Enhanced Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-block mb-6"
              >
                <span className="px-4 py-2 bg-gradient-to-r from-[#CE357C]/20 via-purple-500/20 to-blue-500/20 border border-[#CE357C]/40 rounded-full text-[#CE357C] text-sm font-semibold uppercase tracking-wide backdrop-blur-sm">
                  🏆 Premium League
                </span>
              </motion.div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
                <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  {tournamentContent?.offlineLeague?.title ||
                    content.homePage.offlineLeague.title}
                </span>
              </h2>

              {/* Description */}
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                {tournamentContent?.offlineLeague?.description ||
                  content.homePage.offlineLeague.description}
              </p>
            </motion.div>

            {/* Prize / highlight cards - image-based layout like stat panels */}
            <div className="space-y-6">
              {/* Top row - 2 large image cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {offlineLeaguePrizes.slice(0, 2).map((prize, index) => (
                  <motion.div
                    key={prize.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      type: "spring",
                    }}
                    viewport={{ once: true }}
                    className="relative h-56 md:h-64 overflow-hidden shadow-2xl group"
                  >
                    {/* Background image */}
                    <img
                      src={prize.image}
                      alt={prize.imageAlt || prize.title}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Subtle overlay for readability (no gradient) */}
                    <div className="absolute inset-0 bg-black/40"></div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex items-center justify-between px-6 md:px-8">
                      <div className="max-w-[65%]">
                        <p className="text-xs md:text-sm font-semibold text-white/70 uppercase tracking-wide">
                          Top League Highlight
                        </p>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-white mt-2 leading-tight">
                          {prize.title}
                        </h3>
                        <p className="mt-3 text-sm md:text-base text-white/80 font-semibold">
                          Prize:&nbsp;
                          <span className="text-brandPink text-lg md:text-xl font-black">
                            {prize.prize}
                          </span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom row - 3 cards: small, big, small on large screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {offlineLeaguePrizes.slice(2).map((prize, index) => (
                  <motion.div
                    key={prize.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      type: "spring",
                    }}
                    viewport={{ once: true }}
                    className={`relative h-52 md:h-56 overflow-hidden shadow-2xl group ${
                      index === 1 ? "lg:col-span-2" : "lg:col-span-1"
                    }`}
                  >
                    {/* Background image */}
                    <img
                      src={prize.image}
                      alt={prize.imageAlt || prize.title}
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Subtle overlay for readability (no gradient) */}
                    <div className="absolute inset-0 bg-black/40"></div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-5">
                      <div>
                        <p className="text-[10px] md:text-xs font-semibold text-white/70 uppercase tracking-wide">
                          League Award
                        </p>
                        <h3 className="text-lg md:text-xl font-black text-white mt-1 leading-tight">
                          {prize.title}
                        </h3>
                      </div>
                      <div className="flex items-end justify-between">
                        <p className="text-sm md:text-base font-semibold text-white/80">
                          Prize
                          <br />
                          <span className="text-brandPink text-lg md:text-xl font-black">
                            {prize.prize}
                          </span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* News Section - Turbo News snake grid (4 rows with custom column spans) */}
        <Section className="bg-white py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6 md:mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-brandPink mb-2 uppercase tracking-wide">
                {content.homePage.newsSection.title}
              </h2>
            </motion.div>

            {/* News Grid with repeating pattern: [1,1,1,1], [2,2], [1,1,1,1], [2,2]... */}
            {/* On mobile, show limited items; on desktop show all */}
            <div className="block md:hidden">
              <NewsGrid items={latestNews} showAll={false} />
            </div>
            <div className="hidden md:block">
              <NewsGrid items={latestNews?.slice(0, 9)} showAll={true} />
            </div>
            <div className="text-center mt-8 md:mt-16">
              <StylishButton
                onClick={() => {
                  router.push("/news");
                }}
                size="lg"
                variant="secondary"
                className="text-sm md:text-base px-6 md:px-8 py-2 md:py-3"
              >
                View All News
              </StylishButton>
            </div>
          </div>
        </Section>

        {/* AI Platform Section */}
        <Section id="ai-platform" className="bg-brandBlue">
          <SectionTitle isWhiteBg={false}>
            {content.homePage.aiPlatform.title}
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 p-2 max-w-7xl mx-auto">
            {content.homePage.aiPlatform.items.map((item, index) => {
              const IconComponent = getIcon(item.icon);
              return (
                <AIPlatformCard
                  key={item.id}
                  item={item}
                  index={index}
                  icon={IconComponent}
                />
              );
            })}
          </div>
        </Section>

        {/* Latest Videos Section - IPL Style */}
        <Section id="highlights" className="bg-white">
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-brandPink uppercase tracking-wide">
                {content.homePage.latestVideos.title}
              </h2>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="bg-brandPink border-white/30 text-white hover:bg-[#CE357C] hover:border-[#CE357C] hover:text-white text-sm md:text-base px-4 md:px-6 font-semibold transition-all"
                >
                  {content.homePage.latestVideos.viewAllButton}
                </Button>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const container =
                        document.getElementById("videos-container");
                      if (container) {
                        container.scrollBy({ left: -320, behavior: "smooth" });
                      }
                    }}
                    className="p-2 rounded-full border border-black/30 text-black/50 hover:bg-[#CE357C] hover:border-[#CE357C] hover:text-white transition-all"
                    aria-label="Previous videos"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {
                      const container =
                        document.getElementById("videos-container");
                      if (container) {
                        container.scrollBy({ left: 320, behavior: "smooth" });
                      }
                    }}
                    className="p-2 rounded-full border border-black/30 text-black/50 hover:bg-[#CE357C] hover:border-[#CE357C] hover:text-white transition-all"
                    aria-label="Next videos"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Videos Carousel */}
            <div
              id="videos-container"
              className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {latestVideos.map((video, index) => (
                <VideoCard key={video.id} video={video} index={index} />
              ))}
            </div>
          </div>
        </Section>

        {/* Stats Section with blue-pink gradient background */}
        <Section
          id="stats"
          className="bg-gradient-to-r from-brandBlue via-brandBlue/70 to-brandPink"
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 rounded-3xl p-6 md:p-8">
              {content.homePage.stats.items.map((stat) => (
                <Counter
                  key={stat.id}
                  end={stat.end}
                  suffix={stat.suffix || ""}
                  title={stat.title}
                />
              ))}
            </div>
          </div>
        </Section>

        {/* <Section id="why-join" className="bg-white">
          <SectionTitle isWhiteBg={true}>
            {content.homePage.whyJoinTCL.title}
          </SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 p-2 max-w-7xl mx-auto">
            {content.homePage.whyJoinTCL.items.map((item, index) => {
              const IconComponent = getIcon(item.icon);
              return (
                <WhyJoinCard
                  key={item.id}
                  item={item}
                  index={index}
                  icon={IconComponent}
                />
              );
            })}
          </div>
        </Section> */}

        {/* Gallery Section */}

        <Section className="bg-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brandPink mb-4">
                {content.homePage.gallery.title}
              </h2>
            </motion.div>

            {/* Mobile: Show only first 6 images in a simple grid */}
            <div className="md:hidden grid grid-cols-2 gap-2">
              {galleryImages.slice(0, 6).map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100 flex flex-col h-fit"
                >
                  <div className="relative w-full overflow-hidden">
                    <img
                      src={image.image}
                      alt={image.alt}
                      className="w-full h-auto object-cover hover:scale-110 transition-transform duration-500"
                      style={{
                        height: "150px", // Smaller height on mobile
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop: Show all images in column layout */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-6 gap-2">
              {[1, 2, 3, 4, 5, 6].map((columnNum) => {
                const columnImages = galleryImages.filter(
                  (image) => image.column === columnNum
                );
                return (
                  <div key={columnNum} className="flex flex-col gap-2">
                    {columnImages.map((image, index) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100 flex flex-col h-fit"
                      >
                        <div className="relative w-full overflow-hidden">
                          <img
                            src={image.image}
                            alt={image.alt}
                            className="w-full h-auto object-cover hover:scale-110 transition-transform duration-500"
                            style={{
                              height:
                                image.height === "tall"
                                  ? "400px"
                                  : image.height === "medium"
                                  ? "300px"
                                  : "200px",
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                );
              })}
            </div>

            {/* View More Gallery Button */}
            <div className="text-center mt-8 md:mt-12">
              <StylishButton
                onClick={() => {
                  router.push("/gallery");
                }}
                size="lg"
                variant="secondary"
                className="text-sm md:text-base px-6 md:px-8 py-2 md:py-3"
              >
                View Full Gallery
              </StylishButton>
            </div>
          </div>
        </Section>

        {/* Why Choose Us Section - Parallelogram Design */}
        <Section
          id="why-choose-us"
          className="bg-brandBlue py-16 md:py-24 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
              {/* Left Column */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <p className="text-gray-400 text-lg md:text-xl font-semibold mb-4">
                  {content.homePage.whyChooseUs.leagueName}
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
                  {content.homePage.whyChooseUs.title}
                </h2>
                <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                  {content.homePage.whyChooseUs.description}
                </p>
              </motion.div>

              {/* Right Column - Features */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                viewport={{ once: true }}
                className="space-y-6 md:space-y-8"
              >
                {content.homePage.whyChooseUs.features.map((feature, index) => {
                  const IconComponent = getIcon(feature.icon);
                  return (
                    <WhyChooseUsCard
                      key={feature.id}
                      feature={feature}
                      index={index}
                      icon={IconComponent}
                    />
                  );
                })}
              </motion.div>
            </div>
          </div>

          {/* Parallelogram Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div
              className="absolute top-10 left-0 w-64 h-2 bg-blue-500/20"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 95% 100%, 0% 100%)",
              }}
            ></div>
            <div
              className="absolute bottom-10 right-0 w-64 h-2 bg-blue-500/20"
              style={{
                clipPath: "polygon(5% 0%, 100% 0%, 100% 100%, 0% 100%)",
              }}
            ></div>
          </div>
        </Section>

        {/* Testimonials Section */}
        <Section id="testimonials" className="bg-gray-100 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 mb-12">
              {/* Left Section - Title */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <p className="text-blue-600 font-semibold text-sm md:text-base mb-2 uppercase tracking-wide">
                    {content.homePage.testimonials.title}-
                  </p>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                    {content.homePage.testimonials.subtitle}
                  </h2>
                </motion.div>
              </div>

              {/* Right Section - Rating */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-start lg:items-end"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-5xl md:text-6xl font-bold text-gray-900">
                    {content.homePage.testimonials.rating.value}
                  </span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-6 h-6 md:w-7 md:h-7 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm md:text-base mb-1">
                  {content.homePage.testimonials.rating.totalRatings} Ratings
                </p>
                <p className="text-gray-500 text-xs md:text-sm mb-3">
                  {content.homePage.testimonials.rating.source}
                </p>
                <Link
                  href={content.homePage.testimonials.rating.seeAllLink}
                  className="text-blue-600 hover:text-blue-700 font-semibold text-sm md:text-base flex items-center gap-1"
                >
                  SEE ALL
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>

            {/* Testimonials Carousel */}
            <div className="relative">
              <div
                id="testimonials-container"
                className="flex items-center gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4 scroll-smooth snap-x snap-mandatory"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {testimonials.map((testimonial, index) => {
                  const isActive = index === currentTestimonialIndex;
                  return (
                    <motion.div
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`flex-shrink-0 w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] snap-center transition-all duration-500 ${
                        isActive
                          ? "scale-110 md:scale-105 lg:scale-110 z-10"
                          : "scale-100 opacity-90"
                      }`}
                      style={{
                        clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)",
                      }}
                    >
                      <div className="bg-white  p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                        {/* Decorative Quote Mark */}
                        <div className="absolute bottom-4 right-4 text-blue-200 text-8xl md:text-9xl font-serif leading-none opacity-30">
                          "
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-gray-700 text-sm md:text-base mb-6 flex-grow relative z-10">
                          "{testimonial.text}"
                        </p>

                        {/* Profile */}
                        <div className="flex items-center gap-3 relative z-10">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-gray-200"
                          />
                          <div>
                            <p className="font-bold text-gray-900 text-sm md:text-base">
                              {testimonial.name}
                            </p>
                            <p className="text-gray-600 text-xs md:text-sm">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4 mt-8">
                <button
                  onClick={() => handleTestimonialScroll("prev")}
                  className="p-3 rounded-full bg-white border-2 border-gray-300 text-gray-700 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all shadow-md"
                  aria-label="Previous testimonials"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleTestimonialScroll("next")}
                  className="p-3 rounded-full bg-white border-2 border-gray-300 text-gray-700 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all shadow-md"
                  aria-label="Next testimonials"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </Section>

        {/* <Section
          id="final-cta"
          className="relative py-20 md:py-32 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brandBlue via-brandBlue/90 to-brandBlue"></div>

          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500 rounded-full blur-3xl"></div>
          </div>

          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`,
              }}
            ></div>
          </div>

          <div className="max-w-5xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-block mb-6"
              >
                <span className="px-4 py-2 bg-[#CE357C]/20 border border-[#CE357C]/40 rounded-full text-[#CE357C] text-sm font-semibold uppercase tracking-wide">
                  Start Your Journey
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-tight"
              >
                <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  {content.homePage.finalCTA.title}
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
              >
                {content.homePage.finalCTA.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
              >
                <StylishButton
                  variant="secondary"
                  size="lg"
                  className="text-base md:text-lg px-8 md:px-12 py-6 md:py-8"
                  onClick={() => {
                    router.push("/register");
                  }}
                >
                  {content.homePage.finalCTA.primaryButton.text}
                </StylishButton>
                <Link href={content.homePage.finalCTA.secondaryButton.link}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base md:text-lg font-bold px-8 md:px-12 py-6 md:py-8 border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
                  >
                    {content.homePage.finalCTA.secondaryButton.text}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </Section> */}
      </main>
    </PageTransition>
  );
};

export default HomePage;
