// ============================================
// src/services/contacts.js
// Customer-facing contact APIs
// ============================================

import api from "./api.js";

/**
 * Submit a contact message
 * POST /api/contacts
 * @param {object} data — { name, email, company, message }
 * @returns {Promise}
 */
export function createContact(data) {
  return api.post("/contacts", data);
}
