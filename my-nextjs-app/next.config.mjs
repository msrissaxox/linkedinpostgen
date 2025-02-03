// next.config.mjs
import { config } from "dotenv";
config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
  },
};

export default nextConfig;
