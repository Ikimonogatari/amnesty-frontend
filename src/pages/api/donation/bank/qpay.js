// QPay Bank Donation API - Next.js API Route
// Generates QPay invoice/QR code for bank payment

import axios from "axios";
import {
  qpayDonationSchema,
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

  const rateLimit = checkRateLimit(`qpay:${clientIp}`);
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
    const validation = validateRequestBody(qpayDonationSchema, req.body);

    if (!validation.success) {
      return createErrorResponse(res, 400, validation.message, validation.errors);
    }

    const { invoiceCode, amount } = validation.data;

    // Prepare request data
    const requestData = { invoiceCode };
    if (amount !== undefined) {
      requestData.amount = amount;
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[Donation API] bank/qpay - Sending to User API:", {
        url: `${USER_API_BASE_URL}/donation/bank/qpay`,
        data: requestData,
      });
    }

    // Call the actual User API
    const response = await axios.post(
      `${USER_API_BASE_URL}/donation/bank/qpay`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000, // 30 second timeout for QPay API
      }
    );

    if (process.env.NODE_ENV === "development") {
      console.log("[Donation API] bank/qpay - User API response:", {
        status: response.status,
        hasPayload: !!response.data?.payload,
        hasQrImage: !!response.data?.payload?.invoice?.qr_image,
      });
    }

    // Return normalized response with QPay data
    return createSuccessResponse(
      res,
      response.data.payload,
      response.data.message
    );
  } catch (error) {
    // Log error in development
    if (process.env.NODE_ENV === "development") {
      console.error("[Donation API] bank/qpay - Error:", {
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
        (status === 502
          ? "QPay service temporarily unavailable"
          : status === 404
          ? "Invoice not found"
          : "QPay request failed");

      return createErrorResponse(res, status, message);
    }

    // Generic error
    return createErrorResponse(res, 500, "Internal server error");
  }
}
