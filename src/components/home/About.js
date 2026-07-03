// ============================================
// src/components/home/AboutSection.js
// About Fast Link — 3 feature cards
// Replaces: src/components/sections/About.jsx
// ============================================

import { targetIcon, buildingIcon, trendingUpIcon } from "../../ui/icons.js";

const cards = [
  {
    icon: targetIcon({ size: 40 }),
    title: "Our Mission",
    desc: "To provide high-grade mechanical parts, electrical supplies, and safety equipment with unmatched delivery speeds, ensuring industries never stop.",
  },
  {
    icon: buildingIcon({ size: 40 }),
    title: "15+ Years Experience",
    desc: "With over a decade in the industry, we have established ourselves as a leading provider of industrial solutions and authorized partner for global brands.",
  },
  {
    icon: trendingUpIcon({ size: 40 }),
    title: "500+ Corporate Clients",
    desc: "Trusted by leading organizations from Sindh Police to Engro Corp, our commitment to quality has made us the industry standard.",
  },
];

/**
 * @returns {string} — HTML string for the About section
 */
export function renderAboutSection() {
  return `
    <section id="about" class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-blue-950 mb-4">About Fast Link</h2>
          <p class="text-slate-600 max-w-2xl mx-auto">
            Bridging the gap between global manufacturers and local industries
            with precision and speed.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${cards
            .map(
              (card) => `
            <div class="bg-slate-50 p-8 rounded-xl border border-gray-100 text-center hover:shadow-md transition-shadow">
              <div class="text-blue-600 mb-4 mx-auto">${card.icon}</div>
              <h3 class="text-xl font-bold text-slate-900 mb-2">${card.title}</h3>
              <p class="text-gray-500 text-sm leading-relaxed">${card.desc}</p>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}
