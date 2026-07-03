// ============================================
// src/components/shared/BackButton.js
// "← Back to Home" button
// ============================================

import { arrowLeftIcon } from "../../ui/icons.js";

/**
 * @param {object} [options]
 * @param {string} [options.label="Back to Home"]
 * @param {Function} [options.onClick]
 * @returns {string}
 */
export function renderBackButton({ label = "Back to Home", onClick } = {}) {
  return `
    <button
      id="back-btn"
      class="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mb-8 transition-colors cursor-pointer"
    >
      ${arrowLeftIcon({ size: 18 })}
      ${label}
    </button>
  `;
}

/**
 * Bind click event
 * @param {Function} [onClick] — if not provided, navigates to #home
 */
export function bindBackButton(onClick) {
  const btn = document.getElementById("back-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    if (onClick) {
      onClick();
    } else {
      window.location.hash = "#home";
    }
  });
}
