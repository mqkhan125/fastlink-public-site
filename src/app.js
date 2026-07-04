// ============================================
// src/app.js
// Application bootstrap — wires routes to pages,
// sets up layout (Navbar + Footer + CartDrawer)
// Replaces: src/App.jsx
// ============================================

import routes from "./router/routes.js";
import { get, set as setState } from "./state/store.js";

// ---- Page imports (render + init) ----
import { renderHomePage, initHomePage } from "./pages/HomePage.js";
import {
  renderProductsPageView,
  initProductsPageView,
} from "./pages/ProductsPage.js";
import {
  renderCheckoutPageView,
  initCheckoutPageView,
} from "./pages/CheckoutPage.js";
import { renderContactPage, initContactPage } from "./pages/ContactPage.js";
import { renderAboutPage, initAboutPage } from "./pages/AboutPage.js";

// ---- Layout imports ----
import { renderNavbar, initNavbar } from "./components/layout/Navbar.js";
import { renderFooter } from "./components/layout/Footer.js";
import {
  renderCartDrawer,
  initCartDrawer,
} from "./components/cart/CartDrawer.js";

// =============================================
// Wire route render + init functions
// (Avoids circular deps — pages import components,
//  components don't import pages)
// =============================================

routes.home.render = renderHomePage;
routes.home.onAfterRender = initHomePage;

routes.products.render = renderProductsPageView;
routes.products.onAfterRender = initProductsPageView;

routes.checkout.render = renderCheckoutPageView;
routes.checkout.onAfterRender = initCheckoutPageView;

routes.contact.render = renderContactPage;
routes.contact.onAfterRender = initContactPage;

routes.about.render = renderAboutPage;
routes.about.onAfterRender = initAboutPage;

// =============================================
// Build the app shell (Navbar + content + Footer + CartDrawer)
// =============================================

/**
 * Render the full app layout into #root
 * Call once from main.js before initRouter()
 */
export function initApp() {
  const root = document.getElementById("root");
  if (!root) {
    console.error("#root element not found");
    return;
  }

  // Build layout HTML
  root.innerHTML = `
    <div class="min-h-screen bg-slate-50 font-sans text-slate-800">
      ${renderNavbar()}

      <main class="pt-16" id="page-container"></main>

      ${renderFooter()}

      ${renderCartDrawer()}
    </div>
  `;

  // Initialize global components (events, subscriptions)
  initNavbar();
  initCartDrawer();
}
