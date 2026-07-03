// ============================================
// src/utils/storage.js
// Safe localStorage wrapper
// ============================================

import { STORAGE_KEYS } from "../config/constants.js";

export function getStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function setStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn(`Failed to save to localStorage: ${key}`);
  }
}

export function removeStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // silent
  }
}

// --- Cart helpers ---

export function getCart() {
  return getStorage(STORAGE_KEYS.CART, []);
}

export function saveCart(cart) {
  setStorage(STORAGE_KEYS.CART, cart);
}

export function clearCart() {
  removeStorage(STORAGE_KEYS.CART);
}

// --- User helpers (future Login/Register) ---

export function getUser() {
  return getStorage(STORAGE_KEYS.USER_DATA, null);
}

export function setUser(user) {
  setStorage(STORAGE_KEYS.USER_DATA, user);
}

export function getUserToken() {
  return getStorage(STORAGE_KEYS.USER_TOKEN, null);
}

export function setUserToken(token) {
  setStorage(STORAGE_KEYS.USER_TOKEN, token);
}

export function clearUser() {
  removeStorage(STORAGE_KEYS.USER_TOKEN);
  removeStorage(STORAGE_KEYS.USER_DATA);
}
