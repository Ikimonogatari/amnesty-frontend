// Next.js API route to proxy /action/submit requests to avoid CORS issues
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const userApiUrl =
      process.env.NEXT_PUBLIC_USER_API_URL || "https://api.amnesty.mn/users";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY || "70412827041a1cada9c8c234bb111c64704ef4aaf148136f19ffc25e6403f944d8ad25a2f70004eaa8a3c9167f6234676b990608bcfdfbd2d9d7da835a0327fa0b9ad93d64f9331bdfe1a362ce7f546bd3a2ff160f5e3232afc4a5a1ec6533ee07a5bfafda0aaf1126c3f476e0434e623ad50c7842cda7145df959378a4a584e";

    console.log("=== ACTION SUBMIT API PROXY ===");
    console.log("Request body:", JSON.stringify(req.body, null, 2));
    console.log("User API URL:", userApiUrl);
    console.log("API Key exists:", !!apiKey);
    console.log("API Key length:", apiKey ? apiKey.length : 0);

    // Get authorization header from the request
    const authHeader = req.headers.authorization;

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      "User-Agent":
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0",
      "Accept-Language": "en-US,en;q=0.5",
      Origin: "https://amnesty.mn",
      Connection: "keep-alive",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-site",
      DNT: "1",
      "Sec-GPC": "1",
      Priority: "u=0",
    };

    // Add authorization header if provided
    if (authHeader) {
      headers["Authorization"] = authHeader;
    } else if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const response = await fetch(`${userApiUrl}/action/submit`, {
      method: "POST",
      headers,
      body: JSON.stringify(req.body),
    });

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
    console.log("Response data:", JSON.stringify(responseData, null, 2));
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
