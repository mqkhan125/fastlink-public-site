// ============================================
// src/pages/CheckoutPage.js
// Thin wrapper — delegates to Checkout component
// ============================================

import {
  renderCheckoutPage,
  initCheckoutPage,
} from "../components/cart/Checkout.js";

/**
 * Render checkout page HTML
 * @returns {string}
 */
export function renderCheckoutPageView() {
  return renderCheckoutPage();
}

/**
 * Initialize checkout page
 */
export async function initCheckoutPageView() {
  initCheckoutPage();
}
