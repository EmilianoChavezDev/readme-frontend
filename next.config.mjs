/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://127.0.0.1:4000",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
