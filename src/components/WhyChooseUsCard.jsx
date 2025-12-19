"use client";

import React from "react";
import { motion } from "framer-motion";

const WhyChooseUsCard = ({
  feature,
  index = 0,
  className = "",
  icon: IconComponent,
  onClick,
  clipPath = "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)",
}) => {
  const cardContent = (
    <div
      className={`relative group ${onClick ? "cursor-pointer" : ""} ${className}`}
      onClick={onClick}
    >
      {/* Parallelogram Background */}
      <div
        className="bg-white p-6 md:p-8 transform transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
        style={{ clipPath }}
      >
        <div className="flex items-start gap-4 md:gap-6">
          {/* Icon Circle */}
          {IconComponent && (
            <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-blue-500 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
              <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
          )}

          {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-brandBlue mb-3">
              {feature.title}
            </h3>
            {feature.description && (
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {feature.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  if (index !== undefined) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        viewport={{ once: true }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default WhyChooseUsCard;

