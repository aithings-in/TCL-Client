import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FileText,
  Map,
  Dumbbell,
  ClipboardList,
  Trophy,
  DollarSign,
  Users,
  GitBranch,
  Star,
} from "lucide-react";
import content from "@/data/content.json";
import { StylishButton } from "@/components/ui/stylish-button";

// Icon mapping for dynamic icons
const iconMap = {
  FileText,
  Map,
  Dumbbell,
  ClipboardList,
  Trophy,
  DollarSign,
  Users,
  GitBranch,
  Star,
};

const getIcon = (iconName) => {
  return iconMap[iconName] || FileText;
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

const SectionTitle = ({ children, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, type: "spring" }}
    className="text-center mb-12 md:mb-20"
  >
    <h1 className="text-5xl md:text-7xl font-black mb-4 text-brandPink">
      {children}
    </h1>
    {subtitle && (
      <p className="text-lg text-gray-700 max-w-3xl mx-auto">{subtitle}</p>
    )}
  </motion.div>
);

const JourneyStep = ({ icon, title, description, delay, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, type: "spring" }}
    viewport={{ once: true }}
    className="relative flex items-start"
  >
    <div className="flex flex-col items-center mr-6">
      <div className="w-20 h-20 rounded-full bg-brandPink flex items-center justify-center text-white z-10 flex-shrink-0">
        {icon}
      </div>
      <div className="w-1 h-full bg-brandPink/30 mt-2"></div>
    </div>
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex-1">
      <h3 className="text-3xl font-bold text-brandBlue mb-3">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      {children}
    </div>
  </motion.div>
);

const PlayerJourneyPage = () => {
  return (
    <PageTransition>
      <div className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle subtitle={content.playerJourneyPage.subtitle}>
            {content.playerJourneyPage.title}
          </SectionTitle>

          <div className="space-y-12 max-w-4xl mx-auto">
            {content.playerJourneyPage.steps.map((step, index) => {
              const IconComponent = getIcon(step.icon);
              return (
                <JourneyStep
                  key={step.id}
                  icon={<IconComponent size={40} />}
                  title={step.title}
                  description={step.description}
                  delay={(index + 1) * 0.1}
                >
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem
                      value={`item-${step.id}`}
                      className="rounded-lg"
                    >
                      <AccordionTrigger className="text-brandBlue hover:no-underline">
                        {step.accordion.trigger}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700">
                        {step.accordion.items ? (
                          Array.isArray(step.accordion.items) ? (
                            <ul className="space-y-3 text-gray-700">
                              {step.accordion.items.map((item, idx) => {
                                if (typeof item === "string") {
                                  const isHighlight = item.includes("Top");
                                  return (
                                    <li
                                      key={idx}
                                      className={
                                        isHighlight
                                          ? "mt-4 font-semibold text-brandPink"
                                          : "list-disc list-inside"
                                      }
                                    >
                                      {item}
                                    </li>
                                  );
                                }
                                const ItemIcon = getIcon(item.icon);
                                return (
                                  <li key={idx} className="flex items-center">
                                    <ItemIcon
                                      className={`h-5 w-5 text-${item.iconColor} mr-3`}
                                    />
                                    <strong className="text-brandBlue">
                                      {item.label}
                                    </strong>{" "}
                                    <span className="text-gray-700">
                                      {item.value}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          ) : null
                        ) : step.accordion.content ? (
                          typeof step.accordion.content === "string" ? (
                            <p className="text-gray-700">
                              {step.accordion.content}
                            </p>
                          ) : Array.isArray(step.accordion.content) ? (
                            <div className="space-y-3 text-gray-700">
                              {step.accordion.content.map((item, idx) => (
                                <p key={idx}>
                                  {item.highlight ? (
                                    <span className="mt-4 font-semibold text-brandPink">
                                      {item.highlight}
                                    </span>
                                  ) : (
                                    <>
                                      <strong className="text-brandBlue">
                                        {item.label}
                                      </strong>{" "}
                                      <span className="text-gray-700">
                                        {item.value}
                                      </span>
                                    </>
                                  )}
                                </p>
                              ))}
                            </div>
                          ) : null
                        ) : null}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </JourneyStep>
              );
            })}
          </div>

          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-4 text-brandBlue">
              {content.playerJourneyPage.cta.title}
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              {content.playerJourneyPage.cta.description}
            </p>
            <Link href={"/register"}>
              <StylishButton variant="secondary" size="lg">
                {content.playerJourneyPage.cta.buttonText}
              </StylishButton>
            </Link>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default PlayerJourneyPage;
