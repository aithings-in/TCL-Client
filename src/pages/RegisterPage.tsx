"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { StylishButton } from "@/components/ui/stylish-button";
import { registrationApi, paymentApi } from "@/lib/api.service";
import type { RegistrationData, AvailabilityData } from "@/lib/api.service";
import type {
  RazorpayOptions,
  RazorpayResponse,
  RazorpayError,
} from "@/types/razorpay";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import { useLeagueType } from "@/hooks/useLeagueType";

interface IPayment {
  paymentId: string;
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  status: "pending" | "completed" | "failed";
}

const RegistrationForm = () => {
  const { toast } = useToast();
  const { leagueType: providerLeagueType } = useLeagueType();

  // Map provider league type (T10/T20) to registration league type (t10-2026/t20-2026)
  const leagueType: "t20-2026" | "t10-2026" | "trial" =
    providerLeagueType === "T10"
      ? "t10-2026"
      : providerLeagueType === "T20"
      ? "t20-2026"
      : "trial";

  const [registrationType, setRegistrationType] = useState<
    "team" | "individual"
  >("individual");
  const [teamName, setTeamName] = useState("");
  const [teamId, setTeamId] = useState<string | null>(null);
  const [availability, setAvailability] = useState<AvailabilityData | null>(
    null
  );
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
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Use react-razorpay hook to load Razorpay
  const {
    Razorpay,
    isLoading: isRazorpayLoading,
    error: razorpayError,
  } = useRazorpay();

  // Check if Razorpay is actually ready - don't wait for hook's isLoading
  // Just check if Razorpay is available (either from hook or window)
  const isRazorpayReady = useMemo(() => {
    return !!Razorpay || (typeof window !== "undefined" && !!window.Razorpay);
  }, [Razorpay]);

  // Show error if Razorpay fails to load
  useEffect(() => {
    if (razorpayError) {
      toast({
        title: "Payment Gateway Error",
        description: "Failed to load payment gateway. Please refresh the page.",
        variant: "destructive",
      });
    }
  }, [razorpayError, toast]);

  // Fetch availability when league type or registration type changes
  useEffect(() => {
    const fetchAvailability = async () => {
      if (leagueType === "t10-2026") {
        try {
          const response = await registrationApi.getAvailability(
            leagueType,
            registrationType
          );
          if (response.success && response.data) {
            setAvailability(response.data);
          }
        } catch (error) {
          console.error("Failed to fetch availability:", error);
        }
      } else {
        // Clear availability for non-T10 leagues
        setAvailability(null);
      }
    };

    fetchAvailability();
  }, [leagueType, registrationType, providerLeagueType]);

  // Fetch availability for specific role when role changes (for individual T10)
  useEffect(() => {
    const fetchRoleAvailability = async () => {
      if (
        leagueType === "t10-2026" &&
        registrationType === "individual" &&
        formData.role
      ) {
        try {
          const response = await registrationApi.getAvailability(
            leagueType,
            "individual",
            formData.role
          );
          if (response.success && response.data) {
            // Update availability with role-specific data
            setAvailability((prev) => ({
              ...prev,
              roleAvailability: response.data,
            }));
          }
        } catch (error) {
          console.error("Failed to fetch role availability:", error);
        }
      }
    };

    fetchRoleAvailability();
  }, [leagueType, registrationType, formData.role]);

  // Validation functions
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        if (!value || value.trim().length === 0) {
          return "Name is required";
        }
        if (!/^[A-Za-z\s]+$/.test(value.trim())) {
          return "Name should contain only alphabets";
        }
        if (value.trim().length < 2) {
          return "Name should be at least 2 characters";
        }
        return "";

      case "age":
        if (!value || value.trim().length === 0) {
          return "Age is required";
        }
        const ageNum = parseInt(value, 10);
        if (isNaN(ageNum)) {
          return "Age must be a valid number";
        }
        if (ageNum < 10) {
          return "Age must be at least 10";
        }
        if (ageNum >= 100) {
          return "Age must be less than 100";
        }
        return "";

      case "mobile":
        if (!value || value.trim().length === 0) {
          return "Mobile number is required";
        }
        if (!/^[0-9]{10}$/.test(value.replace(/\s+/g, ""))) {
          return "Mobile number must be exactly 10 digits";
        }
        return "";

      case "email":
        if (!value || value.trim().length === 0) {
          return "Email is required";
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          return "Please enter a valid email address";
        }
        return "";

      case "district":
        if (!value || value.trim().length === 0) {
          return "District is required";
        }
        if (!/^[A-Za-z\s]+$/.test(value.trim())) {
          return "District should contain only alphabets";
        }
        return "";

      case "state":
        if (!value || value.trim().length === 0) {
          return "State is required";
        }
        if (!/^[A-Za-z\s]+$/.test(value.trim())) {
          return "State should contain only alphabets";
        }
        return "";

      case "role":
        if (!value || value.trim().length === 0) {
          return "Role is required";
        }
        return "";

      default:
        return "";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // For mobile, only allow digits
    if (name === "mobile") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
        // Validate after updating
        const error = validateField(name, digitsOnly);
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
      return;
    }

    // For name, district, state - only allow alphabets and spaces
    if (name === "name" || name === "district" || name === "state") {
      const alphabetsOnly = value.replace(/[^A-Za-z\s]/g, "");
      setFormData((prev) => ({ ...prev, [name]: alphabetsOnly }));
      // Validate after updating
      const error = validateField(name, alphabetsOnly);
      setErrors((prev) => ({ ...prev, [name]: error }));
      return;
    }

    // For age - only allow digits
    if (name === "age") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
      // Validate after updating
      const error = validateField(name, digitsOnly);
      setErrors((prev) => ({ ...prev, [name]: error }));
      return;
    }

    // For other fields, allow normal input
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Validate after updating
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async (
    registrationId: string,
    payment: IPayment | null
  ) => {
    try {
      setIsProcessingPayment(true);

      // Wait for Razorpay to be ready (with timeout)
      let RazorpayInstance =
        Razorpay || (typeof window !== "undefined" ? window.Razorpay : null);

      if (!RazorpayInstance) {
        toast({
          title: "Payment Gateway Not Ready",
          description:
            "Payment gateway is still loading. Please wait a moment and try again, or refresh the page.",
          variant: "destructive",
        });
        setIsProcessingPayment(false);
        return;
      }

      let paymentResponse;
      if (
        payment?.orderId &&
        payment?.paymentId &&
        payment?.status === "pending"
      ) {
        paymentResponse = payment;
      } else {
        // Initialize payment
        const initResponse = await paymentApi.initialize(registrationId);

        if (!initResponse.success || !initResponse.data) {
          toast({
            title: "Payment Initialization Failed",
            description: initResponse.message || "Failed to initialize payment",
            variant: "destructive",
          });
          setIsProcessingPayment(false);
          return;
        }
        paymentResponse = initResponse.data;
      }

      const { paymentId, orderId, amount, currency, keyId } = paymentResponse;
      setPaymentId(paymentId);

      // Open Razorpay checkout
      const options: RazorpayOrderOptions = {
        key: keyId,
        amount: amount * 100,
        currency: currency.toUpperCase() as "INR",
        name: "Turbo Cricket League",
        description: "Registration Payment",
        order_id: orderId,
        handler: async function (response: RazorpayResponse) {
          try {
            setIsProcessingPayment(true);

            // Verify payment
            const verifyResponse = await paymentApi.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              paymentId: paymentId,
            });

            setIsProcessingPayment(false);

            if (verifyResponse.success) {
              setIsSubmitted(true);
              toast({
                title: "Payment Successful!",
                description: "Your registration and payment are complete!",
              });
            } else {
              toast({
                title: "Payment Verification Failed",
                description:
                  verifyResponse.message || "Payment could not be verified",
                variant: "destructive",
              });
            }
          } catch (error: any) {
            setIsProcessingPayment(false);
            toast({
              title: "Payment Verification Error",
              description: error.message || "Failed to verify payment",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: {
          color: "#EC4899", // brandPink
        },
        modal: {
          ondismiss: function () {
            setIsProcessingPayment(false);
            toast({
              title: "Payment Cancelled",
              description: "You can complete the payment later.",
            });
          },
        },
        notes: {
          registrationId: registrationId,
          leagueType: leagueType,
        } as any, // Razorpay accepts object but react-razorpay types expect string
      };

      const razorpay = new RazorpayInstance(options);

      // Handle payment failure
      razorpay.on("payment.failed", function (response: RazorpayError) {
        setIsProcessingPayment(false);
        toast({
          title: "Payment Failed",
          description:
            response.error.description || "Payment could not be processed",
          variant: "destructive",
        });
      });

      // Open Razorpay checkout modal
      razorpay.open();
      setIsProcessingPayment(false); // Modal is open, processing happens in handler
    } catch (error: any) {
      setIsProcessingPayment(false);
      toast({
        title: "Payment Error",
        description: error.message || "Failed to process payment",
        variant: "destructive",
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const isValid = validateForm();
    if (!isValid) {
      // Get the first error from the updated errors state
      const validationErrors: Record<string, string> = {};
      Object.keys(formData).forEach((key) => {
        const error = validateField(
          key,
          formData[key as keyof typeof formData]
        );
        if (error) {
          validationErrors[key] = error;
        }
      });

      const firstError =
        Object.values(validationErrors).find((err) => err) ||
        "Please fix the errors in the form";
      toast({
        title: "Validation Error",
        description: firstError,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Prepare registration data
      const registrationData: RegistrationData = {
        leagueType: leagueType,
        registrationType:
          leagueType === "t10-2026" ? registrationType : undefined,
        teamName:
          leagueType === "t10-2026" && registrationType === "team"
            ? teamName
            : undefined,
        teamId: teamId || undefined,
        name: formData.name,
        age: parseInt(formData.age, 10),
        mobile: formData.mobile,
        email: formData.email,
        district: formData.district,
        state: formData.state,
        role: formData.role as RegistrationData["role"],
      };

      // Create registration via API
      const response = await registrationApi.create(registrationData);

      if (!response.success) {
        // Show validation error from API (first error if multiple)
        const errorMessage =
          response.message || "Could not complete registration";
        toast({
          title: "Registration Failed",
          description: errorMessage,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Get registration ID from response
      const regId = response.data?._id;
      if (!regId) {
        toast({
          title: "Registration Error",
          description: "Registration created but could not proceed to payment",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      // Initialize payment flow
      await handlePayment(regId, response.data?.payment || null);
    } catch (error: any) {
      toast({
        title: "Submission Error",
        description:
          error.message ||
          "Could not save your registration. Please try again.",
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
              You're successfully registered for{" "}
              {leagueType === "t10-2026"
                ? "T10 League 2026"
                : leagueType === "t20-2026"
                ? "T20 League 2026"
                : "Turbo Cricket League Trials"}
              !
            </p>
            <p className="text-gray-700 mb-6">
              Our team will contact you soon with the details.
            </p>
            {paymentId && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-semibold text-green-800 mb-1">
                  ✓ Payment Completed
                </p>
                <p className="text-xs text-green-600">
                  Payment ID: {paymentId}
                </p>
              </div>
            )}
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
            {leagueType === "t10-2026"
              ? "Register for T10 League 2026"
              : leagueType === "t20-2026"
              ? "Register for T20 League 2026"
              : "Register for Trials"}
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
              {leagueType === "t10-2026" && registrationType === "team"
                ? "Team Registration"
                : "Player Information"}
            </h3>

            {/* League Type Display (from provider) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                League Type
              </label>
              <div className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 text-gray-700">
                {providerLeagueType === "T10"
                  ? "T10 League 2026"
                  : providerLeagueType === "T20"
                  ? "T20 League 2026"
                  : "Trial Registration"}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                You can change the league type from the header toggle
              </p>
            </div>

            {/* Registration Type Selection for T10 */}
            {leagueType === "t10-2026" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Type *
                </label>
                <div className="grid grid-cols-2 gap-4 text-brandBlue">
                  <button
                    type="button"
                    onClick={() => {
                      setRegistrationType("team");
                      setTeamName("");
                      setTeamId(null);
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      registrationType === "team"
                        ? "border-brandPink bg-pink-50"
                        : "border-gray-300 bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    <div className="font-semibold text-lg">Team Entry</div>
                    <div className="text-sm text-gray-600 mt-1">
                      ₹21,000 per team
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      13 Players Max
                    </div>
                    {availability?.teams && (
                      <div className="text-xs mt-2 font-medium">
                        {availability.teams.remaining} teams remaining
                      </div>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRegistrationType("individual");
                      setTeamName("");
                      setTeamId(null);
                    }}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      registrationType === "individual"
                        ? "border-brandPink bg-pink-50"
                        : "border-gray-300 bg-gray-50 hover:border-gray-400"
                    }`}
                  >
                    <div className="font-semibold text-lg">
                      Individual Entry
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      ₹2,000 per player
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Individual Registration
                    </div>
                    {availability?.individuals && (
                      <div className="text-xs mt-2 font-medium">
                        {availability.individuals.remaining} slots remaining
                      </div>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Team Name for Team Registration */}
            {leagueType === "t10-2026" && registrationType === "team" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Name *
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter your team name"
                  required
                  className="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brandPink focus:border-transparent"
                />
              </div>
            )}

            {/* Availability Display for Individual T10 */}
            {leagueType === "t10-2026" &&
              registrationType === "individual" &&
              availability?.individuals && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-brandBlue">
                  <div className="text-sm font-semibold text-blue-900 mb-2">
                    Available Slots by Role:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      Wicketkeeper:{" "}
                      {availability.individuals.byRole.Wicketkeeper.remaining} /{" "}
                      {availability.individuals.byRole.Wicketkeeper.max}
                    </div>
                    <div>
                      Batsman:{" "}
                      {availability.individuals.byRole.Batsman.remaining} /{" "}
                      {availability.individuals.byRole.Batsman.max}
                    </div>
                    <div>
                      Bowler: {availability.individuals.byRole.Bowler.remaining}{" "}
                      / {availability.individuals.byRole.Bowler.max}
                    </div>
                    <div>
                      All-rounder:{" "}
                      {availability.individuals.byRole["All-rounder"].remaining}{" "}
                      / {availability.individuals.byRole["All-rounder"].max}
                    </div>
                  </div>
                </div>
              )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={
                    registrationType === "team"
                      ? "Captain's Name *"
                      : "Player's Name *"
                  }
                  required
                  className={`w-full p-3 rounded-lg bg-gray-50 border text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-brandPink focus:border-transparent"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  placeholder="Age *"
                  required
                  maxLength={2}
                  className={`w-full p-3 rounded-lg bg-gray-50 border text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                    errors.age
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-brandPink focus:border-transparent"
                  }`}
                />
                {errors.age && (
                  <p className="mt-1 text-sm text-red-600">{errors.age}</p>
                )}
              </div>
              <div>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  placeholder="Mobile & WhatsApp * (10 digits)"
                  required
                  maxLength={10}
                  className={`w-full p-3 rounded-lg bg-gray-50 border text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                    errors.mobile
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-brandPink focus:border-transparent"
                  }`}
                />
                {errors.mobile && (
                  <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
                )}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email ID *"
                  required
                  className={`w-full p-3 rounded-lg bg-gray-50 border text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-brandPink focus:border-transparent"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  placeholder="District *"
                  required
                  className={`w-full p-3 rounded-lg bg-gray-50 border text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                    errors.district
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-brandPink focus:border-transparent"
                  }`}
                />
                {errors.district && (
                  <p className="mt-1 text-sm text-red-600">{errors.district}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State *"
                  required
                  className={`w-full p-3 rounded-lg bg-gray-50 border text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                    errors.state
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-brandPink focus:border-transparent"
                  }`}
                />
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role *
                  {leagueType === "t10-2026" &&
                    registrationType === "individual" &&
                    formData.role &&
                    availability?.individuals?.byRole && (
                      <span className="ml-2 text-xs text-gray-500">
                        (
                        {
                          availability.individuals.byRole[
                            formData.role as keyof typeof availability.individuals.byRole
                          ]?.remaining
                        }{" "}
                        slots remaining)
                      </span>
                    )}
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className={`w-full p-3 rounded-lg bg-gray-50 border text-gray-900 focus:outline-none focus:ring-2 ${
                    errors.role
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-brandPink focus:border-transparent"
                  }`}
                >
                  <option value="" className="text-gray-500">
                    Select Role *
                  </option>
                  <option value="Batsman">Batsman</option>
                  <option value="Bowler">Bowler</option>
                  <option value="All-rounder">All-rounder</option>
                  <option value="Wicketkeeper">Wicketkeeper</option>
                </select>
                {errors.role && (
                  <p className="mt-1 text-sm text-red-600">{errors.role}</p>
                )}
              </div>
              {leagueType === "t10-2026" && registrationType === "team" && (
                <p className="mt-1 text-xs text-gray-500">
                  Team composition: 1 Keeper, 3-4 Batters, 3 Bowlers, 4-5
                  All-rounders (13 max)
                </p>
              )}
            </div>
            <StylishButton
              type="submit"
              variant="secondary"
              size="sm"
              className="text-sm w-full"
              disabled={isLoading || isProcessingPayment}
            >
              {isProcessingPayment
                ? "Processing Payment..."
                : isLoading
                ? "Submitting..."
                : "Register Now"}
            </StylishButton>
            {!isRazorpayReady && isRazorpayLoading && !razorpayError && (
              <p className="text-xs text-gray-500 text-center mt-2">
                Payment gateway is loading. You can still register and complete
                payment when ready.
              </p>
            )}
            {razorpayError && (
              <p className="text-xs text-red-500 text-center mt-2">
                Failed to load payment gateway. Please refresh the page.
              </p>
            )}
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
