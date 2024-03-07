/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "https://readmeapp.fly.dev",
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
