// Donation Status Check API - Next.js API Route
// Verifies payment status of a pending donation/transaction
// Supports both GET (query param) and POST (body) methods

import axios from "axios";
import {
  donationCheckSchema,
  donationCheckQuerySchema,
  validateRequestBody,
  createErrorResponse,
  createSuccessResponse,
  checkRateLimit,
} from "@/lib/validations/donation";

// Use server-side only env var, fallback to public for backwards compatibility
const USER_API_BASE_URL =
  process.env.USER_API_URL || process.env.NEXT_PUBLIC_USER_API_URL;

export default async function handler(req, res) {
  // Allow GET and POST requests
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", ["GET", "POST"]);
    return createErrorResponse(res, 405, "Method not allowed");
  }

  // Rate limiting (more lenient for check endpoint as it's polled)
  const clientIp =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  const rateLimit = checkRateLimit(`check:${clientIp}`);
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
    let invoiceCode;

    // Handle GET request (query parameter)
    if (req.method === "GET") {
      const validation = validateRequestBody(donationCheckQuerySchema, req.query);

      if (!validation.success) {
        return createErrorResponse(res, 400, validation.message, validation.errors);
      }

      invoiceCode = validation.data.invoiceCode;
    }
    // Handle POST request (body)
    else {
      const validation = validateRequestBody(donationCheckSchema, req.body);

      if (!validation.success) {
        return createErrorResponse(res, 400, validation.message, validation.errors);
      }

      invoiceCode = validation.data.invoiceCode;
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[Donation API] check - Checking invoice status:", {
        url: `${USER_API_BASE_URL}/donation/check`,
        invoiceCode,
        method: req.method,
      });
    }

    // Call the actual User API (always POST to backend)
    const response = await axios.post(
      `${USER_API_BASE_URL}/donation/check`,
      { invoiceCode },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 second timeout for status check
      }
    );

    if (process.env.NODE_ENV === "development") {
      console.log("[Donation API] check - User API response:", {
        status: response.status,
        paymentStatus: response.data?.payload?.status,
      });
    }

    // Return normalized response with payment status
    return createSuccessResponse(
      res,
      response.data.payload,
      response.data.message
    );
  } catch (error) {
    // Log error in development
    if (process.env.NODE_ENV === "development") {
      console.error("[Donation API] check - Error:", {
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
        (status === 404
          ? "Invoice not found"
          : status === 502
          ? "Payment service temporarily unavailable"
          : "Payment status check failed");

      return createErrorResponse(res, status, message);
    }

    // Generic error
    return createErrorResponse(res, 500, "Internal server error");
  }
}
