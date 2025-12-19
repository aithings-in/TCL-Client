import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Hammer, DollarSign, Star, Tv } from "lucide-react";
import content from "@/data/content.json";

// Icon mapping for dynamic icons
const iconMap = {
  DollarSign,
  Hammer,
  Star,
  Tv,
};

const getIcon = (iconName) => {
  return iconMap[iconName] || Star;
};

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

const SectionTitle = ({ children, description }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, type: "spring" }}
    className="text-center mb-12 md:mb-20"
  >
    <h1 className="text-5xl md:text-7xl font-black mb-4 text-brandPink">
      {children}
    </h1>
    <p className="text-lg text-gray-700 max-w-3xl mx-auto">{description}</p>
  </motion.div>
);

const InfoCard = ({ icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, type: "spring" }}
    viewport={{ once: true }}
    className="group p-8 text-center h-full bg-white border border-gray-200 hover:bg-brandBlue hover:-translate-y-1 transition-all duration-300"
  >
    <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-brandPink/10 text-brandPink group-hover:bg-white group-hover:text-brandPink">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-brandBlue group-hover:text-brandPink mb-3">
      {title}
    </h3>
    <p className="text-gray-700 group-hover:text-white text-sm md:text-base leading-relaxed">
      {description}
    </p>
  </motion.div>
);

const CountdownUnit = ({ value, label }) => (
  <div className="text-center">
    <p className="text-5xl md:text-7xl font-black text-brandPink">
      {String(value).padStart(2, "0")}
    </p>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
);

const AuctionPage = () => {
  const calculateTimeLeft = () => {
    const difference =
      +new Date(content.auctionPage.countdown.targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <PageTransition>
      <div className="pt-32 pb-20 bg-white">
        <SectionTitle description={content.auctionPage.description}>
          {content.auctionPage.title}
        </SectionTitle>

        <motion.div
          className="max-w-3xl mx-auto mb-24 bg-brandBlue rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            {content.auctionPage.countdown.title}
          </h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-5xl md:text-7xl font-black text-white">
                {String(timeLeft.days || 0).padStart(2, "0")}
              </p>
              <p className="text-sm text-gray-200">Days</p>
            </div>
            <div className="text-center">
              <p className="text-5xl md:text-7xl font-black text-white">
                {String(timeLeft.hours || 0).padStart(2, "0")}
              </p>
              <p className="text-sm text-gray-200">Hours</p>
            </div>
            <div className="text-center">
              <p className="text-5xl md:text-7xl font-black text-white">
                {String(timeLeft.minutes || 0).padStart(2, "0")}
              </p>
              <p className="text-sm text-gray-200">Minutes</p>
            </div>
            <div className="text-center">
              <p className="text-5xl md:text-7xl font-black text-white">
                {String(timeLeft.seconds || 0).padStart(2, "0")}
              </p>
              <p className="text-sm text-gray-200">Seconds</p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {content.auctionPage.infoCards.map((card, index) => {
            const IconComponent = getIcon(card.icon);
            return (
              <InfoCard
                key={card.id}
                icon={<IconComponent size={40} />}
                title={card.title}
                description={card.description}
                delay={index * 0.1}
              />
            );
          })}
        </div>

        <div className="text-center mb-24 bg-brandBlue p-8 md:p-12">
          <h2 className="text-4xl font-bold mb-12 text-white">
            {content.auctionPage.whatYouWin.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {content.auctionPage.whatYouWin.items.map((item, index) => {
              const IconComponent = getIcon(item.icon);
              return (
                <InfoCard
                  key={item.id}
                  icon={<IconComponent size={40} />}
                  title={item.title}
                  description={item.description}
                  delay={index * 0.2}
                />
              );
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AuctionPage;
