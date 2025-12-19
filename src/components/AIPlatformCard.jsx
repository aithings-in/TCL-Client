"use client";

import React from "react";
import { motion } from "framer-motion";

const AIPlatformCard = ({
  item,
  index = 0,
  className = "",
  icon: IconComponent,
  onClick,
}) => {
  const cardContent = (
    <div
      className={`bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 hover:shadow-xl hover:border-[#CE357C]/30 transition-all duration-300 ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {item.number && (
            <span className="text-4xl md:text-5xl font-black text-brandBlue">
              {item.number}
            </span>
          )}
          <div>
            <h3 className="text-lg md:text-xl font-bold text-brandPink leading-tight">
              {item.title}
            </h3>
          </div>
        </div>
      </div>

      {/* Icon/Logo Circle */}
      {IconComponent && (
        <div className="flex justify-center my-6 md:my-8">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#CE357C]/10 border-2 border-[#CE357C]/30 flex items-center justify-center">
            <IconComponent className="w-12 h-12 md:w-14 md:h-14 text-[#CE357C]" />
          </div>
        </div>
      )}

      {/* Description */}
      {item.description && (
        <div className="mt-6">
          <p className="text-sm md:text-base text-gray-600 leading-relaxed text-center">
            {item.description}
          </p>
        </div>
      )}
    </div>
  );

  if (index !== undefined) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default AIPlatformCard;
