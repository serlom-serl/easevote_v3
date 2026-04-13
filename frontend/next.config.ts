import type { NextConfig } from "next";

const CSP = [
  "default-src 'self'",
  // Next.js requires 'unsafe-inline' and 'unsafe-eval' for hydration and dynamic imports
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.paystack.co",
  // Tailwind + framer-motion use inline styles extensively
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://res.cloudinary.com https://lh3.googleusercontent.com https://e-voting-and-ticketing-backend.onrender.com",
  "font-src 'self' data:",
  "connect-src 'self' https://e-voting-and-ticketing-backend.onrender.com https://api.paystack.co",
  // Paystack embeds a checkout frame
  "frame-src https://checkout.paystack.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Camera allowed for QR scanner on organizer scan page
  { key: "Permissions-Policy", value: "camera=(self), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'e-voting-and-ticketing-backend.onrender.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
