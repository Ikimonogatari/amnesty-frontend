import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { contactType, name, email, phone, message } = req.body;

    // Forward the request to the production API service
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_PROD_API_USERS_URL || 'https://api.amnesty.mn/users'}/contact-request/submit`,
      {
        name,
        email,
        phone,
        subject: "Contact Form Submission",
        message,
        type: contactType,
        token: req.body.token, // Cloudflare Turnstile token if implemented
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({
      message:
        error.response?.data?.message ||
        "An error occurred while submitting the form",
    });
  }
}
