import React from "react";
import { motion } from "framer-motion";

const AboutInfoCard = ({ icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
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

export default AboutInfoCard;
