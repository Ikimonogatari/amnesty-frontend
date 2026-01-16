export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const USER_API_BASE_URL =
      process.env.NEXT_PUBLIC_USER_API_URL || "https://api.amnesty.mn/users";

    // Fetch province statistics from the backend API
    const response = await fetch(
      `${USER_API_BASE_URL}/human-right-reports/stats`,
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

      if (data.success && data.payload) {
        // Transform the data to match old web format exactly
        const statsData = {
          success: true,
          payload: {
            provinceData: data.payload.provinceData || [],
            totalReports: data.payload.totalReports || 0,
          },
        };

        return res.status(200).json(statsData);
      } else {
        // Return fallback empty data if backend fails
        return res.status(200).json({
          success: true,
          payload: {
            provinceData: [],
            totalReports: 0,
          },
        });
      }
    } else {
      // If not JSON, return fallback data
      console.error("Stats API returned non-JSON response");
      return res.status(200).json({
        success: true,
        payload: {
          provinceData: [],
          totalReports: 0,
        },
      });
    }
  } catch (error) {
    console.error("Error fetching human rights report stats:", error);

    // Return fallback empty data on error (graceful degradation)
    return res.status(200).json({
      success: true,
      payload: {
        provinceData: [],
        totalReports: 0,
      },
    });
  }
}
