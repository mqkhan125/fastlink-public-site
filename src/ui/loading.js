// ============================================
// src/ui/loading.js
// Loading spinners and skeleton screens
// ============================================

export function fullPageSpinner() {
  return `
    <div class="flex items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  `;
}

export function smallSpinner(size = 18) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;
}

export function servicesSkeleton() {
  let cards = "";
  for (let i = 0; i < 6; i++) {
    cards += `
      <div class="bg-slate-50 p-8 rounded-xl animate-pulse">
        <div class="w-16 h-16 mx-auto mb-6 bg-gray-200 rounded-full"></div>
        <div class="h-6 bg-gray-200 rounded mb-3 w-3/4 mx-auto"></div>
        <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div class="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
      </div>
    `;
  }
  return `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">${cards}</div>`;
}

export function productsSkeleton(count = 6) {
  let cards = "";
  for (let i = 0; i < count; i++) {
    cards += `
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
        <div class="aspect-video bg-gray-200"></div>
        <div class="p-6 space-y-4">
          <div class="h-5 bg-gray-200 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 rounded w-full"></div>
          <div class="h-4 bg-gray-200 rounded w-2/3"></div>
          <div class="flex gap-3 pt-2">
            <div class="flex-1 h-10 bg-gray-200 rounded-lg"></div>
            <div class="flex-1 h-10 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    `;
  }
  return `<div class="grid grid-cols-1 md:grid-cols-3 gap-6">${cards}</div>`;
}

export function clientsSkeleton(count = 12) {
  let items = "";
  for (let i = 0; i < count; i++) {
    items += `
      <div class="flex flex-col items-center justify-center px-4 py-4 bg-white border border-gray-200 rounded-lg h-24 animate-pulse">
        <div class="h-4 bg-gray-200 rounded w-20"></div>
      </div>
    `;
  }
  return `<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">${items}</div>`;
}

export function textSkeleton(lines = 3, width = "w-full") {
  let html = "";
  for (let i = 0; i < lines; i++) {
    const w = i === lines - 1 ? "w-2/3" : width;
    html += `<div class="h-4 bg-gray-200 rounded ${w} mb-2 animate-pulse"></div>`;
  }
  return html;
}
