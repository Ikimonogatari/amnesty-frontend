import apiService from "../../../services/apiService";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    // Fetch province statistics from the backend API
    const response = await apiService.get("/api/human-right-reports/stats");

    if (response.success && response.payload) {
      // Transform the data to match old web format exactly
      const statsData = {
        success: true,
        payload: {
          provinceData: response.payload.provinceData || [],
          totalReports: response.payload.totalReports || 0,
          // Additional stats can be added here as needed
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
