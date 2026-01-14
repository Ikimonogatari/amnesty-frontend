export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const USER_API_BASE_URL =
      process.env.NEXT_PUBLIC_USER_API_URL || "https://api.amnesty.mn/users";

    // Forward the request to backend API
    console.log(
      "Forwarding auth header:",
      req.headers.authorization ? "✅ Present" : "❌ Missing"
    );
    console.log(
      "Sending to API:",
      `${USER_API_BASE_URL}/human-right-reports/create`
    );
    console.log("Request body:", JSON.stringify(req.body, null, 2));

    const response = await fetch(
      `${USER_API_BASE_URL}/human-right-reports/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Forward Authorization header if present
          ...(req.headers.authorization
            ? { Authorization: req.headers.authorization }
            : {}),
        },
        body: JSON.stringify(req.body),
      }
    );

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return res.status(response.status).json(data);
    } else {
      // If not JSON, it's probably an error page
      const textResponse = await response.text();
      console.error(
        "Submit API returned non-JSON:",
        textResponse.substring(0, 500)
      );
      return res.status(500).json({
        message: `Submit API returned non-JSON response (status: ${response.status})`,
        debug: textResponse.substring(0, 200),
      });
    }
  } catch (error) {
    console.error("Human rights report submit error:", error);
    return res.status(500).json({
      message: error?.message || "Failed to submit human rights report",
    });
  }
}
