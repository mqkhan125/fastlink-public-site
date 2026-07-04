// ============================================
// src/pages/AboutPage.js
// Standalone about page with back button
// (Not in React — new page for vanilla JS routes)
// ============================================

import { targetIcon, buildingIcon, trendingUpIcon } from "../ui/icons.js";
import { navigate } from "../router/router.js";

const features = [
  {
    icon: targetIcon({ size: 48 }),
    title: "Our Mission",
    desc: "To provide high-grade mechanical parts, electrical supplies, and safety equipment with unmatched delivery speeds, ensuring industries never stop. We believe every minute of downtime costs our clients money, and our logistics network is built to minimize that cost to near zero.",
  },
  {
    icon: buildingIcon({ size: 48 }),
    title: "15+ Years Experience",
    desc: "With over a decade in the industry, we have established ourselves as a leading provider of industrial solutions and an authorized partner for global brands. Our deep relationships with manufacturers worldwide allow us to source the right products at competitive prices.",
  },
  {
    icon: trendingUpIcon({ size: 48 }),
    title: "500+ Corporate Clients",
    desc: "Trusted by leading organizations from Sindh Police to Engro Corp, our commitment to quality has made us the industry standard. Our client retention rate speaks for itself — over 95% of our corporate clients continue to work with us year after year.",
  },
];

const stats = [
  { number: "500+", label: "Corporate Clients" },
  { number: "15+", label: "Years of Experience" },
  { number: "10K+", label: "Products Delivered" },
  { number: "24/7", label: "Support Available" },
];

/**
 * Render standalone about page HTML
 * @returns {string}
 */
export function renderAboutPage() {
  return `
    <div class="min-h-screen bg-slate-50 py-20 px-6">
      <div class="max-w-5xl mx-auto">

        <!-- Back button -->
        <button
          id="about-page-back-btn"
          class="text-blue-600 mb-8 hover:underline font-medium cursor-pointer"
        >
          &larr; Back to Home
        </button>

        <!-- Header -->
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-extrabold text-blue-950 mb-6">
            About Fast Link
          </h1>
          <p class="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Bridging the gap between global manufacturers and local industries
            with precision and speed. Fast Link is a premier industrial supply
            and logistics partner, dedicated to powering global industries with
            precision-engineered solutions and rapid connectivity.
          </p>
        </div>

        <!-- Stats Bar -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          ${stats
            .map(
              (s) => `
            <div class="bg-white p-6 rounded-xl border border-gray-100 text-center shadow-sm">
              <div class="text-3xl font-extrabold text-blue-600 mb-1">${s.number}</div>
              <div class="text-sm text-gray-500">${s.label}</div>
            </div>
          `,
            )
            .join("")}
        </div>

        <!-- Feature Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          ${features
            .map(
              (f) => `
            <div class="bg-white p-8 rounded-xl border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div class="text-blue-600 mb-4 mx-auto">${f.icon}</div>
              <h3 class="text-xl font-bold text-slate-900 mb-3">${f.title}</h3>
              <p class="text-gray-500 text-sm leading-relaxed">${f.desc}</p>
            </div>
          `,
            )
            .join("")}
        </div>

        <!-- CTA -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-10 text-center text-white">
          <h2 class="text-2xl font-bold mb-3">Ready to Work With Us?</h2>
          <p class="text-blue-100 mb-6 max-w-xl mx-auto">
            Whether you need a single component or a complete industrial solution,
            Fast Link is your trusted partner.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#products"
              class="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors"
            >
              Browse Products
            </a>
            <a
              href="#contact"
              class="px-6 py-3 border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>

      </div>
    </div>
  `;
}

/**
 * Initialize about page
 */
export async function initAboutPage() {
  const backBtn = document.getElementById("about-page-back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => navigate("home"));
  }
}
