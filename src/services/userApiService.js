// User API Service for Amnesty - Mongol Bichig Version
// Handles authentication, registration, donations, member features
// Based on the comprehensive mn version functionality

import { FetcherPost, FetcherPut } from "@/utils/fetcher";
import Cookies from "js-cookie";

const USER_API_BASE_URL = process.env.NEXT_PUBLIC_USER_API_URL;

// Cookie names (matches old project)
const COOKIES = {
  MEMBER_TOKEN: "amnesty_member_token",
};

// Helper function for authenticated requests
const getAuthHeaders = () => {
  if (typeof window !== "undefined") {
    // Try to get token from cookies first, fallback to localStorage
    const token =
      Cookies.get(COOKIES.MEMBER_TOKEN) || localStorage.getItem("auth_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  return {};
};

// Authentication Services
export const authService = {
  // Register new user
  async register(userData) {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Create an error object that matches the expected format
        const error = new Error(data.message || "Registration failed");
        error.response = { data };
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Send SMS verification code (matches old project)
  async sendVerificationCode(phone) {
    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: String(phone) }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Create an error object that matches the expected format
        const error = new Error(data.message || "SMS verification failed");
        error.response = { data };
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Login user (matches old project)
  async login(credentials) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: String(credentials.phone),
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Create an error object that matches the expected format
        const error = new Error(data.message || "Login failed");
        error.response = { data };
        throw error;
      }

      // Handle token storage like old project
      if (data.payload?.token && typeof window !== "undefined") {
        const token = data.payload.token.bearer;
        const expires = data.payload.token.expires;

        // Store in cookies like old project
        const isDev = process.env.NODE_ENV === "development";

        if (isDev) {
          Cookies.set(COOKIES.MEMBER_TOKEN, token, {
            path: "/",
            expires: expires ? new Date(expires * 1000) : 7, // 7 days default
          });
        } else {
          Cookies.set(COOKIES.MEMBER_TOKEN, token, {
            path: "/",
            secure: true,
            sameSite: "strict",
            expires: expires ? new Date(expires * 1000) : 7, // 7 days default
          });
        }

        // Also store in localStorage as fallback
        localStorage.setItem("auth_token", token);
        if (expires) {
          localStorage.setItem("auth_token_expires", expires);
        }
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout() {
    if (typeof window !== "undefined") {
      // Remove from cookies
      Cookies.remove(COOKIES.MEMBER_TOKEN, { path: "/" });

      // Remove from localStorage as fallback
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_token_expires");
    }
  },

  // Reset password - send verification (matches old project)
  async resetPasswordSendCode(phone) {
    try {
      const response = await fetch("/api/auth/resetPass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: String(phone) }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Create an error object that matches the expected format
        const error = new Error(data.message || "Reset password failed");
        error.response = { data };
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Reset password - verify code (matches old project)
  async resetPasswordVerifyCode(phone, verifyCode) {
    try {
      const response = await fetch("/api/auth/resetPassVerify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: String(phone), verifyCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Create an error object that matches the expected format
        const error = new Error(data.message || "Code verification failed");
        error.response = { data };
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Reset password - confirm with new password (matches old project)
  async resetPasswordConfirm(token, password) {
    try {
      const response = await fetch("/api/auth/resetPassConfirm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Create an error object that matches the expected format
        const error = new Error(data.message || "Password reset failed");
        error.response = { data };
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Verify phone number
  async verifyPhone(phone) {
    try {
      const response = await FetcherPost(
        "/auth/verify/phone",
        { phone },
        USER_API_BASE_URL
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Confirm phone verification
  async confirmPhoneVerification(data) {
    try {
      const response = await FetcherPost(
        "/auth/verify/phone/confirm",
        data,
        USER_API_BASE_URL
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Verify email
  async verifyEmail(email) {
    try {
      const response = await FetcherPost(
        "/auth/verify/email",
        { email },
        USER_API_BASE_URL
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Confirm email verification
  async confirmEmailVerification(data) {
    try {
      const response = await FetcherPost(
        "/auth/verify/email/confirm",
        data,
        USER_API_BASE_URL
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

// User Profile Services
export const userService = {
  // Get user profile
  async getProfile() {
    try {
      const response = await fetch(`${USER_API_BASE_URL}/me`, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Update user profile
  async updateProfile(userData) {
    try {
      const response = await fetch(`${USER_API_BASE_URL}/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(userData),
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Upload avatar
  async uploadAvatar(formData) {
    try {
      const response = await fetch(`${USER_API_BASE_URL}/me/avatar`, {
        method: "POST",
        headers: {
          ...getAuthHeaders(),
        },
        body: formData,
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Change password
  async changePassword(passwordData) {
    try {
      const response = await FetcherPost(
        "/me/change-password",
        passwordData,
        USER_API_BASE_URL
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Delete account
  async deleteAccount(confirmationData) {
    try {
      const response = await FetcherPost(
        "/me/delete-account",
        confirmationData,
        USER_API_BASE_URL
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get user groups
  async getUserGroups() {
    try {
      const response = await fetch("/api/user-groups", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // Create an error object that matches the expected format
        const error = new Error(data.message || "Failed to load user groups");
        error.response = { data };
        throw error;
      }

      return data;
    } catch (error) {
      throw error;
    }
  },
};

// Member Services
export const memberService = {
  // Submit membership request
  async submitMembershipRequest(memberData) {
    try {
      const response = await FetcherPost(
        "/member/request",
        memberData,
        USER_API_BASE_URL
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get subscription status
  async getSubscriptionStatus() {
    try {
      const response = await fetch(`${USER_API_BASE_URL}/subscription/status`, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Subscribe to membership
  async subscribe(subscriptionData) {
    try {
      const response = await FetcherPost(
        "/subscription/subscribe",
        subscriptionData,
        USER_API_BASE_URL
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get user events
  async getUserEvents() {
    try {
      const response = await fetch(`${USER_API_BASE_URL}/events/list`, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      });
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Get payment history
  async getPaymentHistory() {
    try {
      const response = await fetch(
        `${USER_API_BASE_URL}/payment/list?status=paid`,
        {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },
        }
      );
      return await response.json();
    } catch (error) {
      throw error;
    }
  },
};

// Donation Services
export const donationService = {
  // Create anonymous donation
  async createAnonymousDonation(donationData) {
    try {
      const response = await fetch("/api/donation/anonymous", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationData),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  // Check donation status
  async checkDonationStatus(invoiceCode) {
    try {
      const response = await fetch("/api/donation/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ invoiceCode }),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  // Create QPay donation
  async createQPayDonation(donationData) {
    try {
      const response = await FetcherPost(
        "/payment/qpay",
        donationData,
        USER_API_BASE_URL
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Bank donation QPay
  async createBankQPayDonation(donationData) {
    try {
      const response = await fetch("/api/donation/bank/qpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donationData),
      });
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  },

  // Recurring donation services
  recurring: {
    // Register for recurring donation
    async register(userData) {
      try {
        const response = await FetcherPost(
          "/donation/recurring/register",
          userData,
          USER_API_BASE_URL
        );
        return response;
      } catch (error) {
        throw error;
      }
    },

    // Login to recurring donation
    async login(credentials) {
      try {
        const response = await FetcherPost(
          "/donation/recurring/login",
          credentials,
          USER_API_BASE_URL
        );
        return response;
      } catch (error) {
        throw error;
      }
    },

    // Verify email for recurring donation
    async verifyEmail(email) {
      try {
        const response = await FetcherPost(
          "/donation/recurring/verify-email",
          { email },
          USER_API_BASE_URL
        );
        return response;
      } catch (error) {
        throw error;
      }
    },

    // Get recurring donation info
    async getInfo() {
      try {
        const response = await fetch(
          `${USER_API_BASE_URL}/donation/recurring/me`,
          {
            headers: {
              "Content-Type": "application/json",
              ...getAuthHeaders(),
            },
          }
        );
        return await response.json();
      } catch (error) {
        throw error;
      }
    },

    // Get card list
    async getCardList() {
      try {
        const response = await fetch(
          `${USER_API_BASE_URL}/donation/recurring/card/list`,
          {
            headers: {
              "Content-Type": "application/json",
              ...getAuthHeaders(),
            },
          }
        );
        return await response.json();
      } catch (error) {
        throw error;
      }
    },

    // Remove card
    async removeCard(cardData) {
      try {
        const response = await FetcherPost(
          "/donation/recurring/card/remove",
          cardData,
          USER_API_BASE_URL
        );
        return response;
      } catch (error) {
        throw error;
      }
    },

    // Create invoice
    async createInvoice(invoiceData) {
      try {
        const response = await FetcherPost(
          "/donation/recurring/invoice/create",
          invoiceData,
          USER_API_BASE_URL
        );
        return response;
      } catch (error) {
        throw error;
      }
    },

    // Get subscription list
    async getSubscriptionList() {
      try {
        const response = await fetch(
          `${USER_API_BASE_URL}/donation/recurring/subscription/list`,
          {
            headers: {
              "Content-Type": "application/json",
              ...getAuthHeaders(),
            },
          }
        );
        return await response.json();
      } catch (error) {
        throw error;
      }
    },
  },
};

// Contact and Report Services
export const contactService = {
  // Submit contact request
  async submitContactRequest(contactData) {
    try {
      const response = await FetcherPost(
        "/contact-request/submit",
        contactData,
        USER_API_BASE_URL
      );
      return response;
    } catch (error) {
      throw error;
    }
  },

  // Get provinces list
  async getProvinces() {
    try {
      const response = await fetch(`${USER_API_BASE_URL}/provinces/list`);
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Get human rights report subjects
  async getHumanRightsSubjects() {
    try {
      const response = await fetch(
        `${USER_API_BASE_URL}/human-right-reports/subjects`
      );
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Get human rights report stats
  async getHumanRightsStats() {
    try {
      const response = await fetch(
        `${USER_API_BASE_URL}/human-right-reports/stats`
      );
      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  // Submit human rights report
  async submitHumanRightsReport(reportData) {
    try {
      const response = await FetcherPost(
        "/human-right-reports/submit",
        reportData,
        USER_API_BASE_URL
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

// Event Services
export const eventService = {
  // Submit event calendar data
  async submitEventCalendar(eventData) {
    try {
      const response = await FetcherPost(
        "/participation/events/calendar",
        eventData,
        USER_API_BASE_URL
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
};

// Export all services
export default {
  auth: authService,
  user: userService,
  member: memberService,
  donation: donationService,
  contact: contactService,
  event: eventService,
};
