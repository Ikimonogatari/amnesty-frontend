// Next.js API route to proxy /users/me/avatar requests to avoid CORS issues
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const userApiUrl =
      process.env.NEXT_PUBLIC_USER_API_URL || "https://api.amnesty.mn/users";

    // Get authorization header from the request
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header required" });
    }

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
      Authorization: authHeader,
    };

    // Forward the request body (FormData) directly
    const response = await fetch(`${userApiUrl}/me/avatar`, {
      method: "POST",
      headers,
      body: req.body,
    });

    // Handle the response properly - let fetch handle decompression
    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        message: errorText || `HTTP ${response.status}`,
      });
    }

    // Parse as JSON directly - fetch handles decompression automatically
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
