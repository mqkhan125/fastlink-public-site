// ============================================
// src/ui/toast.js
// Custom toast notification system
// ============================================

import { getElement, createElement } from "../utils/dom.js";

const TOAST_CONTAINER_ID = "toast-container";
let toastCount = 0;

function getContainer() {
  let container = getElement(TOAST_CONTAINER_ID);
  if (!container) {
    container = createElement("div", {
      id: TOAST_CONTAINER_ID,
      className:
        "fixed top-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none",
      style: { maxWidth: "380px", width: "100%" },
    });
    document.body.appendChild(container);
  }
  return container;
}

const STYLES = {
  success: {
    bg: "bg-green-50 border-green-200",
    text: "text-green-800",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-600"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>`,
  },
  error: {
    bg: "bg-red-50 border-red-200",
    text: "text-red-800",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-600"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>`,
  },
  info: {
    bg: "bg-blue-50 border-blue-200",
    text: "text-blue-800",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-600"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
  },
};

function showToast(type, message, duration = 3000) {
  const container = getContainer();
  const style = STYLES[type] || STYLES.info;
  const id = `toast-${++toastCount}`;

  const toast = document.createElement("div");
  toast.id = id;
  toast.className = `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${style.bg} ${style.text} text-sm font-medium animate-modal`;
  toast.innerHTML = `
    <span class="shrink-0">${style.icon}</span>
    <span class="flex-grow">${message}</span>
    <button onclick="this.parentElement.remove()" class="shrink-0 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
  `;

  container.appendChild(toast);

  const timer = setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, duration);

  toast.addEventListener("mouseenter", () => clearTimeout(timer));
  toast.addEventListener("mouseleave", () => {
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 1000);
  });
}

export const toast = {
  success: (msg, duration) => showToast("success", msg, duration),
  error: (msg, duration) => showToast("error", msg, duration),
  info: (msg, duration) => showToast("info", msg, duration),
};

export default toast;
