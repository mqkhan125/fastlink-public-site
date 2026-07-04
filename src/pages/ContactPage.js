// ============================================
// src/pages/ContactPage.js
// Standalone contact page with back button
// (Not in React — new page for vanilla JS routes)
// ============================================

import { mailIcon, phoneIcon, mapPinIcon, clockIcon } from "../ui/icons.js";
import { CONTACT_INFO } from "../config/constants.js";
import {
  renderContactForm,
  initContactForm,
} from "../components/shared/ContactForm.js";
import { navigate } from "../router/router.js";

/**
 * Render standalone contact page HTML
 * @returns {string}
 */
export function renderContactPage() {
  return `
    <div class="min-h-screen bg-slate-50 py-20 px-6">
      <div class="max-w-5xl mx-auto">

        <!-- Back button -->
        <button
          id="contact-page-back-btn"
          class="text-blue-600 mb-8 hover:underline font-medium cursor-pointer"
        >
          &larr; Back to Home
        </button>

        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-blue-950 mb-4">Contact Us</h1>
          <p class="text-slate-600 text-lg max-w-2xl mx-auto">
            Have a question or need a quote? Reach out and our team will get
            back to you within 24 hours.
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">

          <!-- Contact Info -->
          <div class="space-y-8">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                ${mailIcon({ size: 24 })}
              </div>
              <div>
                <h4 class="font-semibold text-slate-900">Email Us</h4>
                <a href="mailto:${CONTACT_INFO.email}" class="text-blue-600 hover:underline">
                  ${CONTACT_INFO.email}
                </a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                ${phoneIcon({ size: 24 })}
              </div>
              <div>
                <h4 class="font-semibold text-slate-900">Call Us</h4>
                <a href="${CONTACT_INFO.phoneLink}" class="text-blue-600 hover:underline">
                  ${CONTACT_INFO.phone}
                </a>
                <p class="text-gray-400 text-sm mt-1">${CONTACT_INFO.phoneFull}</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                ${mapPinIcon({ size: 24 })}
              </div>
              <div>
                <h4 class="font-semibold text-slate-900">Visit Us</h4>
                <p class="text-slate-600 text-sm">${CONTACT_INFO.address}</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                ${clockIcon({ size: 24 })}
              </div>
              <div>
                <h4 class="font-semibold text-slate-900">Office Hours</h4>
                <p class="text-slate-600 text-sm">${CONTACT_INFO.hours}</p>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          ${renderContactForm()}

        </div>
      </div>
    </div>
  `;
}

/**
 * Initialize contact page
 */
export async function initContactPage() {
  const backBtn = document.getElementById("contact-page-back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => navigate("home"));
  }

  initContactForm();
}
