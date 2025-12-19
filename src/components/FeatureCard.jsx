"use client";

import React from "react";
import { motion } from "framer-motion";

const FeatureCard = ({
  feature,
  index = 0,
  className = "",
  icon: IconComponent,
  onClick,
  variant = "default", // "default", "glass", "outlined"
  iconColor = "#CE357C",
  iconBgColor = "bg-[#CE357C]/10",
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "glass":
        return "glass-effect rounded-lg neon-shadow";
      case "outlined":
        return "bg-transparent border-2 border-white/20 rounded-lg";
      default:
        return "bg-white rounded-xl shadow-md hover:shadow-lg";
    }
  };

  const cardContent = (
    <div
      className={`${getVariantClasses()} p-6 transition-all duration-300 ${
        onClick ? "cursor-pointer hover:scale-105" : ""
      } ${className}`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center">
        {IconComponent && (
          <div
            className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${iconBgColor} flex items-center justify-center mb-4`}
          >
            <IconComponent
              className="w-8 h-8 md:w-10 md:h-10"
              style={{ color: iconColor }}
            />
          </div>
        )}
        <h3 className="text-lg md:text-xl font-bold mb-2">{feature.title}</h3>
        {feature.description && (
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            {feature.description}
          </p>
        )}
      </div>
    </div>
  );

  if (index !== undefined) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
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

export default FeatureCard;

