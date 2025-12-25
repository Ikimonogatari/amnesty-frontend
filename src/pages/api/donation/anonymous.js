// Anonymous Donation API - Next.js API Route
// Handles one-time anonymous donations via QPay

import axios from "axios";
import {
  anonymousDonationSchema,
  validateRequestBody,
  createErrorResponse,
  createSuccessResponse,
  checkRateLimit,
} from "@/lib/validations/donation";

// Use server-side only env var, fallback to public for backwards compatibility
const USER_API_BASE_URL =
  process.env.USER_API_URL || process.env.NEXT_PUBLIC_USER_API_URL;

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return createErrorResponse(res, 405, "Method not allowed");
  }

  // Rate limiting
  const clientIp =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  const rateLimit = checkRateLimit(`anon:${clientIp}`);
  res.setHeader("X-RateLimit-Remaining", rateLimit.remaining);

  if (!rateLimit.allowed) {
    res.setHeader("Retry-After", rateLimit.retryAfter);
    return createErrorResponse(
      res,
      429,
      `Too many requests. Please try again in ${rateLimit.retryAfter} seconds.`
    );
  }

  try {
    // Validate request body
    const validation = validateRequestBody(anonymousDonationSchema, req.body);

    if (!validation.success) {
      return createErrorResponse(res, 400, validation.message, validation.errors);
    }

    const { amount, firstName, lastName, email, phone, phoneNumber, countryCode, country } =
      validation.data;

    // Use phone field or fallback to phoneNumber
    const phoneField = phone || phoneNumber;

    // Prepare data for User API (match backend format)
    const donationData = {
      amount: parseInt(amount, 10),
      email: String(email),
      firstName: firstName,
      lastName: lastName,
      phone: phoneField,
      country: countryCode || country || "MN",
    };

    if (process.env.NODE_ENV === "development") {
      console.log("[Donation API] anonymous - Sending to User API:", {
        url: `${USER_API_BASE_URL}/donation/anonymous`,
        data: donationData,
      });
    }

    // Call the actual User API
    const response = await axios.post(
      `${USER_API_BASE_URL}/donation/anonymous`,
      donationData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000, // 30 second timeout
      }
    );

    if (process.env.NODE_ENV === "development") {
      console.log("[Donation API] anonymous - User API response:", {
        status: response.status,
        hasPayload: !!response.data?.payload,
      });
    }

    // Return normalized response
    return createSuccessResponse(
      res,
      response.data.payload,
      response.data.message
    );
  } catch (error) {
    // Log error in development
    if (process.env.NODE_ENV === "development") {
      console.error("[Donation API] anonymous - Error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    }

    // Handle axios errors
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message =
        error.response?.data?.message ||
        (status === 502 ? "Payment service temporarily unavailable" : "Payment request failed");

      return createErrorResponse(res, status, message);
    }

    // Generic error
    return createErrorResponse(res, 500, "Internal server error");
  }
}
