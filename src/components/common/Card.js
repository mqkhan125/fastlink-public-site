// ============================================
// src/components/common/Card.js
// Reusable card wrapper components
// ============================================

export function renderCard({ className = "", content } = {}) {
  return `
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 ${className}">
      ${content}
    </div>
  `;
}

export function renderCardHeader(content, className = "") {
  return `
    <div class="p-6 border-b border-gray-100 ${className}">
      ${content}
    </div>
  `;
}

export function renderCardTitle(text, className = "") {
  return `<h3 class="text-xl font-bold text-blue-950 ${className}">${text}</h3>`;
}

export function renderCardDescription(text, className = "") {
  return `<p class="text-sm text-gray-500 mt-1 ${className}">${text}</p>`;
}

export function renderCardContent(content, className = "") {
  return `
    <div class="p-6 ${className}">
      ${content}
    </div>
  `;
}

export function renderCardFooter(content, className = "") {
  return `
    <div class="p-6 bg-gray-50 border-t border-gray-100 rounded-b-xl ${className}">
      ${content}
    </div>
  `;
}
