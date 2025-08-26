// Next.js API route to proxy user-groups requests to avoid CORS issues
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const userApiUrl =
      process.env.NEXT_PUBLIC_USER_API_URL || "https://api.amnesty.mn/users";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

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

    if (apiKey) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    }

    const response = await fetch(`${userApiUrl}/user-groups`, {
      method: "GET",
      headers,
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
    console.log("=== USER GROUPS PROXY SUCCESS ===");
    console.log("Response status:", response.status);
    console.log("Response data:", JSON.stringify(responseData, null, 2));
    return res.status(response.status).json(responseData);
  } catch (error) {
    console.error("User groups proxy error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
