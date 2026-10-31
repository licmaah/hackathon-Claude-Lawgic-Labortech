import type { NextConfig } from "next";

// El sitio es estático para GitHub Pages; lo dinámico vive en Supabase.
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || undefined,
  images: { unoptimized: true },
  devIndicators: false
};

export default config;
