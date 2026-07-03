// ============================================
// src/components/common/PriceDisplay.js
// Price with discount badge
// ============================================

import { formatPKR, getDiscountedPrice } from "../../utils/format.js";

/**
 * @param {object} options
 * @param {number} options.price
 * @param {number} [options.discount=0]
 * @param {string} [options.size="md"] — "sm" | "md" | "lg"
 * @returns {string}
 */
export function renderPriceDisplay({ price, discount = 0, size = "md" } = {}) {
  const sizes = {
    sm: { original: "text-xs", current: "text-sm", badge: "text-[10px]" },
    md: { original: "text-sm", current: "text-lg", badge: "text-xs" },
    lg: { original: "text-base", current: "text-2xl", badge: "text-sm" },
  };

  const s = sizes[size] || sizes.md;
  const hasDiscount = discount && discount > 0;
  const discountedPrice = hasDiscount
    ? getDiscountedPrice(price, discount)
    : price;

  let originalHTML = "";
  let badgeHTML = "";

  if (hasDiscount) {
    originalHTML = `
      <span class="text-gray-400 line-through ${s.original}">${formatPKR(price)}</span>
    `;
    badgeHTML = `
      <span class="${s.badge} bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-semibold">-${discount}%</span>
    `;
  }

  return `
    <div class="flex items-center gap-2 flex-wrap">
      <span class="font-bold text-blue-900 ${s.current}">${formatPKR(discountedPrice)}</span>
      ${originalHTML}
      ${badgeHTML}
    </div>
  `;
}
