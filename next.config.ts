import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  logging: {
    incomingRequests: Bun.env.NODE_ENV === "production",
    fetches: {
      fullUrl: Bun.env.NODE_ENV === "production",
      hmrRefreshes: Bun.env.NODE_ENV === "production",
    },
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["*.gui.dev.br"],
    },
  },
};

export default nextConfig;
