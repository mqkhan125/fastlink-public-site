// ============================================
// src/components/home/ServicesSection.js
// Fetches services from API, renders cards
// with icon mapping via SERVICE_ICON_MAP
// Replaces: src/components/sections/Services.jsx
// ============================================

import {
  wrenchIcon,
  shieldCheckIcon,
  truckIcon,
  headphonesIcon,
  awardIcon,
  settingsIcon,
} from "../../ui/icons.js";
import { SERVICE_ICON_MAP } from "../../config/constants.js";
import { getActiveServices } from "../../services/services.js";
import { servicesSkeleton } from "../../ui/loading.js";

// Map icon key string → icon function
const iconFunctions = {
  wrench: wrenchIcon,
  shieldCheck: shieldCheckIcon,
  truck: truckIcon,
  headphones: headphonesIcon,
  award: awardIcon,
  settings: settingsIcon,
};

/**
 * Get the SVG string for a service icon name
 * @param {string} iconName — e.g. "Wrench", "ShieldCheck"
 * @returns {string} — SVG HTML
 */
function getServiceIcon(iconName) {
  if (!iconName) return wrenchIcon({ size: 32 });
  const key = SERVICE_ICON_MAP[iconName] || "wrench";
  const fn = iconFunctions[key] || wrenchIcon;
  return fn({ size: 32 });
}

/**
 * Render a single service card
 * @param {object} service
 * @returns {string}
 */
function renderServiceCard(service) {
  const iconSvg = getServiceIcon(service.icon);
  const imageHtml = service.image
    ? `<img src="${service.image}" alt="${service.title}" class="mt-4 rounded-lg w-full h-32 object-cover" />`
    : "";

  return `
    <div class="bg-slate-50 p-8 rounded-xl border border-gray-100 text-center group hover:shadow-lg hover:border-blue-200 transition-all duration-300">
      <div class="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
        ${iconSvg}
      </div>
      <h3 class="text-xl font-bold text-slate-900 mb-3">${service.title}</h3>
      <p class="text-gray-500 text-sm leading-relaxed">${service.description}</p>
      ${imageHtml}
    </div>
  `;
}

/**
 * Render services section (initial HTML with skeleton)
 * @returns {string}
 */
export function renderServicesSection() {
  return `
    <section id="services" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold text-blue-950 mb-4">Our Services</h2>
        <p class="text-gray-500 mb-12 max-w-2xl mx-auto">
          Comprehensive industrial solutions tailored to meet the demands of
          modern businesses.
        </p>
        <div id="services-grid">
          ${servicesSkeleton()}
        </div>
      </div>
    </section>
  `;
}

/**
 * Fetch services from API and update grid
 * Call after rendering the section
 */
export async function initServicesSection() {
  const grid = document.getElementById("services-grid");
  if (!grid) return;

  try {
    const res = await getActiveServices();
    if (res.data.success && res.data.data && res.data.data.length > 0) {
      grid.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${res.data.data.map(renderServiceCard).join("")}
        </div>
      `;
      return;
    }
  } catch (err) {
    console.error("Failed to load services");
  }

  // No services found — hide entire section
  const section = grid.closest("section");
  if (section) section.style.display = "none";
}
