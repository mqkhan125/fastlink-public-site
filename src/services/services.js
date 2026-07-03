// ============================================
// src/services/services.js
// Customer-facing services APIs
// ============================================

import api from "./api.js";

/**
 * Get all active services
 * GET /api/services/active
 * @returns {Promise}
 */
export function getActiveServices() {
  return api.get("/services/active");
}
