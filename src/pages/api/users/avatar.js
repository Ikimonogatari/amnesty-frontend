// Disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Next.js API route to proxy /users/me/avatar requests to avoid CORS issues
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const userApiUrl =
      process.env.NEXT_PUBLIC_USER_API_URL || "https://api.amnesty.mn/users";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    // Get authorization header from the request
    const authHeader = req.headers.authorization;

    const headers = {
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

    // Forward content-type to preserve multipart boundary
    if (req.headers["content-type"]) {
      headers["Content-Type"] = req.headers["content-type"];
    }

    // Forward the raw request as a stream
    const response = await fetch(`${userApiUrl}/me/avatar`, {
      method: "POST",
      headers,
      body: req,
      duplex: "half", // Required for streaming request body
    });

    // Handle the response properly
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Avatar upload backend error:", errorText);
      return res.status(response.status).json({
        message: errorText || `HTTP ${response.status}`,
      });
    }

    // Parse as JSON directly
    const responseData = await response.json();
    console.log("=== AVATAR UPLOAD PROXY SUCCESS ===");
    console.log("Response status:", response.status);
    return res.status(response.status).json(responseData);
  } catch (error) {
    console.error("Avatar upload proxy error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
