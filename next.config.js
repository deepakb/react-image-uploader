/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/upload",
        destination: "/api/upload",
      },
    ];
  },
};

module.exports = nextConfig;
