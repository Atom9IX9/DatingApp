/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: ["src/`shared/styles"],
  },
  images: {
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5001",
        pathname: "/static/images/**",
      },
    ],
  },
};

export default nextConfig;
