import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The approved sitemap and canonical metadata use a trailing slash on every
  // route (e.g. "/contact/", not "/contact"). This must stay on so generated
  // routes, canonical tags and the sitemap agree with each other.
  trailingSlash: true,

  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
