"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Facebook,
  Instagram,
  Menu,
  MessageCircle,
  Twitter,
  X,
  Youtube,
} from "lucide-react";
import { StylishButton } from "@/components/ui/stylish-button";
import { SocialIcon } from "./PreHeader";

let Link: typeof import("next/link").default;
let usePathname: typeof import("next/navigation").usePathname;

try {
  Link = require("next/link").default;
  usePathname = require("next/navigation").usePathname;
} catch (err) {
  // fallback for environments where next/link or next/navigation are not available
  Link = ((props: any) => <a {...props} />) as any;
  usePathname = () => "/";
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Player Journey", href: "/journey" },
    { label: "Auction", href: "/auction" },
    { label: "Careers", href: "/careers" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      href: "https://facebook.com",
      icon: <Facebook color="white" size={14} className="sm:w-4 sm:h-4" />,
      label: "Facebook",
    },
    {
      href: "https://twitter.com",
      icon: <Twitter color="white" size={14} className="sm:w-4 sm:h-4" />,
      label: "Twitter",
    },
    {
      href: "https://instagram.com",
      icon: <Instagram color="white" size={14} className="sm:w-4 sm:h-4" />,
      label: "Instagram",
    },
    {
      href: "https://youtube.com",
      icon: <Youtube color="white" size={14} className="sm:w-4 sm:h-4" />,
      label: "YouTube",
    },
    {
      href: "https://wa.me",
      icon: <MessageCircle color="white" size={16} />,
      label: "WhatsApp",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "scroll";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed right-0 left-0 top-[90px] sm:top-[90px] md:top-[48px] w-full z-50 transition-all duration-300 bg-brandBlue/95 shadow-lg backdrop-blur-sm"
    >
      <nav className="container mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 cursor-pointer flex-shrink-0"
          >
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src="https://horizons-cdn.hostinger.com/6572ccdf-9210-49a9-bd4d-3ced5c3b9150/7ebfd12edbfb9190c64bb8fcc9d3c77b.png"
                alt="TCL Logo"
                className="h-8 sm:h-10 md:h-12 w-auto"
                style={{
                  filter: "drop-shadow(0 0 5px rgba(168, 85, 247, 0.7))",
                }}
              />
              <span className="text-base sm:text-lg font-black neon-text-gradient hidden md:block">
                Turbo Cricket League
              </span>
            </motion.div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white hover:text-blue-400 transition-colors font-semibold text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/register">
              <StylishButton variant="secondary" size="sm" className="text-sm">
                Register
              </StylishButton>
            </Link>
          </div>

          <button
            className="lg:hidden text-white p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 sm:h-7 sm:w-7" />
            ) : (
              <Menu className="h-6 w-6 sm:h-7 sm:w-7" />
            )}
          </button>
        </div>

        {/* Full Screen Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Full Screen Menu */}
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed inset-0 bg-brandBlue z-50 lg:hidden flex flex-col h-screen"
              >
                {/* Header with Close Button - Navy Blue Background */}
                <div className="bg-brandBlue flex justify-end items-center p-2 sm:p-3 flex-shrink-0">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white p-1 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6 sm:h-7 sm:w-7" />
                  </button>
                </div>

                {/* Menu Items */}
                <div className="bg-brandBlue px-6 space-y-6 h-screen overflow-y-auto">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-xl sm:text-lg font-bold text-white hover:text-[#CE357C] transition-colors text-center py-1 uppercase tracking-wide"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}

                  {/* Register Button in Mobile Menu */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.1, duration: 0.3 }}
                    className="mt-8 w-full max-w-xs mx-auto"
                  >
                    <Link
                      href="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block"
                    >
                      <StylishButton
                        variant="secondary"
                        size="lg"
                        className="w-full text-base sm:text-lg md:text-xl"
                      >
                        REGISTER
                      </StylishButton>
                    </Link>
                  </motion.div>
                  {/* Social Icons - Left */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.1, duration: 0.3 }}
                    className="mt-8 w-full max-w-xs mx-auto"
                  >
                    <div className="flex items-center justify-center gap-3 flex-shrink-0">
                      {socialLinks.map((social) => (
                        <SocialIcon key={social.label} {...social} />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
