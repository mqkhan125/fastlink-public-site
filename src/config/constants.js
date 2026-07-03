// ============================================
// src/config/constants.js
// All hardcoded values, default configs, and
// static data used across the application
// ============================================

// Navigation items for the Navbar
export const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Clients", id: "clients" },
  { label: "About", id: "about" },
  { label: "Products", id: "products" },
  { label: "Contact", id: "contact" },
];

// Section IDs that the scroll-tracker watches
export const SCROLL_SECTIONS = [
  "home",
  "services",
  "clients",
  "about",
  "contact",
];

// Default homepage section order (fallback if API fails)
export const DEFAULT_LAYOUT = [
  "About",
  "Our Services",
  "WhyChooseUs",
  "Clients",
  "Get in Touch",
];

// Maps section_name from DB to JS render function keys
export const SECTION_KEYS = {
  ABOUT: "About",
  SERVICES: "Our Services",
  WHY_CHOOSE_US: "WhyChooseUs",
  CLIENTS: "Clients",
  CONTACT: "Get in Touch",
};

// LocalStorage keys
export const STORAGE_KEYS = {
  CART: "fastlink_cart",
  USER_TOKEN: "fastlink_user_token",
  USER_DATA: "fastlink_user_data",
};

// Placeholder images
export const PLACEHOLDER_IMG =
  "https://placehold.co/400x300/E2E8F0/64748b?text=No+Img";
export const PLACEHOLDER_IMG_SQUARE =
  "https://placehold.co/400x400/E2E8F0/64748b?text=No+Img";

// Contact info (Footer & Contact page)
export const CONTACT_INFO = {
  email: "info@fastlinksc.net",
  phone: "021 3227 5825",
  phoneLink: "tel:+922132275825",
  address:
    "Office # B/207, New Challi Trade Centre, Shahrah-e-Liaquat, Karachi",
  addressShort: "Industrial Area, Karachi, Pakistan",
  phoneFull: "+92 (21) 111 222 333",
  phoneFullLink: "tel:+9221111222333",
  hours: "Mon-Sat: 10AM - 8PM",
};

// Maps backend icon name → icons.js function name
export const SERVICE_ICON_MAP = {
  Wrench: "wrench",
  ShieldCheck: "shieldCheck",
  Truck: "truck",
  Headphones: "headphones",
  Award: "award",
  Settings: "settings",
  ArrowRight: "arrowRight",
  Zap: "wrench",
  Package: "settings",
  Tool: "wrench",
  Cog: "settings",
  Star: "award",
  Shield: "shieldCheck",
  Headset: "headphones",
  Delivery: "truck",
  DeliveryTruck: "truck",
};

// Default hero content (fallback if API fails)
export const DEFAULT_HERO = {
  main_heading: "Powering Industries",
  sub_heading: "with Precision & Speed",
  description:
    "Fast Link is your authorized partner for high-grade mechanical parts, electrical supplies, and safety equipment. Innovating for a secure tomorrow.",
  button_text: "Explore Supplies",
  button_link: "#products",
  badge_text: "Trusted by 500+ Industrial Leaders",
};
