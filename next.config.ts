import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    domains: ["media.discordapp.net", "lh3.googleusercontent.com"],
  },
  async redirects() {
    return [
      {
        source: "/designs",
        destination: "/designs/all",
        permanent: true,
      },
    ];
  },
};

export default withAnalyzer(nextConfig);
