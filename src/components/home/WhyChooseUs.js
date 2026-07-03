// ============================================
// src/components/home/WhyChooseUsSection.js
// 4 feature cards with hover icon effect
// Replaces: src/components/sections/WhyChooseUs.jsx
// ============================================

import {
  shieldCheckIcon,
  awardIcon,
  clockIcon,
  truckIcon,
} from "../../ui/icons.js";

const features = [
  {
    icon: shieldCheckIcon({ size: 32 }),
    title: "Authorized Supplier",
    desc: "Direct partnerships with global manufacturers ensuring genuine products.",
  },
  {
    icon: awardIcon({ size: 32 }),
    title: "Quality Assurance",
    desc: "Rigorous testing and certification for every component we supply.",
  },
  {
    icon: clockIcon({ size: 32 }),
    title: "24/7 Support",
    desc: "Dedicated technical support team available around the clock.",
  },
  {
    icon: truckIcon({ size: 32 }),
    title: "Rapid Logistics",
    desc: "Proprietary distribution network for lightning-fast delivery.",
  },
];

/**
 * @returns {string} — HTML string for the WhyChooseUs section
 */
export function renderWhyChooseUsSection() {
  return `
    <section class="py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold text-blue-950 mb-4">
          Why Choose Fast Link?
        </h2>
        <p class="text-gray-500 mb-12">
          The industry standard in logistics and supply chain management.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          ${features
            .map(
              (f) => `
            <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center group hover:shadow-md transition-shadow">
              <div class="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                ${f.icon}
              </div>
              <h3 class="text-xl font-bold text-slate-900 mb-3">${f.title}</h3>
              <p class="text-gray-500 text-sm leading-relaxed">${f.desc}</p>
            </div>
          `,
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}
