// ============================================
// src/services/clients.js
// Customer-facing client APIs
// ============================================

import api from "./api.js";

/**
 * Get all active clients (with logos)
 * GET /api/clients/active
 * @returns {Promise}
 */
export function getActiveClients() {
  return api.get("/clients/active");
}
