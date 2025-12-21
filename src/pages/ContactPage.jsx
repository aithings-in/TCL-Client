import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { StylishButton } from "@/components/ui/stylish-button";
import { Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import content from "@/data/content.json";
import { leadApi } from "@/lib/api.service";

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
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Frontend validation
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value || value.trim().length === 0) {
          error = "Name is required";
        }
        break;
      case "email":
        if (!value || value.trim().length === 0) {
          error = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "message":
        if (!value || value.trim().length === 0) {
          error = "Message is required";
        } else if (value.trim().length < 10) {
          error = "Message must be at least 10 characters";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = (formData) => {
    const name = formData.get("name")?.toString().trim() || "";
    const email = formData.get("email")?.toString().trim() || "";
    const message = formData.get("message")?.toString().trim() || "";

    const newErrors = {
      name: validateField("name", name),
      email: validateField("email", email),
      message: validateField("message", message),
    };

    setErrors(newErrors);

    // Check if form is valid
    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target);
      const leadData = {
        name: formData.get("name")?.toString().trim() || "",
        email: formData.get("email")?.toString().trim() || "",
        message: formData.get("message")?.toString().trim() || "",
      };

      // Frontend validation
      const isValid = validateForm(formData);
      if (!isValid) {
        // Get the first error to show in toast
        const validationErrors = {
          name: validateField("name", leadData.name),
          email: validateField("email", leadData.email),
          message: validateField("message", leadData.message),
        };
        const firstError = Object.values(validationErrors).find((err) => err) || 
          "Please fix the errors in the form";
        toast({
          title: "Validation Error",
          description: firstError,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Submit lead via API
      const response = await leadApi.create({
        name: leadData.name,
        email: leadData.email,
        message: leadData.message,
      });

      if (response.success) {
        toast({
          title: content.contactPage.form.successTitle,
          description:
            response.message || content.contactPage.form.successDescription,
        });
        e.target.reset();
        setErrors({ name: "", email: "", message: "" });
      } else {
        // Show validation error from API (first error if multiple)
        const errorMessage = response.message || 
          "Could not submit your message. Please try again.";
        
        toast({
          title: "Submission Failed",
          description: errorMessage,
          variant: "destructive",
        });

        // If there are field-specific errors, update the error state
        if (response.errors && Array.isArray(response.errors)) {
          const newErrors = { name: "", email: "", message: "" };
          response.errors.forEach((err) => {
            if (err.toLowerCase().includes("name")) {
              newErrors.name = err;
            } else if (err.toLowerCase().includes("email")) {
              newErrors.email = err;
            } else if (err.toLowerCase().includes("message")) {
              newErrors.message = err;
            }
          });
          setErrors(newErrors);
        }
      }
    } catch (error) {
      toast({
        title: "Submission Error",
        description: error.message || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white border text-black placeholder-gray-400 focus:outline-none focus:ring-2 ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/20 focus:ring-purple-500"
                    }`}
                    placeholder="Enter your name"
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-200">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">
                    {content.contactPage.form.fields.email}
                  </label>
                  <input
                    type="email"
                    name="email"
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white border text-black placeholder-gray-400 focus:outline-none focus:ring-2 ${
                      errors.email
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/20 focus:ring-purple-500"
                    }`}
                    placeholder="Enter your email"
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-200">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">
                    {content.contactPage.form.fields.message}
                    <span className="text-sm font-normal text-white/70 ml-2">
                      (Minimum 10 characters)
                    </span>
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg bg-white border text-black placeholder-gray-400 focus:outline-none focus:ring-2 ${
                      errors.message
                        ? "border-red-500 focus:ring-red-500"
                        : "border-white/20 focus:ring-purple-500"
                    }`}
                    placeholder="Your message..."
                    required
                    minLength={10}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-200">
                      {errors.message}
                    </p>
                  )}
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
