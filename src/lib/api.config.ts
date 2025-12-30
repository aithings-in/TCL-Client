/**
 * API Configuration
 * Centralized configuration for API endpoints
 */

export const API_CONFIG = {
  // Base URL for the API - can be overridden by environment variable
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",

  // API Endpoints
  ENDPOINTS: {
    REGISTRATIONS: "/api/registrations",
    REGISTRATIONS_AVAILABILITY: "/api/registrations/availability",
    PAYMENTS: {
      INITIALIZE: "/api/payments/initialize",
      VERIFY: "/api/payments/verify",
      STATUS: (paymentId: string) => `/api/payments/${paymentId}`,
    },
    LEADS: "/api/leads",
    STATES: "/api/states",
    DISTRICTS: "/api/districts",
  },
};

/**
 * Helper function to build full API URL
 */
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
