import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  output: "export",
  poweredByHeader: false,
  trailingSlash: true,
};

export default nextConfig;
