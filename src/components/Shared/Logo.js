// ============================================
// src/components/shared/Logo.js
// FastLink logo with click handler
// ============================================

import env from "../../config/env.js";
import { navigate } from "../../router/router.js";

/**
 * @returns {string} — HTML string for the logo
 */
export function renderLogo() {
  return `
    <div id="site-logo" class="flex items-center cursor-pointer">
      <img
        src="${env.LOGO_URL}"
        alt="Fast Link"
        class="h-10 w-auto rounded-md object-contain"
      />
    </div>
  `;
}

/**
 * Bind click event on the logo element
 * Call this after rendering the logo
 */
export function bindLogoEvents() {
  const logo = document.getElementById("site-logo");
  if (!logo) return;

  logo.addEventListener("click", () => {
    navigate("home");
    setTimeout(() => {
      const el = document.getElementById("home");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  });
}
