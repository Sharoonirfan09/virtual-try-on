import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The try-on route reads garment reference images from /public on the server.
  outputFileTracingIncludes: {
    "/api/try-on": ["./public/garments/**/*"],
  },
};

export default nextConfig;
