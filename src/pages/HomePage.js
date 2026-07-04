// ============================================
// src/pages/HomePage.js
// Assembles Hero + ordered home sections
// Replaces: home view in App.jsx
// ============================================

import { get, set as setState } from "../state/store.js";
import { getStoreProducts } from "../services/products.js";
import { getLayoutOrder } from "../services/layout.js";
import { getDiscountedPrice } from "../utils/format.js";
import { products as fallbackProducts } from "../data/fallback.js";
import { DEFAULT_LAYOUT, SECTION_KEYS } from "../config/constants.js";

// Section render + init functions (imported lazily to avoid circular deps)
import {
  renderHeroSection,
  initHeroSection,
} from "../components/home/HeroSection.js";
import { renderAboutSection } from "../components/home/AboutSection.js";
import { renderWhyChooseUsSection } from "../components/home/WhyChooseUsSection.js";
import {
  renderServicesSection,
  initServicesSection,
} from "../components/home/ServicesSection.js";
import {
  renderCompaniesSection,
  initCompaniesSection,
} from "../components/home/CompaniesSection.js";
import {
  renderContactSection,
  initContactSection,
} from "../components/home/ContactSection.js";

// Maps section_name from DB → render + init functions
const SECTION_RENDERERS = {
  [SECTION_KEYS.ABOUT]: {
    render: renderAboutSection,
    init: null,
  },
  [SECTION_KEYS.SERVICES]: {
    render: renderServicesSection,
    init: initServicesSection,
  },
  [SECTION_KEYS.WHY_CHOOSE_US]: {
    render: renderWhyChooseUsSection,
    init: null,
  },
  [SECTION_KEYS.CLIENTS]: {
    render: renderCompaniesSection,
    init: initCompaniesSection,
  },
  [SECTION_KEYS.CONTACT]: {
    render: renderContactSection,
    init: initContactSection,
  },
};

/**
 * Render the home page HTML
 * @returns {string}
 */
export function renderHomePage() {
  // Initial render: Hero + default sections in default order
  let sectionsHtml = "";
  for (const sectionName of DEFAULT_LAYOUT) {
    const renderer = SECTION_RENDERERS[sectionName];
    if (renderer) {
      sectionsHtml += renderer.render();
    }
  }

  return `
    <div id="home">
      ${renderHeroSection()}
      ${sectionsHtml}
    </div>
  `;
}

/**
 * Initialize home page — fetch products, layout, init sections
 */
export async function initHomePage() {
  // 1. Fetch products in background (for cart/add-to-cart)
  fetchProducts();

  // 2. Init hero
  initHeroSection();

  // 3. Init sections that need API data
  initServicesSection();
  initCompaniesSection();
  initContactSection();

  // 4. Fetch layout order and re-render sections if different
  fetchLayoutOrder();
}

// =============================================
// Background tasks
// =============================================

async function fetchProducts() {
  try {
    const res = await getStoreProducts();
    const apiProducts = res.data.data || res.data;

    if (apiProducts && apiProducts.length > 0) {
      const mapped = apiProducts.map((p) => ({
        ...p,
        displayPrice: getDiscountedPrice(p.price, p.discount || 0),
        inStock: (p.stock_quantity || 0) > 0,
      }));
      setState("products", mapped);
    }
  } catch (err) {
    console.error("Failed to load products from server, using fallback data");
  }
}

async function fetchLayoutOrder() {
  try {
    const res = await getLayoutOrder();
    const data = res.data.data || res.data;

    if (Array.isArray(data) && data.length > 0) {
      const order = data
        .sort((a, b) => a.display_order - b.display_order)
        .map((s) => s.section_name);

      // Check if order differs from default
      const isDifferent = order.some((name, i) => name !== DEFAULT_LAYOUT[i]);

      if (isDifferent) {
        setState("sectionOrder", order);
        rerenderSections(order);
      }
    }
  } catch (err) {
    console.error("Failed to load section layout, using default order");
  }
}

/**
 * Re-render sections in a new order
 * @param {string[]} sectionNames
 */
function rerenderSections(sectionNames) {
  const homeContainer = document.getElementById("home");
  if (!homeContainer) return;

  // Keep the hero section (first child)
  const heroEl = homeContainer.firstElementChild;

  // Remove all section children except hero
  while (homeContainer.children.length > 1) {
    homeContainer.removeChild(homeContainer.lastChild);
  }

  // Re-render sections in new order
  for (const sectionName of sectionNames) {
    const renderer = SECTION_RENDERERS[sectionName];
    if (renderer) {
      const temp = document.createElement("div");
      temp.innerHTML = renderer.render();
      while (temp.firstElementChild) {
        homeContainer.appendChild(temp.firstElementChild);
      }
    }
  }

  // Re-init dynamic sections
  initServicesSection();
  initCompaniesSection();
  initContactSection();
}
