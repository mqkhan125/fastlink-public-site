// ============================================
// src/components/cart/CartDrawer.js
// Slide-in cart panel from the right
// Replaces: src/components/cart/CartDrawer.jsx
// ============================================

import {
  cartIcon,
  xIcon,
  trashIcon,
  plusIcon,
  minusIcon,
  creditCardIcon,
} from "../../ui/icons.js";
import { formatPKR } from "../../utils/format.js";
import {
  get,
  subscribe,
  updateQuantity,
  removeFromCart,
  getCartTotal,
  getCartCount,
  toggleCart,
} from "../../state/store.js";
import { navigate } from "../../router/router.js";

// Track if drawer is already initialized
let _initialized = false;
let _unsubscribe = null;

/**
 * Render the cart drawer HTML (once, in app layout)
 * Includes backdrop + sliding panel
 * @returns {string}
 */
export function renderCartDrawer() {
  return `
    <!-- Cart Backdrop -->
    <div id="cart-backdrop" class="fixed inset-0 bg-black/20 z-40 transition-opacity" style="display:none;"></div>

    <!-- Cart Drawer -->
    <div
      id="cart-drawer"
      class="fixed top-0 right-0 h-full w-full sm:max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 translate-x-full"
    >
      <div class="flex flex-col h-full">

        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 class="text-xl font-bold text-blue-900 flex items-center gap-2">
            ${cartIcon({ size: 22 })} Your Cart
            <span id="cart-drawer-count" class="text-sm font-normal text-gray-400"></span>
          </h2>
          <button id="cart-close-btn" class="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
            ${xIcon({ size: 20 })}
          </button>
        </div>

        <!-- Items -->
        <div id="cart-items" class="flex-1 overflow-y-auto p-6"></div>

        <!-- Footer -->
        <div id="cart-footer" class="p-6 bg-white border-t border-gray-100">
          <div class="flex justify-between mb-4">
            <span class="text-gray-500">Subtotal</span>
            <span id="cart-total" class="text-xl font-bold text-blue-900">Rs. 0</span>
          </div>
          <button
            id="cart-checkout-btn"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 font-bold text-lg rounded-lg disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            ${creditCardIcon({ size: 20 })} Checkout
          </button>
        </div>

      </div>
    </div>
  `;
}

/**
 * Initialize cart drawer — bind events + subscribe to cart changes
 * Call once after rendering the drawer in the layout
 */
export function initCartDrawer() {
  if (_initialized) return;
  _initialized = true;

  const backdrop = document.getElementById("cart-backdrop");
  const drawer = document.getElementById("cart-drawer");
  const closeBtn = document.getElementById("cart-close-btn");
  const checkoutBtn = document.getElementById("cart-checkout-btn");

  // Close handlers
  const close = () => toggleCart(false);
  if (backdrop) backdrop.addEventListener("click", close);
  if (closeBtn) closeBtn.addEventListener("click", close);

  // Checkout button
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      toggleCart(false);
      navigate("checkout");
    });
  }

  // Subscribe to cart state changes → re-render items
  _unsubscribe = subscribe("cart", () => renderCartItems());
  _unsubscribe = subscribe("isCartOpen", () => updateDrawerVisibility());

  // Initial render
  renderCartItems();
  updateDrawerVisibility();
}

/**
 * Render cart items list
 */
function renderCartItems() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("cart-checkout-btn");
  const countEl = document.getElementById("cart-drawer-count");

  if (!container) return;

  const cart = get("cart") || [];
  const total = getCartTotal();
  const count = getCartCount();

  // Update total
  if (totalEl) totalEl.textContent = `Rs. ${formatPKR(total)}`;

  // Update count badge
  if (countEl) countEl.textContent = count > 0 ? `(${count})` : "";

  // Disable checkout if empty
  if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;

  // Empty state
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center h-64 text-gray-400">
        <span class="mb-4 opacity-20">${cartIcon({ size: 48 })}</span>
        <p>Your cart is empty</p>
      </div>
    `;
    return;
  }

  // Render items
  container.innerHTML = `
    <div class="space-y-6">
      ${cart
        .map((item) => {
          const price = item.displayPrice || item.price;
          return `
            <div class="flex gap-4">
              <div class="h-20 w-20 rounded-lg overflow-hidden border bg-gray-50 shrink-0">
                <img
                  src="${item.image}"
                  alt="${item.name}"
                  class="h-full w-full object-cover"
                  onerror="this.src='https://placehold.co/80x80/E2E8F0/64748b?text=No+Img'"
                />
              </div>
              <div class="flex-grow">
                <h4 class="font-medium text-slate-900 text-sm mb-1">${item.name}</h4>
                <p class="text-blue-600 font-bold text-sm mb-2">
                  Rs. ${formatPKR(price)}
                </p>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2 bg-gray-100 rounded-md p-1">
                    <button
                      class="cart-qty-minus p-1 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      data-id="${item.id}"
                      ${item.quantity <= 1 ? "disabled" : ""}
                    >
                      ${minusIcon({ size: 14 })}
                    </button>
                    <span class="text-xs font-mono w-4 text-center">${item.quantity}</span>
                    <button
                      class="cart-qty-plus p-1 hover:text-blue-600 cursor-pointer"
                      data-id="${item.id}"
                    >
                      ${plusIcon({ size: 14 })}
                    </button>
                  </div>
                  <button
                    class="cart-remove text-gray-400 hover:text-red-500 cursor-pointer"
                    data-id="${item.id}"
                  >
                    ${trashIcon({ size: 17 })}
                  </button>
                </div>
              </div>
            </div>
          `;
        })
        .join("")}
    </div>
  `;

  // Bind item events (delegation)
  container.querySelectorAll(".cart-qty-minus").forEach((btn) => {
    btn.addEventListener("click", () => updateQuantity(btn.dataset.id, -1));
  });
  container.querySelectorAll(".cart-qty-plus").forEach((btn) => {
    btn.addEventListener("click", () => updateQuantity(btn.dataset.id, 1));
  });
  container.querySelectorAll(".cart-remove").forEach((btn) => {
    btn.addEventListener("click", () => removeFromCart(btn.dataset.id));
  });
}

/**
 * Show/hide drawer based on isCartOpen state
 */
function updateDrawerVisibility() {
  const backdrop = document.getElementById("cart-backdrop");
  const drawer = document.getElementById("cart-drawer");
  const isOpen = get("isCartOpen");

  if (backdrop) {
    backdrop.style.display = isOpen ? "block" : "none";
  }
  if (drawer) {
    if (isOpen) {
      drawer.classList.remove("translate-x-full");
      drawer.classList.add("translate-x-0");
      document.body.style.overflow = "hidden";
    } else {
      drawer.classList.remove("translate-x-0");
      drawer.classList.add("translate-x-full");
      document.body.style.overflow = "";
    }
  }
}

/**
 * Get current cart count (for navbar badge)
 * @returns {number}
 */
export function getCartBadgeCount() {
  return getCartCount();
}
