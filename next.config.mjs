/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  basePath: "/mng",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.amnesty.mn",
      },
      {
        protocol: "https",
        hostname: "amnesty-cdn2.sgp1.digitaloceanspaces.com",
      },
    ],
    unoptimized: true,
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
