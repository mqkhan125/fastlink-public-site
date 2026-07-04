// ============================================
// src/pages/ProductsPage.js
// Thin wrapper — delegates to ProductsPage component
// ============================================

import {
  renderProductsPage,
  initProductsPage,
} from "../components/products/ProductsPage.js";

/**
 * Render products page HTML
 * @returns {string}
 */
export function renderProductsPageView() {
  return renderProductsPage();
}

/**
 * Initialize products page
 */
export async function initProductsPageView() {
  await initProductsPage();
}
