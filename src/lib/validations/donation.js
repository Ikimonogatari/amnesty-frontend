// Donation API Validation Schemas using Zod
// Centralized validation for all donation-related API routes

import { z } from "zod";

// Common validation patterns
const phoneRegex = /^[+]?[\d\s-]{8,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Anonymous Donation Schema
export const anonymousDonationSchema = z.object({
  amount: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
    .refine((val) => !isNaN(val) && val >= 1000, {
      message: "Amount must be at least 1000 MNT",
    })
    .refine((val) => val <= 100000000, {
      message: "Amount cannot exceed 100,000,000 MNT",
    }),
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name too long")
    .transform((val) => val.trim()),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name too long")
    .transform((val) => val.trim()),
  email: z
    .string()
    .min(1, "Email is required")
    .max(255, "Email too long")
    .regex(emailRegex, "Invalid email format")
    .transform((val) => val.toLowerCase().trim()),
  phone: z
    .string()
    .optional()
    .transform((val) => val?.trim()),
  phoneNumber: z
    .string()
    .optional()
    .transform((val) => val?.trim()),
  countryCode: z
    .string()
    .max(5, "Country code too long")
    .optional()
    .default("MN"),
  country: z
    .string()
    .max(100, "Country name too long")
    .optional(),
}).refine(
  (data) => {
    const phone = data.phone || data.phoneNumber;
    return phone && phoneRegex.test(phone);
  },
  {
    message: "Valid phone number is required (8-20 digits)",
    path: ["phone"],
  }
);

// QPay Bank Donation Schema
export const qpayDonationSchema = z.object({
  invoiceCode: z
    .string()
    .min(1, "Invoice code is required")
    .max(100, "Invoice code too long")
    .transform((val) => val.trim()),
  amount: z
    .union([z.string(), z.number()])
    .optional()
    .transform((val) => {
      if (val === undefined || val === null || val === "") return undefined;
      return typeof val === "string" ? parseInt(val, 10) : val;
    }),
});

// Donation Check Schema (for POST)
export const donationCheckSchema = z.object({
  invoiceCode: z
    .string()
    .min(1, "Invoice code is required")
    .max(100, "Invoice code too long")
    .transform((val) => val.trim()),
});

// Donation Check Query Schema (for GET)
export const donationCheckQuerySchema = z.object({
  invoiceCode: z
    .string()
    .min(1, "Invoice code is required")
    .max(100, "Invoice code too long"),
});

// Helper function to validate and parse request body
export function validateRequestBody(schema, body) {
  const result = schema.safeParse(body);

  if (!result.success) {
    const errors = result.error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));

    return {
      success: false,
      errors,
      message: errors.map((e) => `${e.field}: ${e.message}`).join(", "),
    };
  }

  return {
    success: true,
    data: result.data,
  };
}

// Helper function to create standardized error response
export function createErrorResponse(res, statusCode, message, errors = null) {
  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  if (process.env.NODE_ENV === "development" && errors) {
    response.debug = { errors };
  }

  return res.status(statusCode).json(response);
}

// Helper function to create standardized success response
export function createSuccessResponse(res, payload, message = null) {
  return res.status(200).json({
    success: true,
    payload,
    ...(message && { message }),
  });
}

// Rate limiting helper (simple in-memory implementation)
// For production, use Redis or a dedicated rate-limiting service
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per minute per IP

export function checkRateLimit(ip) {
  const now = Date.now();
  const key = `${ip}`;
  const record = requestCounts.get(key);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    requestCounts.set(key, { count: 1, timestamp: now });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((RATE_LIMIT_WINDOW - (now - record.timestamp)) / 1000),
    };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count };
}

// Clean up old rate limit records periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of requestCounts.entries()) {
    if (now - record.timestamp > RATE_LIMIT_WINDOW) {
      requestCounts.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW);
