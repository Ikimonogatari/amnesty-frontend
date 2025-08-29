import { IncomingForm } from "formidable";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const USER_API_BASE_URL = process.env.NEXT_PUBLIC_USER_API_URL;

    // Get the raw body chunks
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    const body = Buffer.concat(chunks);

    // Forward the exact request to backend
    const response = await fetch(
      `${USER_API_BASE_URL}/human-right-reports/cover`,
      {
        method: "POST",
        headers: {
          "Content-Type": req.headers["content-type"],
          "Content-Length": body.length.toString(),
        },
        body: body,
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
        "Backend returned non-JSON:",
        textResponse.substring(0, 500)
      );
      return res.status(500).json({
        message: `Backend API returned non-JSON response (status: ${response.status})`,
        debug: textResponse.substring(0, 200),
      });
    }
  } catch (error) {
    console.error("Cover upload proxy error:", error);
    return res.status(500).json({
      message: error?.message || "Cover image upload failed",
    });
  }
}

// Configure for file upload
export const config = {
  api: {
    bodyParser: false,
  },
};
