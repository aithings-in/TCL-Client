"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { getYouTubeVideoId, getVideoThumbnail } from "@/utils/youtube";

const VideoCard = ({
  video,
  index = 0,
  className = "",
  showShare = true,
  onClick,
  variant = "default", // "default" or "sidebar"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoId = getYouTubeVideoId(video.videoUrl);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&loop=0&mute=0&playsinline=1&enablejsapi=1`
    : null;

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: video.title,
        url: video.videoUrl,
      });
    } else {
      navigator.clipboard.writeText(video.videoUrl);
      alert("Link copied to clipboard!");
    }
  };

  const cardContent = (
    <div
      className={`ipl-card rounded-lg overflow-hidden group ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Video Thumbnail/Player */}
      <div className="relative w-full aspect-video overflow-hidden bg-[rgba(30,40,60,0.5)]">
        {isHovered && embedUrl ? (
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            frameBorder="0"
            title={video.title}
          />
        ) : (
          <>
            <img
              src={getVideoThumbnail(video)}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-500"
              onError={(e) => {
                // Fallback to hqdefault if maxresdefault fails, then to default image
                const fallbackVideoId = getYouTubeVideoId(video.videoUrl);
                if (fallbackVideoId && e.target.src.includes("maxresdefault")) {
                  e.target.src = `https://img.youtube.com/vi/${fallbackVideoId}/hqdefault.jpg`;
                } else {
                  e.target.src =
                    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=640&h=360&fit=crop";
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#CE357C]/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 shadow-lg shadow-[#CE357C]/50">
                <svg
                  className="w-7 h-7 md:w-8 md:h-8 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Video Info */}
      <div className={`p-4 bg-brandBlue`}>
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3
            className={`${
              variant === "sidebar" ? "text-sm" : "text-sm md:text-base"
            } font-bold text-white line-clamp-2 flex-1  transition-colors`}
          >
            {video.title}
          </h3>
          {showShare && (
            <button
              onClick={handleShare}
              className="flex-shrink-0 p-1.5 hover:bg-white/10 rounded transition-colors"
              aria-label="Share video"
            >
              <Share2 className="h-4 w-4 text-white/70 hover:text-[#CE357C] transition-colors" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs md:text-sm text-gray-400">
          <span>{video.date}</span>
          {video.views && (
            <>
              <span className="text-white/30">•</span>
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {video.views}
              </span>
            </>
          )}
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

export default VideoCard;
