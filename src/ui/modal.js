// ============================================
// src/ui/modal.js
// Generic modal system
// ============================================

import { getElement } from "../utils/dom.js";

const MODAL_OVERLAY_ID = "modal-overlay";

export function openModal({
  content,
  maxWidth = "max-w-3xl",
  extraClass = "",
  onClose,
  onBackdropClick,
  closeOnBackdrop = true,
} = {}) {
  closeModal();

  const overlay = document.createElement("div");
  overlay.id = MODAL_OVERLAY_ID;
  overlay.className =
    "fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4 animate-fade-in";

  const box = document.createElement("div");
  box.className = `bg-white rounded-xl shadow-2xl w-full ${maxWidth} animate-modal overflow-hidden ${extraClass}`;
  box.innerHTML = content;
  overlay.appendChild(box);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      if (onBackdropClick) {
        const shouldClose = onBackdropClick(e);
        if (shouldClose === false) return;
      }
      if (closeOnBackdrop) closeModal();
    }
  });

  const escHandler = (e) => {
    if (e.key === "Escape") closeModal();
  };
  document.addEventListener("keydown", escHandler);

  overlay._cleanup = () => {
    document.removeEventListener("keydown", escHandler);
    if (onClose) onClose();
  };

  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";
}

export function closeModal() {
  const overlay = getElement(MODAL_OVERLAY_ID);
  if (!overlay) return;

  if (overlay._cleanup) overlay._cleanup();
  overlay.style.opacity = "0";
  overlay.style.transition = "opacity 0.2s ease";
  setTimeout(() => {
    overlay.remove();
    if (!getElement(MODAL_OVERLAY_ID)) {
      document.body.style.overflow = "";
    }
  }, 200);
}

export function confirmDialog({
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Delete",
  confirmClass = "bg-red-600 hover:bg-red-700 text-white",
  cancelLabel = "Cancel",
} = {}) {
  return new Promise((resolve) => {
    const content = `
      <div class="p-8 text-center">
        <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-600"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
        </div>
        <h3 class="text-2xl font-bold text-slate-900 mb-3">${title}</h3>
        <p class="text-gray-500 text-sm leading-relaxed mb-8">${message}</p>
        <div class="flex items-center gap-4">
          <button id="modal-cancel-btn" class="flex-1 px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold text-sm transition-colors cursor-pointer">${cancelLabel}</button>
          <button id="modal-confirm-btn" class="flex-1 px-5 py-3 ${confirmClass} rounded-xl font-semibold text-sm transition-colors cursor-pointer shadow-lg">${confirmLabel}</button>
        </div>
      </div>
    `;

    openModal({
      content,
      maxWidth: "max-w-md",
      onClose: () => resolve(false),
      closeOnBackdrop: true,
    });

    requestAnimationFrame(() => {
      const confirmBtn = getElement("modal-confirm-btn");
      const cancelBtn = getElement("modal-cancel-btn");
      if (confirmBtn)
        confirmBtn.addEventListener("click", () => {
          closeModal();
          resolve(true);
        });
      if (cancelBtn)
        cancelBtn.addEventListener("click", () => {
          closeModal();
          resolve(false);
        });
    });
  });
}
