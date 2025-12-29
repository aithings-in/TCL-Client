import React from "react";
import { motion } from "framer-motion";
import content from "@/data/content.json";
import latestNews from "@/data/latestNews.json";
import NewsGrid from "@/components/NewsGrid";
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
    className="mb-6 md:mb-8 text-left"
  >
    <h1 className=" text-center text-2xl md:text-3xl font-bold text-brandPink mb-2 uppercase tracking-wide">
      {children}
    </h1>
    {description && <p className="text-center text-gray-600">{description}</p>}
  </motion.div>
);

const NewsPage = () => {
  const Section = ({ children, id, className = "" }) => (
    <section
      id={id}
      className={`py-16 md:py-24 relative overflow-hidden ${className}`}
    >
      <div>{children}</div>
    </section>
  );

  return (
    <PageTransition>
      <div className="pt-32 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle description={content.newsPage.description}>
            {content.newsPage.title}
          </SectionTitle>

          {/* Use NewsGrid component to display all news items */}
          <NewsGrid items={latestNews} showAll={true} />
        </div>
      </div>
    </PageTransition>
  );
};

export default NewsPage;
