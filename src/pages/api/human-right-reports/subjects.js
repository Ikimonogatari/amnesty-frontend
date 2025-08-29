export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Make request to backend API
    const USER_API_BASE_URL = process.env.NEXT_PUBLIC_USER_API_URL;

    const response = await fetch(
      `${USER_API_BASE_URL}/human-right-reports/subjects`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
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
        "Subjects API returned non-JSON:",
        textResponse.substring(0, 500)
      );
      return res.status(500).json({
        message: `Subjects API returned non-JSON response (status: ${response.status})`,
        debug: textResponse.substring(0, 200),
        // Fallback subjects (with reportCounts like old web)
        payload: [
          { id: 1, title: "ᠠᠮᠢᠳᠤᠷᠠᠯ ᠪᠠ ᠤᠯᠠᠰ ᠲᠦᠷᠦ ᠶᠢᠨ ᠡᠷᠬᠡ", reportCounts: 0 },
          { id: 2, title: "ᠡᠳ᠋ᠦ ᠡᠷᠬᠡ ᠪᠠ ᠨᠢᠭᠡᠮᠯᠢᠭ ᠡᠷᠬᠡ", reportCounts: 0 },
          { id: 3, title: "ᠦᠭᠡ ᠬᠡᠯᠡᠬᠦ ᠡᠷᠬᠡ", reportCounts: 0 },
          { id: 4, title: "ᠠᠮᠢᠨ ᠠᠮᠢᠳᠤᠷᠠᠯ ᠤ᠋ᠨ ᠡᠷᠬᠡ", reportCounts: 0 },
          { id: 5, title: "ᠦᠭᠡ ᠰᠤᠷᠭᠠᠬᠤ ᠡᠷᠬᠡ", reportCounts: 0 },
        ],
      });
    }
  } catch (error) {
    console.error("Human rights subjects fetch error:", error);
    return res.status(500).json({
      message: error?.message || "Failed to fetch human rights subjects",
    });
  }
}
