// ============================================
// src/components/cart/Checkout.js
// Checkout page — customer form + order summary
// Replaces: src/components/cart/Checkout.jsx
// ============================================

import { smallSpinner } from "../../ui/loading.js";
import { formatPKR } from "../../utils/format.js";
import { get, getCartTotal, clearCartState } from "../../state/store.js";
import { createOrder } from "../../services/orders.js";
import { navigate } from "../../router/router.js";
import { toast } from "../../ui/toast.js";
import { confirmDialog } from "../../ui/modal.js";

/**
 * Render checkout page HTML
 * @returns {string}
 */
export function renderCheckoutPage() {
  return `
    <div id="checkout-page" class="min-h-screen bg-slate-50 py-20 px-6">
      <div class="max-w-4xl mx-auto">

        <!-- Back button -->
        <button
          id="checkout-back-btn"
          class="text-blue-600 mb-6 hover:underline font-medium cursor-pointer"
        >
          &larr; Back to Home
        </button>

        <h1 class="text-4xl font-bold text-blue-950 mb-8">Checkout</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

          <!-- Customer Details Form -->
          <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 class="text-xl font-bold text-slate-900 mb-6">Your Details</h2>
            <form id="checkout-form" class="space-y-5" novalidate>
              <input
                type="text"
                name="customerName"
                required
                class="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                placeholder="Full Name *"
              />
              <input
                type="email"
                name="customerEmail"
                required
                class="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                placeholder="Email Address *"
              />
              <input
                type="tel"
                name="customerPhone"
                required
                class="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                placeholder="Phone Number *"
              />
              <input
                type="text"
                name="company"
                class="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-blue-500"
                placeholder="Company Name"
              />
              <button
                type="submit"
                id="checkout-submit-btn"
                class="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                <span id="checkout-btn-icon"></span>
                <span id="checkout-btn-label">Place Order</span>
              </button>
            </form>
          </div>

          <!-- Order Summary -->
          <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100 h-fit">
            <h2 class="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
            <div id="checkout-summary" class="space-y-3"></div>
          </div>

        </div>
      </div>
    </div>
  `;
}

/**
 * Initialize checkout page — render summary, bind form
 */
export function initCheckoutPage() {
  const backBtn = document.getElementById("checkout-back-btn");
  const form = document.getElementById("checkout-form");
  const submitBtn = document.getElementById("checkout-submit-btn");
  const btnIcon = document.getElementById("checkout-btn-icon");
  const btnLabel = document.getElementById("checkout-btn-label");
  const summaryEl = document.getElementById("checkout-summary");

  // Back button
  if (backBtn) {
    backBtn.addEventListener("click", () => navigate("home"));
  }

  // Render order summary
  renderSummary();

  // Form submit
  if (form) {
    form.addEventListener("submit", handleSubmit);
  }

  // --- Helpers ---

  function renderSummary() {
    if (!summaryEl) return;

    const cart = get("cart") || [];
    const total = getCartTotal();

    if (cart.length === 0) {
      summaryEl.innerHTML = `
        <p class="text-gray-400 text-sm text-center py-4">Your cart is empty.</p>
      `;
      if (submitBtn) submitBtn.disabled = true;
      return;
    }

    // Update button label with total
    if (btnLabel)
      btnLabel.textContent = `Place Order - Rs. ${formatPKR(total)}`;

    const itemsHtml = cart
      .map((item) => {
        const price = item.displayPrice || item.price;
        const lineTotal = price * item.quantity;
        return `
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">${item.name} x${item.quantity}</span>
            <span class="font-medium">Rs. ${formatPKR(lineTotal)}</span>
          </div>
        `;
      })
      .join("");

    summaryEl.innerHTML = `
      ${itemsHtml}
      <div class="border-t pt-3 mt-3 flex justify-between font-bold text-lg">
        <span>Total</span>
        <span class="text-blue-900">Rs. ${formatPKR(total)}</span>
      </div>
    `;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const name = form.customerName.value.trim();
    const email = form.customerEmail.value.trim();
    const phone = form.customerPhone.value.trim();
    const company = form.company.value.trim();

    // Validation
    if (!name || !email || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    const cart = get("cart") || [];
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Confirm
    const confirmed = await confirmDialog({
      title: "Confirm Order",
      content: `<p class="text-gray-600">Are you sure you want to place this order?</p>`,
      confirmText: "Place Order",
    });

    if (!confirmed) return;

    // Loading state
    submitBtn.disabled = true;
    btnIcon.innerHTML = smallSpinner(20);
    btnLabel.textContent = "Processing Order...";

    try {
      const orderData = {
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        company,
        items: cart.map((item) => ({
          product_id: item.id,
          name: item.name,
          price: item.displayPrice || item.price,
          quantity: item.quantity,
        })),
      };

      await createOrder(orderData);

      toast.success("Order placed successfully!");

      // Clear cart and redirect
      clearCartState();
      navigate("home");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      submitBtn.disabled = false;
      btnIcon.innerHTML = "";
      renderSummary();
    }
  }
}
