// ============================================
// src/components/products/ProductCard.js
// Single product card with image, price, stock,
// view and add-to-cart buttons
// Replaces: src/components/products/ProductCard.jsx
// ============================================

import { eyeIcon, shoppingBagIcon } from "../../ui/icons.js";
import { renderPriceDisplay } from "../common/PriceDisplay.js";
import { renderStockBadge } from "../common/StockBadge.js";
import { PLACEHOLDER_IMG } from "../../config/constants.js";

/**
 * Render a product card
 * @param {object} product
 * @param {string|number} product.id
 * @param {string} product.name
 * @param {string} [product.description]
 * @param {number} product.price
 * @param {number} [product.discount=0]
 * @param {string} [product.image]
 * @param {number} [product.stock_quantity=0]
 * @param {boolean} [product.inStock=false]
 * @returns {string}
 */
export function renderProductCard(product) {
  const imgSrc = product.image || PLACEHOLDER_IMG;
  const discountBadge =
    product.discount > 0
      ? `<div class="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-bold shadow-sm">
           ${product.discount}% OFF
         </div>`
      : "";

  return `
    <div
      class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow flex flex-col h-full"
      data-product-id="${product.id}"
    >
      <!-- Image -->
      <div
        class="product-card-image relative aspect-video overflow-hidden bg-gray-50 cursor-pointer"
        data-product-id="${product.id}"
      >
        <img
          src="${imgSrc}"
          alt="${product.name}"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onerror="this.src='${PLACEHOLDER_IMG}'"
        />
        ${discountBadge}
        <div class="absolute top-3 right-3">
          ${renderStockBadge({ quantity: product.stock_quantity || 0 })}
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 flex flex-col flex-grow">
        <h3
          class="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-1 product-card-title"
          data-product-id="${product.id}"
        >
          ${product.name}
        </h3>
        <p class="text-gray-500 text-sm mb-6 flex-grow line-clamp-3">
          ${product.description || "High-quality industrial product by Fast Link."}
        </p>

        <div class="mt-auto space-y-4">
          ${renderPriceDisplay({
            price: product.price,
            discount: product.discount || 0,
          })}

          <div class="flex items-center gap-3">
            <button
              class="product-card-view flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-slate-700 hover:bg-gray-50 text-sm font-medium cursor-pointer"
              data-product-id="${product.id}"
            >
              ${eyeIcon({ size: 16 })} View
            </button>
            <button
              class="product-card-add flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold shadow-sm cursor-pointer ${!product.inStock ? "opacity-50 cursor-not-allowed" : ""}"
              data-product-id="${product.id}"
              ${!product.inStock ? "disabled" : ""}
            >
              ${shoppingBagIcon({ size: 16 })} ${product.inStock ? "Add" : "Stock Out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Bind click events on all product cards inside a container
 * @param {HTMLElement} container — parent element containing product cards
 * @param {object} handlers
 * @param {Function} handlers.onView — called with product id
 * @param {Function} handlers.onAddToCart — called with product object
 * @param {Function[]} [handlers.getProducts] — function returning product array (to look up product by id)
 */
export function bindProductCards(
  container,
  { onView, onAddToCart, getProducts },
) {
  // View buttons (image + title)
  container
    .querySelectorAll(
      ".product-card-image, .product-card-title, .product-card-view",
    )
    .forEach((el) => {
      el.addEventListener("click", () => {
        const id = el.dataset.productId;
        if (onView && id) onView(id);
      });
    });

  // Add to cart buttons
  container.querySelectorAll(".product-card-add").forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.dataset.productId;
      if (!onAddToCart || !id || !getProducts) return;
      const product = getProducts().find((p) => String(p.id) === String(id));
      if (product && product.inStock) onAddToCart(product);
    });
  });
}
