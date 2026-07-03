// ============================================
// src/components/home/ContactSection.js
// "Get in Touch" — contact info cards + form
// Replaces: src/components/sections/Contact.jsx
// ============================================

import { mailIcon, phoneIcon, mapPinIcon, clockIcon } from "../../ui/icons.js";
import { CONTACT_INFO } from "../../config/constants.js";
import { renderContactForm, initContactForm } from "../shared/ContactForm.js";

/**
 * Render the full Contact section
 * @returns {string}
 */
export function renderContactSection() {
  return `
    <section id="contact" class="py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-blue-950 mb-4">Get in Touch</h2>
          <p class="text-slate-600">
            Ready to transform your organization's supply chain?
          </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">

          <!-- Left: Contact Info -->
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

          <!-- Right: Contact Form -->
          ${renderContactForm()}

        </div>
      </div>
    </section>
  `;
}

/**
 * Initialize contact form bindings
 * Call after rendering the section
 */
export function initContactSection() {
  initContactForm();
}
