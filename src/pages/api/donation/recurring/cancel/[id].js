import axios from "axios";

const USER_API_BASE_URL =
  process.env.USER_API_BASE_URL || "https://api.amnesty.mn/users";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  // Check for authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ 
      success: false, 
      message: "Authorization token required" 
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    console.log("🗑️ CANCEL SUBSCRIPTION API PROXY:");
    console.log("Subscription ID:", id);
    console.log("Token:", token.substring(0, 20) + "...");
    console.log(
      "Calling User API:",
      `${USER_API_BASE_URL}/donation/recurring/cancel/${id}`
    );

    // Call the actual User API
    const response = await axios.post(
      `${USER_API_BASE_URL}/donation/recurring/cancel/${id}`,
      {},
      {
        headers: {
          "Authorization": `Bearer ${token}`,
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
    console.error("❌ CANCEL SUBSCRIPTION API ERROR:");
    console.error("Error message:", error.message);
    console.error("Error response:", error.response?.data);
    console.error("Error status:", error.response?.status);

    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to cancel subscription";
    const statusCode = error.response?.status || 500;

    res.status(statusCode).json({
      success: false,
      message: errorMessage,
    });
  }
}
