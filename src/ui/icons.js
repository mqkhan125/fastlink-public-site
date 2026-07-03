// ============================================
// src/ui/icons.js
// SVG icon functions — replaces lucide-react
// Usage: cartIcon({ size: 20, className: "text-blue-600" })
// ============================================

const defaults = { size: 24, className: "", strokeWidth: 2 };

function svg(content, { size = 24, className = "", strokeWidth = 2 } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="${className}">${content}</svg>`;
}

// Navigation
export function menuIcon(p = {}) {
  return svg(
    `<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>`,
    p,
  );
}
export function xIcon(p = {}) {
  return svg(`<path d="M18 6 6 18"/><path d="m6 6 12 12"/>`, p);
}
export function arrowLeftIcon(p = {}) {
  return svg(`<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>`, p);
}
export function arrowRightIcon(p = {}) {
  return svg(`<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>`, p);
}
export function chevronRightIcon(p = {}) {
  return svg(`<path d="m9 18 6-6-6-6"/>`, p);
}
export function chevronLeftIcon(p = {}) {
  return svg(`<path d="m15 18-6-6 6-6"/>`, p);
}

// Cart
export function cartIcon(p = {}) {
  return svg(
    `<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>`,
    p,
  );
}
export function trashIcon(p = {}) {
  return svg(
    `<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>`,
    p,
  );
}
export function creditCardIcon(p = {}) {
  return svg(
    `<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>`,
    p,
  );
}

// Quantity
export function plusIcon(p = {}) {
  return svg(`<path d="M5 12h14"/><path d="M12 5v14"/>`, p);
}
export function minusIcon(p = {}) {
  return svg(`<path d="M5 12h14"/>`, p);
}

// Products
export function eyeIcon(p = {}) {
  return svg(
    `<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>`,
    p,
  );
}
export function shoppingBagIcon(p = {}) {
  return svg(
    `<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>`,
    p,
  );
}

// Status
export function checkCircleIcon(p = {}) {
  return svg(
    `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>`,
    p,
  );
}
export function alertTriangleIcon(p = {}) {
  return svg(
    `<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>`,
    p,
  );
}

// Sections
export function targetIcon(p = {}) {
  return svg(
    `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>`,
    p,
  );
}
export function buildingIcon(p = {}) {
  return svg(
    `<rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/>`,
    p,
  );
}
export function trendingUpIcon(p = {}) {
  return svg(
    `<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>`,
    p,
  );
}

// Contact
export function mapPinIcon(p = {}) {
  return svg(
    `<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>`,
    p,
  );
}
export function phoneIcon(p = {}) {
  return svg(
    `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>`,
    p,
  );
}
export function mailIcon(p = {}) {
  return svg(
    `<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>`,
    p,
  );
}
export function clockIcon(p = {}) {
  return svg(
    `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`,
    p,
  );
}
export function sendIcon(p = {}) {
  return svg(`<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>`, p);
}

// Services
export function wrenchIcon(p = {}) {
  return svg(
    `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>`,
    p,
  );
}
export function shieldCheckIcon(p = {}) {
  return svg(
    `<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>`,
    p,
  );
}
export function truckIcon(p = {}) {
  return svg(
    `<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>`,
    p,
  );
}
export function headphonesIcon(p = {}) {
  return svg(
    `<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>`,
    p,
  );
}
export function awardIcon(p = {}) {
  return svg(
    `<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>`,
    p,
  );
}
export function settingsIcon(p = {}) {
  return svg(
    `<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>`,
    p,
  );
}

// Loading
export function loaderIcon(p = {}) {
  return svg(`<path d="M21 12a9 9 0 1 1-6.219-8.56"/>`, {
    ...p,
    className: (p.className || "") + " animate-spin",
  });
}
