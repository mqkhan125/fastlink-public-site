// ============================================
// src/components/products/ProductsPage.js
// Products listing page with modal detail view
// Replaces: src/components/products/ProductsPage.jsx
// ============================================

import { xIcon, shoppingBagIcon } from "../../ui/icons.js";
import { renderPriceDisplay } from "../common/PriceDisplay.js";
import { renderStockBadge } from "../common/StockBadge.js";
import { renderProductCard, bindProductCards } from "./ProductCard.js";
import { productsSkeleton } from "../../ui/loading.js";
import { PLACEHOLDER_IMG } from "../../config/constants.js";
import { get, getState, addToCart } from "../../state/store.js";
import { navigate } from "../../router/router.js";
import { getStoreProducts } from "../../services/products.js";
import { toast } from "../../ui/toast.js";
import { renderEmptyState } from "../shared/EmptyState.js";

/**
 * Render the full products page HTML
 * @returns {string}
 */
export function renderProductsPage() {
  return `
    <div id="products-page" class="min-h-screen bg-slate-50 py-20 px-6">
      <div class="max-w-7xl mx-auto">

        <!-- Back button -->
        <button
          id="products-back-btn"
          class="text-blue-600 mb-8 hover:underline font-medium cursor-pointer"
        >
          Back to Home
        </button>

        <h2 class="text-4xl font-bold text-blue-950 mb-8">Our Supplies</h2>

        <!-- Products grid -->
        <div id="products-grid">
          ${productsSkeleton()}
        </div>

      </div>

      <!-- Product Detail Modal -->
      <div id="product-modal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 hidden" style="display:none;">
        <div
          id="product-modal-content"
          class="bg-white rounded-xl shadow-xl w-full max-w-3xl animate-modal overflow-hidden"
        >
          <div class="grid grid-cols-1 md:grid-cols-2">
            <!-- Image -->
            <div class="bg-gray-100 p-6 flex items-center justify-center">
              <img
                id="modal-image"
                src="${PLACEHOLDER_IMG}"
                alt=""
                class="max-h-[400px] w-full object-contain rounded-lg"
                onerror="this.src='${PLACEHOLDER_IMG}'"
              />
            </div>

            <!-- Details -->
            <div class="p-8 flex flex-col relative">
              <button
                id="modal-close-btn"
                class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ${xIcon({ size: 24 })}
              </button>

              <span class="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                Industrial Supply
              </span>
              <h2 id="modal-title" class="text-2xl font-bold text-slate-900 mb-4"></h2>

              <div id="modal-price" class="mb-4"></div>
              <div id="modal-stock" class="mb-6"></div>

              <p id="modal-desc" class="text-gray-600 text-sm leading-relaxed mb-8 flex-grow"></p>

              <button
                id="modal-add-btn"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                ${shoppingBagIcon({ size: 20 })}
                <span id="modal-add-label">Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Initialize products page — fetch products, bind events
 */
export async function initProductsPage() {
  const grid = document.getElementById("products-grid");
  const backBtn = document.getElementById("products-back-btn");
  const modal = document.getElementById("product-modal");
  const modalContent = document.getElementById("product-modal-content");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalAddBtn = document.getElementById("modal-add-btn");

  // Back button
  if (backBtn) {
    backBtn.addEventListener("click", () => navigate("home"));
  }

  // Fetch products
  let products = get("products") || [];

  try {
    const res = await getStoreProducts();
    if (res.data.success && res.data.data) {
      products = res.data.data;
      // Update store with fresh data
      const { set: setState } = await import("../../state/store.js");
      setState("products", products);
    }
  } catch (err) {
    console.error("Failed to fetch products, using stored data");
  }

  // Render products
  if (products.length === 0) {
    grid.innerHTML = renderEmptyState({
      title: "No products found",
      description: "Check back later for new arrivals.",
    });
    return;
  }

  grid.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      ${products.map(renderProductCard).join("")}
    </div>
  `;

  // Helper to find product by id
  const findProduct = (id) => products.find((p) => String(p.id) === String(id));

  // Bind product card events
  bindProductCards(grid, {
    onView: (id) => openModal(id),
    onAddToCart: (product) => handleAddToCart(product),
    getProducts: () => products,
  });

  // --- Modal functions ---

  function openModal(id) {
    const product = findProduct(id);
    if (!product) return;

    document.getElementById("modal-image").src =
      product.image || PLACEHOLDER_IMG;
    document.getElementById("modal-title").textContent = product.name;
    document.getElementById("modal-price").innerHTML = renderPriceDisplay({
      price: product.price,
      discount: product.discount || 0,
      size: "lg",
    });
    document.getElementById("modal-stock").innerHTML = renderStockBadge({
      quantity: product.stock_quantity || 0,
    });
    document.getElementById("modal-desc").textContent =
      product.description || "High-quality industrial product.";

    const addLabel = document.getElementById("modal-add-label");
    addLabel.textContent = product.inStock ? "Add to Cart" : "Out of Stock";
    modalAddBtn.disabled = !product.inStock;

    // Store current product for add-to-cart
    modalAddBtn.dataset.productId = product.id;

    // Show modal
    modal.style.display = "flex";
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.style.display = "none";
    modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  function handleAddToCart(product) {
    const success = addToCart(product);
    if (success) {
      toast.success(`${product.name} added to cart`);
    } else {
      toast.error("Product is out of stock");
    }
  }

  // Modal close events
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeModal);
  }
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Modal add to cart
  if (modalAddBtn) {
    modalAddBtn.addEventListener("click", () => {
      const id = modalAddBtn.dataset.productId;
      const product = findProduct(id);
      if (product) {
        handleAddToCart(product);
        closeModal();
      }
    });
  }
}
