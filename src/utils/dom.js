// ============================================
// src/utils/dom.js
// Reusable DOM helper functions
// ============================================

export function getElement(id) {
  return document.getElementById(id);
}

export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function qsAll(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}

export function createElement(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);

  for (const [key, value] of Object.entries(attrs)) {
    if (key === "className") {
      el.className = value;
    } else if (key === "dataset") {
      Object.assign(el.dataset, value);
    } else if (key.startsWith("on") && typeof value === "function") {
      const eventName = key.slice(2).toLowerCase();
      el.addEventListener(eventName, value);
    } else if (key === "style" && typeof value === "object") {
      Object.assign(el.style, value);
    } else if (key === "innerHTML") {
      el.innerHTML = value;
    } else if (key === "textContent") {
      el.textContent = value;
    } else {
      el.setAttribute(key, value);
    }
  }

  for (const child of children) {
    if (typeof child === "string" || typeof child === "number") {
      el.appendChild(document.createTextNode(child));
    } else if (child instanceof HTMLElement) {
      el.appendChild(child);
    }
  }

  return el;
}

export function renderHTML(el, html) {
  const target = typeof el === "string" ? getElement(el) : el;
  if (target) target.innerHTML = html;
}

export function clearElement(el) {
  const target = typeof el === "string" ? getElement(el) : el;
  if (target) target.innerHTML = "";
}

export function toggleVisibility(el, visible, hideClass = "hidden") {
  const target = typeof el === "string" ? getElement(el) : el;
  if (!target) return;
  if (visible) {
    target.classList.remove(hideClass);
  } else {
    target.classList.add(hideClass);
  }
}

export function appendHTML(parent, htmlString) {
  const target = typeof parent === "string" ? getElement(parent) : parent;
  if (!target) return;
  const temp = document.createElement("template");
  temp.innerHTML = htmlString.trim();
  target.appendChild(temp.content);
}

export function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

export function throttle(fn, limit = 100) {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function escapeHTML(str) {
  if (!str) return "";
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return str.replace(/[&<>"']/g, (c) => map[c]);
}
