// ============================================
// src/services/layout.js
// Homepage section layout order API
// ============================================

import api from "./api.js";

/**
 * Get the homepage section display order
 * GET /api/layout-order
 * @returns {Promise}
 */
export function getLayoutOrder() {
  return api.get("/layout-order");
}
