"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { StylishButton } from "@/components/ui/stylish-button";

const RegistrationForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mobile: "",
    email: "",
    district: "",
    state: "",
    role: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requiredFields = [
      "name",
      "age",
      "mobile",
      "email",
      "district",
      "state",
      "role",
    ];
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast({
          title: "Incomplete Form",
          description: "Please fill all required fields before proceeding.",
          variant: "destructive",
        });
        return;
      }
    }

    setIsLoading(true);

    // Store in localStorage for demo purposes (replace with API call in production)
    try {
      // Check if email already exists in localStorage
      const existingRegistrations = JSON.parse(
        localStorage.getItem("tcl_registrations") || "[]"
      );

      const emailExists = existingRegistrations.some(
        (reg: { email: string }) => reg.email === formData.email
      );

      if (emailExists) {
        toast({
          title: "Email Already Registered",
          description:
            "This email address has already been registered. Please use a different email address.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Save registration to localStorage
      const newRegistration = {
        ...formData,
        age: parseInt(formData.age, 10),
        registeredAt: new Date().toISOString(),
      };

      existingRegistrations.push(newRegistration);
      localStorage.setItem(
        "tcl_registrations",
        JSON.stringify(existingRegistrations)
      );

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsSubmitted(true);
      toast({
        title: "Registration Successful!",
        description:
          "Your registration has been received. We'll contact you soon!",
      });
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "Could not save your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-white border border-gray-200 rounded-2xl p-8 max-w-2xl mx-auto"
          >
            <h3 className="text-3xl font-bold text-brandBlue mb-4">
              Registration Successful!
            </h3>
            <p className="text-gray-700 mb-2">
              You're successfully registered for Turbo Cricket League Trials!
            </p>
            <p className="text-gray-700 mb-6">
              Our team will contact you soon with the trial dates and venue
              details.
            </p>
            <p className="text-gray-700 mb-6">
              Please join the whatsapp community for the updates.
            </p>
            <a
              href="https://chat.whatsapp.com/FcZDOq05yAt9Otycsxw46n"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white text-base font-bold w-full md:w-auto px-6 py-3"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Whatsapp Community
              </Button>
            </a>
            <div className="mt-6">
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-brandPink hover:border-brandPink hover:text-white"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-4 text-brandPink">
            Register for Trials
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Join Turbo Cricket League and take the first step towards your
            professional cricket career.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 max-w-3xl mx-auto"
        >
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <h3 className="text-2xl font-bold text-center mb-4 text-brandBlue">
              Player Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Player's Name *"
                required
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
              />
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Age *"
                required
                min="10"
                max="30"
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
              />
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Mobile & WhatsApp *"
                required
                pattern="[0-9]{10}"
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email ID *"
                required
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
              />
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                placeholder="District *"
                required
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State *"
                required
                className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
              />
              <div className="md:col-span-2">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
                >
                  <option value="" className="text-gray-500">
                    Select Role *
                  </option>
                  <option value="Batsman">Batsman</option>
                  <option value="Bowler">Bowler</option>
                  <option value="All-rounder">All-rounder</option>
                  <option value="Wicketkeeper">Wicketkeeper</option>
                </select>
              </div>
            </div>
            <StylishButton
              type="submit"
              variant="secondary"
              size="sm"
              className="text-sm w-full"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Register Now"}
            </StylishButton>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

const RegisterPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <RegistrationForm />
    </motion.div>
  );
};

export default RegisterPage;
