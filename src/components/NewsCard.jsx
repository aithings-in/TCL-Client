"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const NewsCard = ({
  news,
  index = 0,
  className = "",
  onClick,
  variant = "default", // "default" or "compact"
  showReadMore = true,
}) => {
  const defaultImage =
    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=640&h=360&fit=crop";

  const cardContent = (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100 flex flex-col h-full ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden">
        <img
          src={news.image || defaultImage}
          alt={news.imageAlt || news.title}
          className="w-full h-auto object-cover hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = defaultImage;
          }}
        />
      </div>

      {/* Content Info */}
      <div
        className={`${
          variant === "compact" ? "p-3" : "p-4 md:p-6"
        } flex flex-col flex-1`}
      >
        <h3
          className={`${
            variant === "compact"
              ? "text-base"
              : "text-lg md:text-xl"
          } font-bold text-brandBlue mb-2 md:mb-3`}
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {news.title}
        </h3>
        {news.description && (
          <p
            className={`${
              variant === "compact" ? "text-xs" : "text-sm md:text-base"
            } text-gray-600 mb-3 md:mb-4`}
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 4,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {news.description}
          </p>
        )}
        {/* Footer pinned to bottom */}
        <div className="mt-auto pt-2 flex items-center justify-between border-t border-gray-100">
          <span
            className={`${
              variant === "compact" ? "text-xs" : "text-xs md:text-sm"
            } text-gray-500`}
          >
            {news.date}
          </span>
          {showReadMore && news.readMoreLink && (
            <Link
              href={news.readMoreLink}
              className="text-[#CE357C] font-semibold text-sm md:text-base hover:text-[#CE357C]/80 transition-colors flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              Read More
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  // Wrap in motion.div if index is provided (for animations)
  if (index !== undefined) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="w-full h-full"
      >
        {cardContent}
      </motion.div>
    );
  }

  return <div className="w-full">{cardContent}</div>;
};

export default NewsCard;

