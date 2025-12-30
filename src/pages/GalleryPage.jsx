"use client";

import React from "react";
import { motion } from "framer-motion";
import content from "@/data/content.json";
import galleryImages from "@/data/gallery.json";

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

const Section = ({ children, id, className = "" }) => (
  <section
    id={id}
    className={`py-16 md:py-24 relative overflow-hidden ${className}`}
  >
    <div>{children}</div>
  </section>
);

const GalleryPage = () => {
  return (
    <PageTransition>
      <div className="py-4 bg-white min-h-screen">
        <Section className="bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12 md:mb-16"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brandPink mb-4">
                {content.homePage.gallery.title || "Gallery"}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our collection of memorable moments and highlights
              </p>
            </motion.div>

            {/* Mobile: Show images in a 2-column grid */}
            <div className="md:hidden grid grid-cols-2 gap-3">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100 rounded-lg"
                >
                  <div className="relative w-full overflow-hidden">
                    <img
                      src={image.image}
                      alt={image.alt}
                      className="w-full h-auto object-cover hover:scale-110 transition-transform duration-500"
                      style={{
                        height: "200px",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Desktop: Show all images in column layout */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-6 gap-2">
              {[1, 2, 3, 4, 5, 6].map((columnNum) => {
                const columnImages = galleryImages.filter(
                  (image) => image.column === columnNum
                );
                return (
                  <div key={columnNum} className="flex flex-col gap-2">
                    {columnImages.map((image, index) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100 flex flex-col h-fit cursor-pointer group"
                      >
                        <div className="relative w-full overflow-hidden">
                          <img
                            src={image.image}
                            alt={image.alt}
                            className="w-full h-auto object-cover hover:scale-110 transition-transform duration-500"
                            style={{
                              height:
                                image.height === "tall"
                                  ? "400px"
                                  : image.height === "medium"
                                  ? "300px"
                                  : "200px",
                            }}
                          />
                          {/* Hover overlay */}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </Section>
      </div>
    </PageTransition>
  );
};

export default GalleryPage;
