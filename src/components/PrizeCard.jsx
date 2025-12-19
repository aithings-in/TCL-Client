"use client";

import React from "react";
import { motion } from "framer-motion";

const PrizeCard = ({
  prize,
  index = 0,
  className = "",
  icon: IconComponent,
  onClick,
}) => {
  const cardContent = (
    <div
      className={`bg-white rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#CE357C]/10 flex items-center justify-center mb-4 md:mb-6 shadow-lg">
          {IconComponent && (
            <IconComponent className="w-10 h-10 md:w-12 md:h-12 text-[#CE357C]" />
          )}
        </div>
        <p className="text-sm md:text-base text-[#CE357C] font-bold mb-2 md:mb-3 uppercase tracking-wide">
          {prize.title}
        </p>
        <p className="text-lg md:text-xl lg:text-2xl font-black text-brandBlue leading-tight">
          {prize.prize}
        </p>
      </div>
    </div>
  );

  if (index !== undefined) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default PrizeCard;

