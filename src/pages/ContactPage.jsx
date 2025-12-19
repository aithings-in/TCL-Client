import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { StylishButton } from "@/components/ui/stylish-button";
import { Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import content from "@/data/content.json";

// Icon mapping for dynamic icons
const iconMap = {
  Mail,
  MapPin,
};

const getIcon = (iconName) => {
  return iconMap[iconName] || Mail;
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
    <h1 className="text-5xl md:text-7xl font-black mb-4">
      <span className="text-brandPink">{children}</span>
    </h1>
    <p className="text-lg text-gray-600 max-w-3xl mx-auto">{description}</p>
  </motion.div>
);

const ContactInfo = ({ icon, title, value, href }) => (
  <motion.div
    className="flex items-start space-x-4"
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, type: "spring" }}
    viewport={{ once: true }}
  >
    <div className="w-12 h-12 rounded-full neon-gradient flex items-center justify-center text-brandPink neon-shadow flex-shrink-0">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-brandBlue">{title}</h4>
      <a href={href} className="text-brandPink transition-colors">
        {value}
      </a>
    </div>
  </motion.div>
);

const ContactPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: content.contactPage.form.successTitle,
        description: content.contactPage.form.successDescription,
      });
      e.target.reset();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <PageTransition>
      <div className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle description={content.contactPage.description}>
            {content.contactPage.title}
          </SectionTitle>

          <div className="grid lg:grid-cols-2 gap-12 items-start ">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
              className="bg-brandBlue p-8 rounded-lg"
            >
              <h2 className="text-3xl font-bold text-white mb-6">
                {content.contactPage.form.title}
              </h2>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    {content.contactPage.form.fields.name}
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-white/20 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">
                    {content.contactPage.form.fields.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-white/20 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">
                    {content.contactPage.form.fields.message}
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-white/20 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Your message..."
                    required
                  ></textarea>
                </div>
                <StylishButton
                  type="submit"
                  size="lg"
                  variant="secondary"
                  className="w-full h-14 text-lg font-bold"
                  disabled={isLoading}
                >
                  {content.contactPage.form.submitButton}
                </StylishButton>
              </form>
            </motion.div>

            <div className="space-y-8">
              <div className="space-y-6">
                {content.contactPage.contactInfo.map((info) => {
                  const IconComponent = getIcon(info.icon);
                  return (
                    <ContactInfo
                      key={info.id}
                      icon={<IconComponent size={24} />}
                      title={info.title}
                      value={info.value}
                      href={info.href}
                    />
                  );
                })}
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                viewport={{ once: true }}
                className="h-80 rounded-lg overflow-hidden neon-shadow"
              >
                <iframe
                  src={content.contactPage.map.src}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={content.contactPage.map.title}
                ></iframe>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ContactPage;
