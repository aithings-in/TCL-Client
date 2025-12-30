/**
 * API Service
 * Centralized API service functions for all backend endpoints
 */

import { API_CONFIG, getApiUrl } from "./api.config";

// Types
export interface RegistrationData {
  leagueType?: "t20-2026" | "t10-2026" | "trial";
  registrationType?: "team" | "individual";
  teamName?: string;
  teamId?: string;
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

export interface AvailabilityData {
  teams?: {
    max: number;
    remaining: number;
    registered: number;
  };
  individuals?: {
    max: number;
    remaining: number;
    registered: number;
    byRole: {
      Wicketkeeper: { max: number; remaining: number; registered: number };
      Batsman: { max: number; remaining: number; registered: number };
      Bowler: { max: number; remaining: number; registered: number };
      "All-rounder": { max: number; remaining: number; registered: number };
    };
  };
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
      const validationError =
        data.errors && Array.isArray(data.errors) && data.errors.length > 0
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

  /**
   * Get registration availability
   */
  getAvailability: async (
    leagueType: string,
    registrationType?: string,
    playerType?: string
  ): Promise<ApiResponse<AvailabilityData>> => {
    const params = new URLSearchParams({ leagueType });
    if (registrationType) params.append("registrationType", registrationType);
    if (playerType) params.append("playerType", playerType);

    return apiRequest<AvailabilityData>(
      `${API_CONFIG.ENDPOINTS.REGISTRATIONS}/availability?${params.toString()}`,
      {
        method: "GET",
      }
    );
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

/**
 * State API Service
 */
export interface State {
  _id: string;
  name: string;
  code: string;
  type: "state" | "union_territory";
  createdAt: string;
  updatedAt: string;
}

export const stateApi = {
  /**
   * Get all states
   */
  getAll: async (
    type?: "state" | "union_territory"
  ): Promise<ApiResponse<State[]>> => {
    const params = type ? `?type=${type}` : "";
    return apiRequest<State[]>(`${API_CONFIG.ENDPOINTS.STATES}${params}`, {
      method: "GET",
    });
  },

  /**
   * Get state by code
   */
  getByCode: async (code: string): Promise<ApiResponse<State>> => {
    return apiRequest<State>(`${API_CONFIG.ENDPOINTS.STATES}/${code}`, {
      method: "GET",
    });
  },
};

/**
 * District API Service
 */
export interface District {
  _id: string;
  name: string;
  code?: string;
  stateId: State | string;
  createdAt: string;
  updatedAt: string;
}

export const districtApi = {
  /**
   * Get all districts
   */
  getAll: async (
    stateId?: string,
    stateCode?: string
  ): Promise<ApiResponse<District[]>> => {
    const params = new URLSearchParams();
    if (stateId) params.append("stateId", stateId);
    if (stateCode) params.append("stateCode", stateCode);
    const queryString = params.toString() ? `?${params.toString()}` : "";
    return apiRequest<District[]>(
      `${API_CONFIG.ENDPOINTS.DISTRICTS}${queryString}`,
      {
        method: "GET",
      }
    );
  },

  /**
   * Get districts by state code
   */
  getByStateCode: async (
    stateCode: string
  ): Promise<ApiResponse<District[]>> => {
    return apiRequest<District[]>(
      `${API_CONFIG.ENDPOINTS.DISTRICTS}/state-code/${stateCode}`,
      {
        method: "GET",
      }
    );
  },

  /**
   * Get districts by state ID
   */
  getByStateId: async (stateId: string): Promise<ApiResponse<District[]>> => {
    return apiRequest<District[]>(
      `${API_CONFIG.ENDPOINTS.DISTRICTS}/state/${stateId}`,
      {
        method: "GET",
      }
    );
  },
};
