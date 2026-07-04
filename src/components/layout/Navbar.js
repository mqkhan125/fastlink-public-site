// ============================================
// src/components/layout/Navbar.js
// Sticky navbar with scroll tracking, sliding
// underline, mobile menu, cart badge
// Replaces: src/components/layout/Navbar.jsx
// ============================================

import { menuIcon, xIcon, cartIcon } from "../../ui/icons.js";
import { renderLogo, bindLogoEvents } from "../shared/Logo.js";
import { get, subscribe, toggleCart, getCartCount } from "../../state/store.js";
import { navigate } from "../../router/router.js";
import { NAV_ITEMS, SCROLL_SECTIONS } from "../../config/constants.js";

// Track state
let _activeSection = "home";
let _isMobileMenuOpen = false;
let _initialized = false;
let _scrollHandler = null;
let _resizeHandler = null;
let _cartUnsubscribe = null;

// Nav items with their behavior
const NAV_LINKS = [
  { label: "Home", id: "home", isPage: false },
  { label: "Services", id: "services", isPage: false },
  { label: "Clients", id: "clients", isPage: false },
  { label: "About", id: "about", isPage: false },
  { label: "Products", id: "products", isPage: true },
  { label: "Contact", id: "contact", isPage: false },
];

/**
 * Render navbar HTML (once, in app layout)
 * @returns {string}
 */
export function renderNavbar() {
  const desktopLinks = NAV_LINKS.map(
    (item) => `
    <button
      data-nav-id="${item.id}"
      class="navbar-link px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer text-slate-600 hover:text-blue-600"
    >
      ${item.label}
    </button>
  `,
  ).join("");

  const mobileLinks = NAV_LINKS.map(
    (item) => `
    <button
      data-nav-id="${item.id}"
      class="navbar-mobile-link block w-full text-left px-4 py-3 rounded-xl font-medium transition-all cursor-pointer text-slate-700 hover:bg-blue-50 hover:text-blue-600"
    >
      ${item.label}
    </button>
  `,
  ).join("");

  return `
    <nav id="main-navbar" class="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">

          <!-- Logo -->
          <div class="flex-shrink-0">
            ${renderLogo()}
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex flex-1 justify-center">
            <div id="nav-desktop-container" class="relative flex gap-1">
              ${desktopLinks}
              <!-- Sliding Underline -->
              <span
                id="nav-underline"
                class="absolute bottom-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 ease-out"
                style="width:0px; left:0px;"
              ></span>
            </div>
          </div>

          <!-- Right Actions -->
          <div class="flex items-center gap-3 flex-shrink-0">
            <!-- Cart Button -->
            <button
              id="nav-cart-btn"
              class="relative p-2.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 cursor-pointer"
            >
              ${cartIcon({ size: 20 })}
              <span
                id="nav-cart-badge"
                class="absolute -top-0.5 -right-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-full h-[18px] w-[18px] flex items-center justify-center min-w-[18px] px-1"
                style="display:none;"
              ></span>
            </button>

            <!-- Mobile Menu Toggle -->
            <button
              id="nav-mobile-toggle"
              class="md:hidden p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
            >
              <span id="nav-mobile-icon">${menuIcon({ size: 22 })}</span>
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      <div
        id="nav-mobile-menu"
        class="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 p-4 space-y-1 shadow-xl"
        style="display:none;"
      >
        ${mobileLinks}
      </div>
    </nav>
  `;
}

/**
 * Initialize navbar — bind all events, start scroll tracking
 * Call once after rendering
 */
export function initNavbar() {
  if (_initialized) return;
  _initialized = true;

  const cartBtn = document.getElementById("nav-cart-btn");
  const mobileToggle = document.getElementById("nav-mobile-toggle");
  const mobileMenu = document.getElementById("nav-mobile-menu");
  const mobileIcon = document.getElementById("nav-mobile-icon");
  const desktopContainer = document.getElementById("nav-desktop-container");

  // --- Logo ---
  bindLogoEvents();

  // --- Cart button ---
  if (cartBtn) {
    cartBtn.addEventListener("click", () => toggleCart(true));
  }

  // --- Cart badge subscription ---
  _cartUnsubscribe = subscribe("cart", () => updateCartBadge());
  updateCartBadge();

  // --- Mobile menu toggle ---
  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => toggleMobileMenu());
  }

  // --- Desktop nav link clicks ---
  if (desktopContainer) {
    desktopContainer.querySelectorAll(".navbar-link").forEach((btn) => {
      btn.addEventListener("click", () => handleNavClick(btn.dataset.navId));
    });
  }

  // --- Mobile nav link clicks ---
  if (mobileMenu) {
    mobileMenu.querySelectorAll(".navbar-mobile-link").forEach((btn) => {
      btn.addEventListener("click", () => {
        handleNavClick(btn.dataset.navId);
        closeMobileMenu();
      });
    });
  }

  // --- Scroll tracking ---
  startScrollTracking();

  // --- Resize → recalculate underline ---
  _resizeHandler = () => updateUnderline();
  window.addEventListener("resize", _resizeHandler);

  // --- Route change → update active section ---
  subscribe("view", (newView) => {
    if (newView !== "home") {
      _activeSection = newView;
      setActiveLink(newView);
      stopScrollTracking();
    } else {
      _activeSection = "home";
      setActiveLink("home");
      startScrollTracking();
      // Run initial scroll check
      setTimeout(checkScrollPosition, 100);
    }
  });

  // Initial state
  setActiveLink("home");
}

