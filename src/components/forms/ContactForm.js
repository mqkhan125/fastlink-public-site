// ============================================
// src/components/shared/ContactForm.js
// Reusable contact form — used by Contact section
// and potentially the standalone Contact page
// Replaces: form portion of sections/Contact.jsx
// ============================================

import { smallSpinner } from "../../ui/loading.js";
import { sendIcon } from "../../ui/icons.js";
import { createContact } from "../../services/contacts.js";
import toast from "../../ui/toast.js";

/**
 * Render contact form HTML
 * @returns {string}
 */
export function renderContactForm() {
  return `
    <form id="contact-form" class="space-y-5" novalidate>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <input
          type="text"
          name="name"
          required
          class="p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 bg-slate-50"
          placeholder="Full Name"
        />
        <input
          type="text"
          name="company"
          class="p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 bg-slate-50"
          placeholder="Company"
        />
      </div>
      <input
        type="email"
        name="email"
        required
        class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 bg-slate-50"
        placeholder="Email Address"
      />
      <textarea
        name="message"
        rows="4"
        required
        class="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 bg-slate-50"
        placeholder="How can we help you?"
      ></textarea>

      <button
        type="submit"
        id="contact-submit-btn"
        class="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <span id="contact-btn-icon">${sendIcon({ size: 18 })}</span>
        <span id="contact-btn-label">Send Message</span>
      </button>
    </form>
  `;
}

/**
 * Bind form submit handler
 * Call after rendering the form
 */
export function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = document.getElementById("contact-submit-btn");
    const iconEl = document.getElementById("contact-btn-icon");
    const labelEl = document.getElementById("contact-btn-label");

    // Basic validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Set loading state
    btn.disabled = true;
    iconEl.innerHTML = smallSpinner(18);
    labelEl.textContent = "Sending...";

    try {
      await createContact({
        name,
        email,
        company: form.company.value.trim(),
        message,
      });
      toast.success("Message sent successfully!");
      form.reset();
    } catch (err) {
      toast.error("Failed to send message.");
    } finally {
      btn.disabled = false;
      iconEl.innerHTML = sendIcon({ size: 18 });
      labelEl.textContent = "Send Message";
    }
  });
}
