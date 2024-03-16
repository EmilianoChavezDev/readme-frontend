/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://readme-backend.fly.dev",
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
