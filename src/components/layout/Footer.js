// ============================================
// src/components/layout/Footer.js
// Site footer — logo, quick links, categories,
// contact info, copyright
// Replaces: src/components/layout/Footer.jsx
// ============================================

import { mapPinIcon, phoneIcon, mailIcon, clockIcon } from "../../ui/icons.js";
import env from "../../config/env.js";
import { CONTACT_INFO } from "../../config/constants.js";

/**
 * @returns {string} — HTML string for the Footer
 */
export function renderFooter() {
  return `
    <footer class="bg-blue-950 text-white pt-16 pb-8">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

          <!-- Brand -->
          <div>
            <img
              src="${env.LOGO_URL}"
              alt="Fast Link"
              class="h-12 w-auto rounded-lg mb-4"
            />
            <p class="text-blue-200 text-sm leading-relaxed">
              Fast Link is a premier industrial supply and logistics partner,
              dedicated to powering global industries with precision-engineered
              solutions and rapid connectivity.
            </p>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="font-bold uppercase tracking-wider mb-4 text-white">
              Quick Links
            </h4>
            <ul class="space-y-2 text-blue-200 text-sm">
              <li>
                <a href="#home" class="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" class="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#products" class="hover:text-white transition-colors">Our Store</a>
              </li>
              <li>
                <a href="#clients" class="hover:text-white transition-colors">Client Success</a>
              </li>
              <li>
                <a href="#clients" class="hover:text-white transition-colors">Companies</a>
              </li>
            </ul>
          </div>

          <!-- Categories -->
          <div>
            <h4 class="font-bold uppercase tracking-wider mb-4 text-white">
              Categories
            </h4>
            <ul class="space-y-2 text-blue-200 text-sm">
              <li>
                <a href="#products" class="hover:text-white transition-colors">Mechanical Parts</a>
              </li>
              <li>
                <a href="#products" class="hover:text-white transition-colors">Electrical Supplies</a>
              </li>
              <li>
                <a href="#products" class="hover:text-white transition-colors">Safety Equipment</a>
              </li>
              <li>
                <a href="#products" class="hover:text-white transition-colors">Industrial Tools</a>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="font-bold uppercase tracking-wider mb-4 text-white">
              Contact
            </h4>
            <ul class="space-y-4 text-blue-200 text-sm">
              <li class="flex items-start gap-3">
                <span class="text-blue-400 shrink-0 mt-0.5">${mapPinIcon({ size: 18 })}</span>
                <span>${CONTACT_INFO.addressShort}</span>
              </li>
              <li class="flex items-center gap-3">
                <span class="text-blue-400 shrink-0">${phoneIcon({ size: 18 })}</span>
                <a href="${CONTACT_INFO.phoneFullLink}" class="hover:text-white transition-colors">
                  ${CONTACT_INFO.phoneFull}
                </a>
              </li>
              <li class="flex items-center gap-3">
                <span class="text-blue-400 shrink-0">${mailIcon({ size: 18 })}</span>
                <a href="mailto:${CONTACT_INFO.email}" class="hover:text-white transition-colors">
                  ${CONTACT_INFO.email}
                </a>
              </li>
              <li class="flex items-center gap-3">
                <span class="text-blue-400 shrink-0">${clockIcon({ size: 18 })}</span>
                <span>${CONTACT_INFO.hours}</span>
              </li>
            </ul>
          </div>

        </div>

        <!-- Copyright -->
        <div class="border-t border-blue-900 pt-8 text-center text-blue-400 text-xs">
          &copy; 2026 Fast Link. All rights reserved.
        </div>
      </div>
    </footer>
  `;
}
