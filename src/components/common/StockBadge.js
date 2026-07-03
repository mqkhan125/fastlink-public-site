// ============================================
// src/components/common/StockBadge.js
// Stock status badge
// ============================================

import { getStockBadge } from "../../utils/format.js";

/**
 * @param {object} options
 * @param {number} options.quantity
 * @param {number} [options.low_stock_threshold=5]
 * @returns {string}
 */
export function renderStockBadge({ quantity, low_stock_threshold = 5 } = {}) {
  const { text, color } = getStockBadge(quantity, low_stock_threshold);
  const threshold = low_stock_threshold;

  let dotColor = "bg-green-500";
  if (quantity <= 0) {
    dotColor = "bg-red-500";
  } else if (quantity <= threshold) {
    dotColor = "bg-yellow-500";
  }

  return `
    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}">
      <span class="w-1.5 h-1.5 rounded-full mr-1.5 ${dotColor}"></span>
      ${text}
    </span>
  `;
}
