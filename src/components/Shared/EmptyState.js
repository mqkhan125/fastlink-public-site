// ============================================
// src/components/shared/EmptyState.js
// Reusable empty state display
// ============================================

import { cartIcon } from "../../ui/icons.js";

/**
 * @param {object} options
 * @param {string} [options.icon="cart"]
 * @param {string} options.message
 * @param {string} [options.subMessage=""]
 * @param {string} [options.actionLabel=""]
 * @param {string} [options.actionHash=""]
 * @returns {string}
 */
export function renderEmptyState({
  icon = "cart",
  message,
  subMessage = "",
  actionLabel = "",
  actionHash = "",
} = {}) {
  const iconHTML = getIconHTML(icon);

  let actionBtn = "";
  if (actionLabel && actionHash) {
    actionBtn = `
      <a href="#${actionHash}" class="mt-6 inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors">
        ${actionLabel}
      </a>
    `;
  }

  return `
    <div class="flex flex-col items-center justify-center py-20 text-gray-400">
      <div class="mb-4 opacity-20">${iconHTML}</div>
      <p class="text-gray-500 font-medium">${message}</p>
      ${subMessage ? `<p class="text-gray-400 text-sm mt-1">${subMessage}</p>` : ""}
      ${actionBtn}
    </div>
  `;
}

function getIconHTML(type) {
  switch (type) {
    case "cart":
      return cartIcon({ size: 48 });
    case "search":
      return `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`;
    case "orders":
      return `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>`;
    case "heart":
      return `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`;
    default:
      return cartIcon({ size: 48 });
  }
}
