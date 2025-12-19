import React from "react";
import { motion } from "framer-motion";
import content from "@/data/content.json";
import NewsCard from "@/components/NewsCard";
import latestNews from "@/data/latestNews.json";
import { StylishButton } from "@/components/ui/stylish-button";
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
  const articles = content.newsPage.articles.map((article) => ({
    ...article,
    description: article.excerpt,
  }));

  const rowConfigs = [
    [1, 1, 1, 1],
    [2, 2],
    [1, 1, 2],
    [2, 2],
  ];

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

          <div className="max-w-7xl mx-auto px-4">
            <div className="space-y-6">
              {(() => {
                const rowConfigs = [
                  [1, 1, 1, 1], // 4 cards
                  [2, 2], // 2 wide cards
                  [1, 1, 2], // 3 cards
                  [2, 2], // 2 wide cards
                ];
                const maxItems = rowConfigs.flat().length;
                const items = latestNews.slice(0, maxItems);
                let newsIndex = 0;

                return rowConfigs.map((rowConfig, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                    {rowConfig.map((span, colIndex) => {
                      const news = items[newsIndex++];
                      if (!news) return null;

                      const spanClass =
                        span === 2
                          ? "lg:col-span-2"
                          : span === 3
                          ? "lg:col-span-3"
                          : "lg:col-span-1";

                      return (
                        <div
                          key={news.id ?? `${rowIndex}-${colIndex}`}
                          className={`${spanClass} h-full`}
                        >
                          <NewsCard news={news} index={newsIndex - 1} />
                        </div>
                      );
                    })}
                  </div>
                ));
              })()}
            </div>
          </div>
          <div className="text-center mt-16">
            <StylishButton size="lg" variant="secondary">
              Load More News
            </StylishButton>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default NewsPage;
