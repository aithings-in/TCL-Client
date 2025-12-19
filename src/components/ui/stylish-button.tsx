"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StylishButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    | "onAnimationStart"
    | "onAnimationEnd"
    | "onDrag"
    | "onDragEnd"
    | "onDragStart"
  > {
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
}

const StylishButton = React.forwardRef<HTMLButtonElement, StylishButtonProps>(
  (
    {
      icon: Icon,
      iconPosition = "left",
      variant = "primary",
      size = "md",
      children,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-bold text-white overflow-hidden transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    const variantStyles = {
      // Blue variant (uses Tailwind brandBlue)
      primary:
        "bg-gradient-to-r from-brandBlue via-brandBlue to-brandBlue hover:from-brandBlue hover:via-brandBlue/90 hover:to-brandBlue shadow-lg shadow-brandBlue/30 hover:shadow-xl hover:shadow-brandBlue/50",
      // Pink variant (uses Tailwind brandPink)
      secondary:
        "bg-gradient-to-r from-brandPink via-brandPink to-brandPink hover:from-brandPink hover:via-brandPink/90 hover:to-brandPink shadow-lg shadow-brandPink/30 hover:shadow-xl hover:shadow-brandPink/50",
    } as const;

    const sizeStyles = {
      sm: "h-9 px-4 text-sm gap-2",
      md: "h-12 px-6 text-base gap-2.5",
      lg: "h-14 px-8 text-lg gap-3",
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        style={{
          clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {/* Animated background gradient overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2.5">
          {Icon && iconPosition === "left" && (
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </motion.div>
          )}
          <span className="whitespace-nowrap">{children}</span>
          {Icon && iconPosition === "right" && (
            <motion.div
              whileHover={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </motion.div>
          )}
        </span>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
          }}
        />
      </motion.button>
    );
  }
);

StylishButton.displayName = "StylishButton";

export { StylishButton };
