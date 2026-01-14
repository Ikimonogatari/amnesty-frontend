// Next.js API route to proxy /action/submit requests to avoid CORS issues
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const userApiUrl =
      process.env.NEXT_PUBLIC_USER_API_URL || "https://api.amnesty.mn/users";

    // Robust API Key handling
    const fallbackApiKey = "70412827041a1cada9c8c234bb111c64704ef4aaf148136f19ffc25e6403f944d8ad25a2f70004eaa8a3c9167f6234676b990608bcfdfbd2d9d7da835a0327fa0b9ad93d64f9331bdfe1a362ce7f546bd3a2ff160f5e3232afc4a5a1ec6533ee07a5bfafda0aaf1126c3f476e0434e623ad50c7842cda7145df959378a4a584e";
    const envApiKey = process.env.NEXT_PUBLIC_API_KEY;

    console.log("=== ACTION SUBMIT API PROXY ===");
    console.log("Request body (summary):", {
      actionId: req.body?.actionId,
      email: req.body?.email
    });
    console.log("User API URL:", userApiUrl);

    // Get authorization header from the client request
    const clientAuthHeader = req.headers.authorization;

    // Base headers
    const baseHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent":
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0",
      "Accept-Language": "en-US,en;q=0.5",
      Origin: "https://amnesty.mn",
      Connection: "keep-alive",
    };

    // Helper to attempt submission with a specific key strategy
    const attemptSubmit = async (authStrategy, label) => {
      console.log(`Attempting submission with strategy: ${label}`);

      const headers = { ...baseHeaders };

      if (authStrategy.type === "CLIENT_HEADER" && authStrategy.value) {
        headers["Authorization"] = authStrategy.value;
      } else if (authStrategy.type === "BEARER_TOKEN" && authStrategy.value) {
        headers["Authorization"] = `Bearer ${authStrategy.value}`;
      }

      const response = await fetch(`${userApiUrl}/action/submit`, {
        method: "POST",
        headers,
        body: JSON.stringify(req.body),
      });

      return response;
    };

    let response;

    // Strategy 1: Use client's auth header if provided (priority)
    if (clientAuthHeader) {
      response = await attemptSubmit({ type: "CLIENT_HEADER", value: clientAuthHeader }, "CLIENT_HEADER");
    }
    // Strategy 2: Use Environment API Key if available
    else if (envApiKey) {
      response = await attemptSubmit({ type: "BEARER_TOKEN", value: envApiKey }, "ENV_API_KEY");

      // Strategy 3: Fallback if Env Key fails (401/403)
      if (!response.ok && (response.status === 403 || response.status === 401)) {
        console.warn(`Environment key failed with ${response.status}. Retrying with fallback key...`);
        response = await attemptSubmit({ type: "BEARER_TOKEN", value: fallbackApiKey }, "FALLBACK_KEY");
      }
    }
    // Strategy 4: Direct Fallback if no Env Key
    else {
      response = await attemptSubmit({ type: "BEARER_TOKEN", value: fallbackApiKey }, "FALLBACK_KEY_DIRECT");
    }

    // Handle the response properly
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Action submit error:", response.status, errorText);
      return res.status(response.status).json({
        message: errorText || `HTTP ${response.status}`,
      });
    }

    // Parse as JSON directly
    const responseData = await response.json();
    console.log("=== ACTION SUBMIT PROXY SUCCESS ===");
    console.log("Response status:", response.status);
    return res.status(response.status).json(responseData);
  } catch (error) {
    console.error("=== ACTION SUBMIT PROXY ERROR ===");
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
      details: error.toString(),
    });
  }
}
