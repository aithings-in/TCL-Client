import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  ShieldCheck,
  TrendingUp,
  Award,
  UserCheck,
} from "lucide-react";
import content from "@/data/content.json";
import AboutInfoCard from "@/components/AboutInfoCard";

// Icon mapping for dynamic icons
const iconMap = {
  Eye,
  Target,
  ShieldCheck,
  Award,
  UserCheck,
  TrendingUp,
};

const getIcon = (iconName) => {
  return iconMap[iconName] || Award;
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

const SectionTitle = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, type: "spring" }}
    viewport={{ once: true }}
    className="text-center mb-12 md:mb-16"
  >
    <h1 className="text-4xl md:text-6xl font-black mb-4 text-brandPink">
      {children}
    </h1>
  </motion.div>
);

const TimelineItem = ({ year, title, description, delay }) => (
  <motion.div
    className="relative pl-8"
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay, type: "spring" }}
    viewport={{ once: true }}
  >
    <div className="absolute left-0 top-1 h-full w-0.5 bg-brandPink/70"></div>
    <div className="absolute left-[-9px] top-1 w-5 h-5 rounded-full bg-brandPink border-4 border-white"></div>
    <p className="text-brandPink font-semibold mb-1">{year}</p>
    <h4 className="text-xl font-bold text-brandBlue mb-2">{title}</h4>
    <p className="text-gray-700">{description}</p>
  </motion.div>
);

const AboutPage = () => {
  return (
    <PageTransition>
      <div className="pt-32 pb-20 bg-white">
        <SectionTitle>{content.aboutPage.title}</SectionTitle>

        <div className="">
          {/* Section 1: Our Story - two equal columns, left blue, right white */}
          <div className="grid md:grid-cols-2 gap-0 mb-24 overflow-hidden ">
            {/* Left column - blue */}
            <div className="bg-brandBlue text-white flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                viewport={{ once: true }}
                className="p-8 md:p-10 lg:p-12"
              >
                <h2 className="text-4xl font-bold mb-4">
                  {content.aboutPage.ourStory.title}
                </h2>
                <p className="text-gray-100 text-lg leading-relaxed">
                  {content.aboutPage.ourStory.description}
                </p>
              </motion.div>
            </div>

            {/* Right column - white with image */}
            <div className="bg-white flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                viewport={{ once: true }}
                className="p-6 md:p-8 lg:p-10"
              >
                <img
                  className="w-full h-auto object-cover"
                  alt={content.aboutPage.ourStory.imageAlt}
                  src={content.aboutPage.ourStory.image}
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>

          {/* Section 2: Vision & Mission */}
          <section className="mb-24">
            <div className="grid md:grid-cols-2 gap-8">
              {content.aboutPage.visionMission.map((item, index) => {
                const IconComponent = getIcon(item.icon);
                return (
                  <AboutInfoCard
                    key={item.id}
                    icon={<IconComponent size={40} />}
                    title={item.title}
                    description={item.description}
                    delay={index * 0.2}
                  />
                );
              })}
            </div>
          </section>

          {/* Section 3: Core Values */}
          <section className="mb-24">
            <h2 className="text-4xl font-bold text-center mb-16 text-brandBlue">
              {content.aboutPage.coreValues.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.aboutPage.coreValues.items.map((item, index) => {
                const IconComponent = getIcon(item.icon);
                return (
                  <AboutInfoCard
                    key={item.id}
                    icon={<IconComponent size={40} />}
                    title={item.title}
                    description={item.description}
                    delay={index * 0.1}
                  />
                );
              })}
            </div>
          </section>

          {/* Section 4: Journey Timeline */}
          <section className="mt-8 px-1 md:px-4">
            <h2 className="text-4xl font-bold text-center mb-16 text-brandPink">
              {content.aboutPage.journey.title}
            </h2>
            <div className="max-w-2xl mx-auto space-y-12">
              {content.aboutPage.journey.timeline.map((item, index) => (
                <TimelineItem
                  key={item.year}
                  year={item.year}
                  title={item.title}
                  description={item.description}
                  delay={(index + 1) * 0.1}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default AboutPage;
