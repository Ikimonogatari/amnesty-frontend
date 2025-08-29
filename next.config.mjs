/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    unoptimized: true, // Remove this in production and use proper image optimization
  },
  async rewrites() {
    // Only in development to avoid CORS issues
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/backend/:path*",
          destination: `${process.env.NEXT_PUBLIC_USER_API_URL}/:path*`,
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
