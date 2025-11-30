// Next.js API route to proxy register requests to avoid CORS issues
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const userApiUrl =
      process.env.NEXT_PUBLIC_USER_API_URL || "https://api.amnesty.mn/users";
    const apiKey = process.env.NEXT_PUBLIC_API_KEY || "70412827041a1cada9c8c234bb111c64704ef4aaf148136f19ffc25e6403f944d8ad25a2f70004eaa8a3c9167f6234676b990608bcfdfbd2d9d7da835a0327fa0b9ad93d64f9331bdfe1a362ce7f546bd3a2ff160f5e3232afc4a5a1ec6533ee07a5bfafda0aaf1126c3f476e0434e623ad50c7842cda7145df959378a4a584e";

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

    const response = await fetch(`${userApiUrl}/auth/register`, {
      method: "POST",
      headers,
      body: JSON.stringify(req.body),
    });

    const data = await response.text();

    // Try to parse as JSON
    let responseData;
    try {
      responseData = JSON.parse(data);
    } catch (parseError) {
      responseData = { message: data };
    }

    return res.status(response.status).json(responseData);
  } catch (error) {
    console.error("Register proxy error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}
