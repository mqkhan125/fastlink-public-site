// ============================================
// src/services/hero.js
// Customer-facing hero content APIs
// ============================================

import api from "./api.js";

/**
 * Get active hero banner content
 * GET /api/hero/active
 * @returns {Promise}
 */
export function getActiveHeroContent() {
  return api.get("/hero/active");
}
