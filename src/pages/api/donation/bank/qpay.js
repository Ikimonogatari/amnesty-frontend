// QPay Bank Donation API - Next.js API Route
// Proxy to User API like the old web

import axios from "axios";

const USER_API_BASE_URL = process.env.NEXT_PUBLIC_USER_API_URL;

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    console.log("💳 Donation API - bank/qpay called with:", {
      body: req.body,
      userApiUrl: USER_API_BASE_URL,
    });

    // Extract data from request body
    const { invoiceCode, amount } = req.body;

    // Validation
    if (!invoiceCode) {
      return res.status(400).json({
        success: false,
        message: "Invoice code is required",
      });
    }

    console.log("📤 Sending to User API /donation/bank/qpay:", { invoiceCode });

    // Call the actual User API like old web
    const response = await axios.post(
      `${USER_API_BASE_URL}/donation/bank/qpay`,
      { invoiceCode },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 30000, // 30 second timeout
      }
    );

    console.log("📥 User API response:", {
      status: response.status,
      data: response.data,
    });

    // Normalize response format to include success field
    const normalizedResponse = {
      success: true,
      payload: response.data.payload,
      message: response.data.message,
    };

    console.log("✅ Sending normalized response:", normalizedResponse);

    // Return normalized response
    res.status(200).json(normalizedResponse);
  } catch (error) {
    console.error("❌ QPay API error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    res.status(error.response?.status || 500).json({
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Internal server error",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
}
