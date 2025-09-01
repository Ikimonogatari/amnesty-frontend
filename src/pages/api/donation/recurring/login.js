import axios from "axios";

const USER_API_BASE_URL =
  process.env.USER_API_BASE_URL || "https://api.amnesty.mn/users";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    console.log("🔐 RECURRING DONATION LOGIN API PROXY:");
    console.log("Request body:", req.body);
    console.log(
      "Calling User API:",
      `${USER_API_BASE_URL}/donation/recurring/login`
    );

    // Call the actual User API
    const response = await axios.post(
      `${USER_API_BASE_URL}/donation/recurring/login`,
      req.body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("User API Response Status:", response.status);
    console.log("User API Response Data:", response.data);

    // Normalize the response to include success field
    const normalizedResponse = {
      success: true,
      ...response.data,
    };

    console.log("Normalized Response:", normalizedResponse);

    res.status(200).json(normalizedResponse);
  } catch (error) {
    console.error("❌ RECURRING DONATION LOGIN API ERROR:");
    console.error("Error message:", error.message);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);

    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to login to recurring donation";
    const statusCode = error.response?.status || 500;

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
    });
  }
}

