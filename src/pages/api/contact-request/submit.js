export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, phone, subject, message, contactType, token } =
      req.body;

    // Make the exact same request as your working curl
    const response = await fetch(
      "https://api.amnesty.mn/users/contact-request/submit",
      {
        method: "POST",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0",
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.5",
          "Accept-Encoding": "gzip, deflate, br, zstd",
          "Content-Type": "application/json",
          Origin: "https://amnesty.mn",
          Connection: "keep-alive",
          Referer: "https://amnesty.mn/",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          DNT: "1",
          "Sec-GPC": "1",
          Priority: "u=0",
          TE: "trailers",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject: subject || "Contact Form Submission",
          message,
          type: contactType,
          token,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Contact form submission error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
