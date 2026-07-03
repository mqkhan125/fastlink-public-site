// ============================================
// src/config/env.js
// Centralized environment configuration
// Reads from Vite's import.meta.env
// ============================================

const env = {
  API_BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",

  // Site info
  SITE_NAME: "Fast Link",
  SITE_TAGLINE: "Industrial Supplies",

  // External URLs
  LOGO_URL: "https://fastlinksc.net/images/logo.jpg",
};

export default env;
