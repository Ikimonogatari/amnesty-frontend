import userApiService from "@/services/userApiService";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const response = await userApiService.contact.uploadCoverImage(req.body);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Cover image upload error:", error);
    return res.status(500).json({
      message: error?.response?.data?.message || "Cover image upload failed",
    });
  }
}

// Configure for file upload
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
