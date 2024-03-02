/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [     // TODO: remove at ticket end
          {
            protocol: 'https',
            hostname: 'm.media-amazon.com'
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com'
          }
        ]
    },
    env: {
        API_URL: 'http://127.0.0.1:4000/',
      },

};

export default nextConfig;
