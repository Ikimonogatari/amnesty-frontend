// Anonymous Donation API - Next.js API Route
// Mock implementation for testing donation functionality

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    // Extract data from request body
    const {
      amount,
      firstName,
      lastName,
      email,
      phone,
      phoneNumber,
      countryCode,
      country,
    } = req.body;

    // Use phone field (like old project) or fallback to phoneNumber
    const phoneField = phone || phoneNumber;

    // Validation
    if (!amount || !firstName || !lastName || !email || !phoneField) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Mock successful response with sample invoice data
    const mockInvoiceData = {
      code: `INV-${Date.now()}`,
      amount: parseInt(amount),
      status: "pending",
      firstName,
      lastName,
      email,
      phone: phoneField,
      country: countryCode || country || "MN",
      createdAt: new Date().toISOString(),
    };

    // Return success response
    res.status(200).json({
      success: true,
      message: "Donation created successfully",
      payload: mockInvoiceData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Internal server error",
    });
  }
}