// =============================================
// Scroll Tracking
// =============================================

function startScrollTracking() {
  if (_scrollHandler) return; // Already running
  _scrollHandler = () => checkScrollPosition();
  window.addEventListener("scroll", _scrollHandler, { passive: true });
  checkScrollPosition();
}

function stopScrollTracking() {
  if (_scrollHandler) {
    window.removeEventListener("scroll", _scrollHandler);
    _scrollHandler = null;
  }
}

function checkScrollPosition() {
  const view = get("view");
  if (view !== "home") return;

  const scrollPosition = window.scrollY + 120;
  let currentActive = "home";

  SCROLL_SECTIONS.forEach((id) => {
    const section = document.getElementById(id);
    if (section && section.offsetTop <= scrollPosition) {
      currentActive = id;
    }
  });

  if (currentActive !== _activeSection) {
    _activeSection = currentActive;
    setActiveLink(currentActive);
  }
}

// =============================================
// Active Link Highlight + Sliding Underline
// =============================================

function setActiveLink(sectionId) {
  // Desktop links
  document.querySelectorAll(".navbar-link").forEach((btn) => {
    if (btn.dataset.navId === sectionId) {
      btn.classList.remove("text-slate-600");
      btn.classList.add("text-blue-600");
    } else {
      btn.classList.remove("text-blue-600");
      btn.classList.add("text-slate-600");
    }
  });

  // Mobile links
  document.querySelectorAll(".navbar-mobile-link").forEach((btn) => {
    if (btn.dataset.navId === sectionId) {
      btn.classList.remove("text-slate-700");
      btn.classList.add("bg-blue-50", "text-blue-600");
    } else {
      btn.classList.remove("bg-blue-50", "text-blue-600");
      btn.classList.add("text-slate-700");
    }
  });

  // Update sliding underline
  updateUnderline();
}

function updateUnderline() {
  const underline = document.getElementById("nav-underline");
  const container = document.getElementById("nav-desktop-container");
  const activeEl = document.querySelector(`[data-nav-id="${_activeSection}"]`);

  if (!underline || !container || !activeEl) return;

  const navRect = container.getBoundingClientRect();
  const elemRect = activeEl.getBoundingClientRect();

  underline.style.width = `${elemRect.width}px`;
  underline.style.left = `${elemRect.left - navRect.left}px`;
}

// =============================================
// Navigation Handler
// =============================================

function handleNavClick(sectionId) {
  const navItem = NAV_LINKS.find((n) => n.id === sectionId);
  if (!navItem) return;

  if (navItem.isPage) {
    // Products → navigate to products page
    _activeSection = "products";
    setActiveLink("products");
    navigate("products");
  } else {
    // Section link → go to home, scroll to section
    navigate("home");
    _activeSection = sectionId;
    setActiveLink(sectionId);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
}

// =============================================
// Mobile Menu
// =============================================

function toggleMobileMenu() {
  _isMobileMenuOpen = !_isMobileMenuOpen;
  const menu = document.getElementById("nav-mobile-menu");
  const icon = document.getElementById("nav-mobile-icon");

  if (_isMobileMenuOpen) {
    if (menu) menu.style.display = "block";
    if (icon) icon.innerHTML = xIcon({ size: 22 });
  } else {
    closeMobileMenu();
  }
}

function closeMobileMenu() {
  _isMobileMenuOpen = false;
  const menu = document.getElementById("nav-mobile-menu");
  const icon = document.getElementById("nav-mobile-icon");
  if (menu) menu.style.display = "none";
  if (icon) icon.innerHTML = menuIcon({ size: 22 });
}

// =============================================
// Cart Badge
// =============================================

function updateCartBadge() {
  const badge = document.getElementById("nav-cart-badge");
  if (!badge) return;

  const count = getCartCount();
  if (count > 0) {
    badge.style.display = "flex";
    badge.textContent = count;
  } else {
    badge.style.display = "none";
  }
}
