"use client";

import React from "react";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";

const MagicMomentCard = ({
  moment,
  index = 0,
  className = "",
  showShare = true,
  onClick,
  variant = "default", // "default" or "sidebar"
}) => {
  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: moment.title,
        text: moment.description || moment.title,
      });
    } else {
      navigator.clipboard.writeText(moment.title);
      alert("Title copied to clipboard!");
    }
  };

  const defaultImage =
    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=640&h=360&fit=crop";

  const isVideo = moment.type === "video";
  const imageUrl = moment.imageUrl || moment.thumbnail || defaultImage;
  const videoUrl = moment.videoUrl;

  const cardContent = (
    <div
      className={`bg-brandBlue rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border border-white/10 group ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      onClick={onClick}
    >
      {/* Media Container */}
      <div className="relative w-full aspect-video overflow-hidden bg-[rgba(30,40,60,0.5)]">
        {isVideo && videoUrl ? (
          <>
            {/* Video Thumbnail */}
            <img
              src={imageUrl}
              alt={moment.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.src = defaultImage;
              }}
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600 rounded-full flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity shadow-lg">
                <svg
                  className="w-6 h-6 md:w-8 md:h-8 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </>
        ) : (
          <img
            src={imageUrl}
            alt={moment.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = defaultImage;
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      {/* Content Info */}
      <div className={`${variant === "sidebar" ? "p-3" : "p-4"}`}>
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3
            className={`${
              variant === "sidebar" ? "text-sm" : "text-sm md:text-base"
            } font-bold text-white line-clamp-2 flex-1 transition-colors`}
          >
            {moment.title}
          </h3>
          {showShare && (
            <button
              onClick={handleShare}
              className="flex-shrink-0 p-1.5 hover:bg-white/10 rounded transition-colors"
              aria-label="Share"
            >
              <Share2 className="h-4 w-4 text-white/70 hover:text-[#CE357C] transition-colors" />
            </button>
          )}
        </div>
        {moment.description && variant === "sidebar" && (
          <p className="text-xs text-gray-400 line-clamp-2 mb-2">
            {moment.description}
          </p>
        )}
        <div className="flex items-center gap-3 text-xs md:text-sm text-gray-400">
          <span>{moment.date}</span>
        </div>
      </div>
    </div>
  );

  // Wrap in motion.div if index is provided (for animations)
  if (index !== undefined) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className={`flex-shrink-0 ${
          variant === "sidebar"
            ? "w-full"
            : "w-[280px] sm:w-[320px] md:w-[360px]"
        }`}
      >
        {cardContent}
      </motion.div>
    );
  }

  return (
    <div
      className={
        variant === "sidebar"
          ? "w-full"
          : "flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px]"
      }
    >
      {cardContent}
    </div>
  );
};

export default MagicMomentCard;
