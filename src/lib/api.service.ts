/**
 * API Service
 * Centralized API service functions for all backend endpoints
 */

import { API_CONFIG, getApiUrl } from "./api.config";

// Types
export interface RegistrationData {
  leagueType?: "t20-2026" | "t10-2026" | "trial";
  name: string;
  age: number;
  mobile: string;
  email: string;
  district: string;
  state: string;
  role: "Batsman" | "Bowler" | "All-rounder" | "Wicketkeeper";
  profileImage?: string | null;
  documents?: string[];
}

export interface LeadData {
  name: string;
  email: string;
  message: string;
}

export interface PaymentInitializeResponse {
  success: boolean;
  message: string;
  data: {
    paymentId: string;
    orderId: string;
    amount: number;
    currency: string;
    keyId: string;
  };
}

export interface PaymentVerifyData {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  paymentId: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  errors?: string[]; // Validation errors array
}

/**
 * Generic API request handler
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(getApiUrl(endpoint), {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      // Extract validation errors if present
      const validationError = data.errors && Array.isArray(data.errors) && data.errors.length > 0
        ? data.errors[0] // Show first validation error
        : data.message || "An error occurred";

      return {
        success: false,
        message: validationError,
        error: data.error,
        errors: data.errors, // Include full errors array
      };
    }

    return data;
  } catch (error: any) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
      error: error.message,
    };
  }
}

/**
 * Registration API Service
 */
export const registrationApi = {
  /**
   * Create a new registration
   */
  create: async (data: RegistrationData): Promise<ApiResponse> => {
    return apiRequest(API_CONFIG.ENDPOINTS.REGISTRATIONS, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

/**
 * Payment API Service
 */
export const paymentApi = {
  /**
   * Initialize payment with Razorpay
   */
  initialize: async (
    registrationId: string
  ): Promise<ApiResponse<PaymentInitializeResponse["data"]>> => {
    return apiRequest(API_CONFIG.ENDPOINTS.PAYMENTS.INITIALIZE, {
      method: "POST",
      body: JSON.stringify({ registrationId }),
    });
  },

  /**
   * Verify Razorpay payment
   */
  verify: async (data: PaymentVerifyData): Promise<ApiResponse> => {
    return apiRequest(API_CONFIG.ENDPOINTS.PAYMENTS.VERIFY, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  /**
   * Get payment status
   */
  getStatus: async (paymentId: string): Promise<ApiResponse> => {
    return apiRequest(API_CONFIG.ENDPOINTS.PAYMENTS.STATUS(paymentId), {
      method: "GET",
    });
  },
};

/**
 * Lead API Service
 */
export const leadApi = {
  /**
   * Create a new lead (contact form submission)
   */
  create: async (data: LeadData): Promise<ApiResponse> => {
    return apiRequest(API_CONFIG.ENDPOINTS.LEADS, {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

