import type { NextConfig } from "next";

// Exportação estática: gera a pasta "out/" pronta para o public_html da Hostinger (plano Premium, sem Node.js).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
