"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Twitter,
  Youtube,
  MessageCircle,
  Facebook,
} from "lucide-react";
import Link from "next/link";
import { useLeagueType } from "@/hooks/useLeagueType";

interface SocialIconProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export const SocialIcon = ({ href, icon, label }: SocialIconProps) => (
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
  // const [theme, setTheme] = useState<"light" | "dark">("dark");

  // useEffect(() => {
  //   // Check for saved theme preference or default to dark
  //   const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
  //   const prefersDark = window.matchMedia(
  //     "(prefers-color-scheme: dark)"
  //   ).matches;
  //   const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
  //   setTheme(initialTheme);
  //   applyTheme(initialTheme);
  // }, []);

  // const applyTheme = (newTheme: "light" | "dark") => {
  //   if (newTheme === "dark") {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // };

  // const toggleTheme = () => {
  //   const newTheme = theme === "dark" ? "light" : "dark";
  //   setTheme(newTheme);
  //   localStorage.setItem("theme", newTheme);
  //   applyTheme(newTheme);
  // };
  const { leagueType, toggleLeagueType } = useLeagueType();

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
    <div className="fixed top-0 left-0 right-0 bg-white text-brandBlue py-1 px-2 sm:px-4 border-b border-white/10 z-[60]">
      {/* Desktop/Tablet Layout - Single Row */}
      <div className="hidden md:flex container mx-auto items-center justify-between gap-2">
        {/* Social Icons - Left */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {socialLinks.map((social) => (
            <SocialIcon key={social.label} {...social} />
          ))}
        </div>

        {/* Center Message */}
        <div className="flex items-center flex-1 min-w-0 justify-center px-2 py-3">
          <motion.p
            className="text-xs font-semibold text-center uppercase whitespace-nowrap overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            title="LAST DATE TO REGISTER: 15 FEB | FEES INCREASING SOON - REGISTER NOW"
          >
            <span className="font-bold text-brandBlue">
              LAST DATE TO REGISTER: 15 FEB |
              <span className="text-brandPink font-bold">
                <Link href="/register" className="mx-1 font-bold">
                  Register Now
                </Link>
              </span>
            </span>
          </motion.p>
        </div>

        {/* League Type Toggle - Right */}
        <div className="flex items-center flex-shrink-0 gap-2">
          <span
            className={`${
              leagueType === "T20" ? "text-[10px]" : "text-[14px]"
            } font-semibold text-brandBlue uppercase`}
          >
            T10
          </span>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleLeagueType();
            }}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
              leagueType === "T20" ? "bg-brandBlue" : "bg-brandPink"
            }`}
            aria-label="Toggle league type"
            role="switch"
            aria-checked={leagueType === "T20"}
            type="button"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                leagueType === "T20" ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
          <span
            className={`${
              leagueType === "T20" ? "text-[14px]" : "text-[10px]"
            } font-semibold text-brandBlue uppercase`}
          >
            T20
          </span>
        </div>
      </div>

      {/* Mobile Layout - Two Rows */}
      <div className="md:hidden container mx-auto">
        <div className="text-center py-2">
          <motion.div
            className="text-[8px] font-semibold uppercase whitespace-nowrap overflow-hidden text-ellipsis mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            title="LAST DATE TO REGISTER: 15 FEB | FEES INCREASING SOON - REGISTER NOW"
          >
            <div className="flex items-center justify-center gap-4">
              <span className="font-bold text-brandBlue">
                LAST DATE TO REGISTER: 15 FEB |
              </span>
              {/* League Type Toggle - Right */}
              <div className="flex items-center flex-shrink-0 gap-1.5">
                <span
                  className={`${
                    leagueType === "T20" ? "text-[9px]" : "text-[14px]"
                  } font-semibold text-brandBlue uppercase`}
                >
                  T10
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleLeagueType();
                  }}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                    leagueType === "T20" ? "bg-brandBlue" : "bg-brandPink"
                  }`}
                  aria-label="Toggle league type"
                  role="switch"
                  aria-checked={leagueType === "T20"}
                  type="button"
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                      leagueType === "T20" ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
                <span
                  className={`${
                    leagueType === "T20" ? "text-[14px]" : "text-[9px]"
                  } font-semibold text-brandBlue uppercase`}
                >
                  T20
                </span>
              </div>
            </div>
          </motion.div>
          {/* Highlighted Register Now Button for Mobile/Tablet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <Link href="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-brandPink text-white font-bold text-[10px] sm:text-xs px-4 py-1.5 sm:px-6 sm:py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 uppercase tracking-wide border-2 border-brandPink hover:border-pink-400"
              >
                Register Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PreHeader;
