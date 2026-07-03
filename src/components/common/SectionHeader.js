// ============================================
// src/components/common/SectionHeader.js
// Reusable section title + subtitle
// ============================================

/**
 * @param {object} options
 * @param {string} options.title
 * @param {string} [options.subtitle=""]
 * @param {string} [options.className=""]
 * @param {string} [options.align="center"] — "center" | "left"
 * @returns {string}
 */
export function renderSectionHeader({
  title,
  subtitle = "",
  className = "",
  align = "center",
} = {}) {
  const alignClass = align === "left" ? "text-left" : "text-center";
  let subtitleHTML = "";
  if (subtitle) {
    subtitleHTML = `<p class="text-slate-600 max-w-2xl mx-auto ${align === "left" ? "mx-0" : ""}">${subtitle}</p>`;
  }
  return `
    <div class="mb-12 ${alignClass} ${className}">
      <h2 class="text-4xl font-bold text-blue-950 mb-4">${title}</h2>
      ${subtitleHTML}
    </div>
  `;
}
