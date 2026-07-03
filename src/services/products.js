// ============================================
// src/services/products.js
// Customer-facing product APIs
// ============================================

import api from "./api.js";

/**
 * Get all active store products
 * GET /api/products
 * @returns {Promise}
 */
export function getStoreProducts() {
  return api.get("/products");
}
