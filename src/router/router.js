// ============================================
// src/router/router.js
// Hash-based SPA router
// ============================================

import { getElement, renderHTML } from "../utils/dom.js";
import routes from "./routes.js";

const PAGE_CONTAINER_ID = "page-container";

let currentRoute = null;

/**
 * Navigate to a hash route
 * @param {string} path — e.g. "products", "checkout", "home"
 * @param {object} [params={}] — optional data passed to route
 */
export function navigate(path, params = {}) {
  window.location.hash = `#${path}`;
  window.__routeParams = params;
}

/**
 * Go back to previous hash
 */
export function goBack() {
  window.history.back();
}

/**
 * Get current route path (without #)
 * @returns {string}
 */
export function getCurrentPath() {
  return window.location.hash.replace("#", "") || "home";
}

/**
 * Match a path against registered routes
 * @param {string} path
 * @returns {object|null}
 */
function matchRoute(path) {
  if (routes[path]) return routes[path];
  if (routes["*"]) return routes["*"];
  return null;
}

/**
 * Render the current route
 */
async function handleRouteChange() {
  const path = getCurrentPath();
  const route = matchRoute(path);
  const container = getElement(PAGE_CONTAINER_ID);

  if (!container || !route) return;

  window.scrollTo({ top: 0, behavior: "instant" });

  // SEO: update title
  if (route.title) {
    document.title = `${route.title} | Fast Link`;
  }

  // SEO: update meta description
  if (route.description) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = route.description;
  }

  // onEnter hook (data pre-fetching, etc.)
  if (route.onEnter) {
    await route.onEnter(window.__routeParams || {});
    window.__routeParams = {};
  }

  // Render the page
  const html = route.render ? route.render() : "";
  renderHTML(container, html);

  // onAfterRender hook (bind events after DOM exists)
  if (route.onAfterRender) {
    route.onAfterRender();
  }

  currentRoute = path;
}

/**
 * Initialize router — call once from main.js
 */
export function initRouter() {
  window.addEventListener("hashchange", handleRouteChange);

  if (!window.location.hash) {
    window.location.hash = "#home";
  } else {
    handleRouteChange();
  }
}

/**
 * Get current route config
 * @returns {object|null}
 */
export function getCurrentRoute() {
  return routes[getCurrentPath()] || null;
}
