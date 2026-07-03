// ============================================
// src/services/api.js
// Axios instance — customer-facing only
// Admin-specific 401 redirect REMOVED
// ============================================

import axios from "axios";
import env from "../config/env.js";

const api = axios.create({
  baseURL: env.API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor — attach customer token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("fastlink_user_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handle 401 for customer
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only clear customer tokens, NOT admin tokens
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("fastlink_user_token");
      localStorage.removeItem("fastlink_user_data");
    }
    return Promise.reject(error);
  },
);

export default api;
