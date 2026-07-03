// ============================================
// src/state/store.js
// Central state with publish/subscribe
// Replaces React's useState + useEffect
// ============================================

import { getCart, saveCart } from "../utils/storage.js";
import { DEFAULT_LAYOUT } from "../config/constants.js";
import { products as fallbackProducts } from "../data/fallback.js";

const state = {
  view: "home",
  products: fallbackProducts,
  loading: false,
  productsLoading: false,
  cart: getCart(),
  isCartOpen: false,
  sectionOrder: [...DEFAULT_LAYOUT],
  activeSection: "home",
  selectedProduct: null,
  isMobileMenuOpen: false,
};

const subscribers = {};

export function subscribe(key, callback) {
  if (!subscribers[key]) subscribers[key] = [];
  subscribers[key].push(callback);
  return () => {
    subscribers[key] = subscribers[key].filter((fn) => fn !== callback);
  };
}

function notify(key, newValue, oldValue) {
  if (!subscribers[key]) return;
  for (const fn of subscribers[key]) {
    try {
      fn(newValue, oldValue);
    } catch (err) {
      console.error(`Store subscriber error (${key}):`, err);
    }
  }
}

export function getState() {
  return { ...state };
}

export function get(key) {
  return state[key];
}

export function set(key, value) {
  const oldValue = state[key];
  state[key] = value;
  notify(key, value, oldValue);
}

// --- Cart actions ---

export function addToCart(product) {
  if (!product.inStock) return false;
  const existing = state.cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    state.cart = [...state.cart, { ...product, quantity: 1 }];
  }
  saveCart(state.cart);
  set("cart", [...state.cart]);
  set("isCartOpen", true);
  return true;
}

export function updateQuantity(id, delta) {
  state.cart = state.cart.map((item) => {
    if (item.id !== id) return item;
    const newQty = item.quantity + delta;
    if (newQty < 1) return item;
    return { ...item, quantity: newQty };
  });
  saveCart(state.cart);
  set("cart", [...state.cart]);
}

export function removeFromCart(id) {
  state.cart = state.cart.filter((item) => item.id !== id);
  saveCart(state.cart);
  set("cart", [...state.cart]);
}

export function getCartTotal() {
  return state.cart.reduce(
    (sum, item) => sum + (item.displayPrice || item.price) * item.quantity,
    0,
  );
}

export function getCartCount() {
  return state.cart.length;
}

export function clearCartState() {
  state.cart = [];
  saveCart([]);
  set("cart", []);
}

// --- View / navigation ---

export function setView(view) {
  set("view", view);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function toggleCart(force) {
  const isOpen = force !== undefined ? force : !state.isCartOpen;
  set("isCartOpen", isOpen);
}

export function toggleMobileMenu(force) {
  const isOpen = force !== undefined ? force : !state.isMobileMenuOpen;
  set("isMobileMenuOpen", isOpen);
}

export function setSelectedProduct(product) {
  set("selectedProduct", product);
}
