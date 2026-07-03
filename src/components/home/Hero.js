// ============================================
// src/components/home/HeroSection.js
// Dynamic hero banner — fetches from API,
// falls back to DEFAULT_HERO constants
// Replaces: src/components/sections/Hero.jsx
// ============================================

import { arrowRightIcon } from "../../ui/icons.js";
import { getActiveHeroContent } from "../../services/hero.js";
import { DEFAULT_HERO } from "../../config/constants.js";
import { navigate } from "../../router/router.js";

/**
 * Render hero section (static HTML with event binding)
 * Called once — fetches data then updates DOM in-place
 * @returns {string}
 */
export function renderHeroSection() {
  return `
    <section id="home" class="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-24 overflow-hidden">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>

      <!-- hero-image-bg (set dynamically if API returns image) -->
      <div id="hero-image-bg" class="absolute inset-0 bg-cover bg-center opacity-10" style="display:none;"></div>

      <div class="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div id="hero-badge" class="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-sm">
          <span class="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
          <span id="hero-badge-text">${DEFAULT_HERO.badge_text}</span>
        </div>

        <h1 id="hero-heading" class="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
          ${DEFAULT_HERO.main_heading} <br />
          <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ${DEFAULT_HERO.sub_heading}
          </span>
        </h1>

        <p id="hero-desc" class="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          ${DEFAULT_HERO.description}
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button
            id="hero-explore-btn"
            class="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40"
          >
            <span id="hero-btn-text">${DEFAULT_HERO.button_text}</span>
            <span class="group-hover:translate-x-1 transition-transform">${arrowRightIcon({ size: 18 })}</span>
          </button>
          <a href="#contact">
            <button class="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all shadow-sm hover:shadow-md">
              Get in Touch
            </button>
          </a>
        </div>
      </div>

      <div class="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
      <div class="absolute -top-32 -right-32 w-96 h-96 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
    </section>
  `;
}

/**
 * Fetch hero data from API and update DOM in-place
 * Call after rendering the initial hero HTML
 */
export async function initHeroSection() {
  // Bind explore button
  const exploreBtn = document.getElementById("hero-explore-btn");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      navigate("products");
    });
  }

  // Fetch hero content from API
  try {
    const res = await getActiveHeroContent();
    if (res.data.success && res.data.data) {
      const d = res.data.data;

      const heading = d.main_heading || DEFAULT_HERO.main_heading;
      const subHeading = d.sub_heading || DEFAULT_HERO.sub_heading;
      const description = d.description || DEFAULT_HERO.description;
      const btnText = d.button_text || DEFAULT_HERO.button_text;
      const btnLink = d.button_link || DEFAULT_HERO.button_link;
      const badgeText = d.badge_text || DEFAULT_HERO.badge_text;
      const heroImage = d.hero_image || null;

      // Update DOM elements
      const h1 = document.getElementById("hero-heading");
      if (h1) {
        h1.innerHTML = `${heading} <br />
          <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            ${subHeading}
          </span>`;
      }

      const desc = document.getElementById("hero-desc");
      if (desc) desc.textContent = description;

      const badge = document.getElementById("hero-badge-text");
      if (badge) badge.textContent = badgeText;

      const btnTxt = document.getElementById("hero-btn-text");
      if (btnTxt) btnTxt.textContent = btnText;

      // Update button behavior based on btnLink
      if (exploreBtn) {
        exploreBtn.onclick = () => {
          if (btnLink === "#products") {
            navigate("products");
          } else {
            const el = document.querySelector(btnLink);
            if (el) el.scrollIntoView({ behavior: "smooth" });
            else navigate("products");
          }
        };
      }

      // Hero background image
      if (heroImage) {
        const bg = document.getElementById("hero-image-bg");
        if (bg) {
          bg.style.backgroundImage = `url(${heroImage})`;
          bg.style.display = "block";
        }
      }
    }
  } catch (err) {
    console.error("Failed to load hero content, using defaults");
  }
}
