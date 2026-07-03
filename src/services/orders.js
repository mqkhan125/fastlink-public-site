// ============================================
// src/services/orders.js
// Customer-facing order APIs
// ============================================

import api from "./api.js";

/**
 * Place a new order
 * POST /api/orders
 * @param {object} data — { customer_name, customer_email, customer_phone, company, items[] }
 * @returns {Promise}
 */
export function createOrder(data) {
  return api.post("/orders", data);
}

/**
 * Track an order by ID (future)
 * GET /api/orders/:id
 * @param {string|number} id
 * @returns {Promise}
 */
export function getOrderById(id) {
  return api.get(`/orders/${id}`);
}
