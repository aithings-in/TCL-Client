"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  MessageCircle,
  Sun,
  Moon,
  Facebook,
  MessageCircleIcon,
} from "lucide-react";
import Link from "next/link";

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const SocialIcon = ({ href, icon, label }: SocialIconProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="text-brandBlue hover:text-blue-400 transition-colors p-1"
  >
    {icon}
  </motion.a>
);

const PreHeader = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: "light" | "dark") => {
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  // Social links - using the same as in Header
  const socialLinks = [
    {
      href: "https://facebook.com",
      icon: <Facebook size={14} className="sm:w-4 sm:h-4" />,
      label: "Facebook",
    },
    {
      href: "https://twitter.com",
      icon: <Twitter size={14} className="sm:w-4 sm:h-4" />,
      label: "Twitter",
    },
    {
      href: "https://instagram.com",
      icon: <Instagram size={14} className="sm:w-4 sm:h-4" />,
      label: "Instagram",
    },
    {
      href: "https://youtube.com",
      icon: <Youtube size={14} className="sm:w-4 sm:h-4" />,
      label: "YouTube",
    },
    {
      href: "https://wa.me",
      icon: <MessageCircle size={16} />,
      label: "WhatsApp",
    },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 bg-white text-brandBlue py-1.5 sm:py-2 px-2 sm:px-4 border-b border-white/10 z-[60]">
      {/* Desktop/Tablet Layout - Single Row */}
      <div className="hidden md:flex container mx-auto items-center justify-between gap-2">
        {/* Social Icons - Left */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {socialLinks.map((social) => (
            <SocialIcon key={social.label} {...social} />
          ))}
        </div>

        {/* Center Message */}
        <div className="flex items-center flex-1 min-w-0 justify-center px-2">
          <motion.p
            className="text-xs font-semibold text-center uppercase whitespace-nowrap overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            title="LAST DATE TO REGISTER: 12 DEC | FEES INCREASING SOON - REGISTER NOW"
          >
            <span className="font-bold text-brandBlue">
              LAST DATE TO REGISTER: 12 DEC |
              <span className="text-brandPink font-bold">
                <Link href="/register" className="mx-1 font-bold">
                  Register Now
                </Link>
              </span>
            </span>
          </motion.p>
        </div>

        {/* Theme Toggle - Right */}
        <div className="flex items-center flex-shrink-0">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Moon size={18} className="text-brandBlue" />
            ) : (
              <Sun size={18} className="text-brandBlue" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Layout - Two Rows */}
      <div className="md:hidden container mx-auto">
        {/* Top Row: Social Icons and Theme Toggle */}
        <div className="flex items-center justify-between gap-2 py-1">
          {/* Social Icons - Left */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {socialLinks.map((social) => (
              <SocialIcon key={social.label} {...social} />
            ))}
          </div>

          {/* Theme Toggle - Right */}
          <div className="flex items-center flex-shrink-0">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Moon size={16} className="text-brandBlue" />
              ) : (
                <Sun size={16} className="text-brandBlue" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Bottom Row: Message */}
        <div className="text-center py-0.5">
          <motion.p
            className="text-[8px] font-semibold uppercase whitespace-nowrap overflow-hidden text-ellipsis"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            title="LAST DATE TO REGISTER: 12 DEC | FEES INCREASING SOON - REGISTER NOW"
          >
            <span className="font-bold text-brandBlue">
              LAST DATE TO REGISTER: 12 DEC |
              <span>
                <Link href="/register" className="mx-1 text-brandPink">
                  Register Now
                </Link>
              </span>
            </span>
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default PreHeader;
