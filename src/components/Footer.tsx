"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const socialLinks = [
    {
      href: "https://instagram.com",
      icon: <Instagram size={20} />,
      label: "Instagram",
    },
    {
      href: "https://youtube.com",
      icon: <Youtube size={20} />,
      label: "YouTube",
    },
    {
      href: "https://linkedin.com",
      icon: <Linkedin size={20} />,
      label: "LinkedIn",
    },
    {
      href: "https://wa.me",
      icon: <MessageCircle size={20} />,
      label: "WhatsApp",
    },
  ];

  return (
    <footer
      id="contact"
      className="bg-brandBlue py-16 relative overflow-hidden  border-t border-white/10"
    >
      {/* Background Cricket Image with Low Opacity and Blur */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://up.yimg.com/ib/th/id/OIP.O52xypuSEFLnKuW4DU5lHAHaE8?pid=Api&rs=1&c=1&qlt=95&w=151&h=100"
          alt="Cricket background"
          className="w-full h-full object-cover opacity-30 blur-md scale-110"
          onError={(e) => {
            // Fallback to a reliable cricket image if the provided one fails
            const target = e.target as HTMLImageElement;
            target.src =
              "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1920&h=1080&fit=crop";
          }}
        />
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-brandBlue via-brandBlue/90 to-brandBlue/80"></div>
      </div>

      {/* Decorative gradient blurs */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="https://horizons-cdn.hostinger.com/6572ccdf-9210-49a9-bd4d-3ced5c3b9150/7ebfd12edbfb9190c64bb8fcc9d3c77b.png"
                alt="Turbo Cricket League Logo"
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold neon-text-gradient">TCL</span>
            </div>
            <p className="text-white mb-4 text-sm">Turbo Cricket League</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-brandPink mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-white hover:text-[#CE357C] transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/journey"
                  className="text-white hover:text-[#CE357C] transition-colors text-sm"
                >
                  Player Journey
                </Link>
              </li>
              <li>
                <Link
                  href="/auction"
                  className="text-white hover:text-[#CE357C] transition-colors text-sm"
                >
                  Auction
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-white hover:text-[#CE357C] transition-colors text-sm"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-white hover:text-[#CE357C] transition-colors text-sm"
                >
                  News
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-brandPink mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#CE357C] flex-shrink-0" />
                <a
                  href="mailto:info@turbocricketleague.com"
                  className="text-white hover:text-[#CE357C] text-sm transition-colors"
                >
                  info@turbocricketleague.com
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-[#CE357C] flex-shrink-0 mt-1" />
                <p className="text-white text-sm">
                  A-116, Urbtech Trade centre, Sector 132, Noida
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-brandPink mb-4">Follow Us</h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#00D9FF] transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-xs">
              © 2025 Turbo Cricket League. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-white text-xs hover:text-white cursor-pointer transition-colors">
                Privacy Policy
              </span>
              <span className="text-white text-xs hover:text-white cursor-pointer transition-colors">
                Terms of Service
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
export default Footer;
