// ============================================
// src/services/auth.js
// Customer auth APIs (future: Login/Register)
// ============================================

import api from "./api.js";

/**
 * Customer login
 * POST /api/auth/customer/login
 * @param {object} data — { email, password }
 * @returns {Promise}
 */
export function customerLogin(data) {
  return api.post("/auth/customer/login", data);
}

/**
 * Customer register
 * POST /api/auth/customer/register
 * @param {object} data — { name, email, phone, password }
 * @returns {Promise}
 */
export function customerRegister(data) {
  return api.post("/auth/customer/register", data);
}

/**
 * Get current customer profile
 * GET /api/auth/customer/profile
 * @returns {Promise}
 */
export function getCustomerProfile() {
  return api.get("/auth/customer/profile");
}

/**
 * Update customer profile
 * PUT /api/auth/customer/profile
 * @param {object} data
 * @returns {Promise}
 */
export function updateCustomerProfile(data) {
  return api.put("/auth/customer/profile", data);
}
