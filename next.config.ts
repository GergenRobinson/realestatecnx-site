import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "images.pexels.com" }] },
  async redirects() {
    // Keep old Hostinger URLs working after the move.
    return [
      { source: "/blog", destination: "/learn", permanent: true },
      { source: "/az-snap-market-update", destination: "/markets/arizona", permanent: true },
      { source: "/online-presence-prompt-generator", destination: "/tools/online-presence", permanent: true },
      { source: "/brand-guide-prompt-engine", destination: "/tools/brand-guide", permanent: true },
      { source: "/portrait-prompt-builder", destination: "/tools/portrait", permanent: true },
    ];
  },
};

export default nextConfig;
