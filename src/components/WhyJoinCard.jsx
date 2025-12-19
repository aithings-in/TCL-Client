"use client";

import React from "react";
import { motion } from "framer-motion";

const WhyJoinCard = ({
  item,
  index = 0,
  className = "",
  icon: IconComponent,
  onClick,
}) => {
  const cardContent = (
    <div
      className={`bg-brandBlue rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col h-full ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      onClick={onClick}
    >
      {/* Upper Graphic Section */}
      <div className="relative h-40 md:h-48 bg-gradient-to-br from-brandBlue via-brandBlue/90 to-brandBlue overflow-hidden flex-shrink-0">
        {/* Decorative Patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-4 w-20 h-20 rounded-full border-2 border-[#CE357C]/30"></div>
          <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full border-2 border-[#CE357C]/20"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-[#CE357C]/10"></div>
        </div>
        {/* Icon Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {IconComponent && (
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#CE357C]/20 border-2 border-[#CE357C]/40 flex items-center justify-center backdrop-blur-sm">
                <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-[#CE357C]" />
              </div>
            )}
            {/* Decorative streak effect */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-[#CE357C]/30 to-transparent rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
      {/* Lower Text Section */}
      <div className="p-5 md:p-6 bg-brandBlue flex flex-col flex-grow">
        <h3 className="text-lg md:text-xl font-bold text-white mb-2 leading-tight">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-sm md:text-base text-gray-300 leading-relaxed flex-grow">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );

  if (index !== undefined) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="h-full"
      >
        {cardContent}
      </motion.div>
    );
  }

  return <div className="h-full">{cardContent}</div>;
};

export default WhyJoinCard;

