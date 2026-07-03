// ============================================
// src/components/home/CompaniesSection.js
// Fetches client logos from API, renders grid
// Falls back to default clients from fallback.js
// Replaces: src/components/sections/Companies.jsx
// ============================================

import { getActiveClients } from "../../services/clients.js";
import { clientsSkeleton } from "../../ui/loading.js";
import { clients as defaultClients } from "../../data/fallback.js";

/**
 * Render a single client card
 * @param {object} client — { id, name, logo?, website_url?, url? }
 * @returns {string}
 */
function renderClientCard(client) {
  const href = client.website_url || client.url || "#";
  const logoHtml = client.logo
    ? `<img
         src="${client.logo}"
         alt="${client.name}"
         class="h-10 object-contain mb-2"
         onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
       />
       <span style="display:none;">${client.name}</span>`
    : `<span>${client.name}</span>`;

  return `
    <a
      href="${href}"
      target="_blank"
      rel="noopener noreferrer"
      class="flex flex-col items-center justify-center px-4 py-4 bg-white border border-gray-200 rounded-lg text-slate-600 hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-all font-medium text-sm h-full"
    >
      ${logoHtml}
    </a>
  `;
}

/**
 * Render companies section (initial HTML with skeleton)
 * @returns {string}
 */
export function renderCompaniesSection() {
  return `
    <section id="clients" class="py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold text-blue-950 mb-4">Clients</h2>

        <h3 class="text-2xl font-semibold text-slate-700 mb-2">
          Trusted By Industry Leaders
        </h3>
        <p class="text-gray-500 mb-12 max-w-2xl mx-auto">
          Leading organizations rely on Fast Link for critical supplies and
          logistics.
        </p>

        <div id="clients-grid">
          ${clientsSkeleton()}
        </div>
      </div>
    </section>
  `;
}

/**
 * Fetch clients from API and update grid
 * Call after rendering the section
 */
export async function initCompaniesSection() {
  const grid = document.getElementById("clients-grid");
  if (!grid) return;

  let clientList = [];

  try {
    const res = await getActiveClients();
    if (res.data.success && res.data.data && res.data.data.length > 0) {
      clientList = res.data.data;
    } else {
      clientList = defaultClients.map((c, i) => ({ ...c, id: i + 1 }));
    }
  } catch (err) {
    clientList = defaultClients.map((c, i) => ({ ...c, id: i + 1 }));
  }

  grid.innerHTML = `
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      ${clientList.map(renderClientCard).join("")}
    </div>
  `;
}
