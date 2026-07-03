// ============================================
// src/router/routes.js
// Route definitions
//
// NOTE: render/onEnter/onAfterRender are
// assigned in app.js AFTER components load
// to avoid circular dependencies.
// ============================================

const routes = {
  home: {
    title: "Home",
    description:
      "Fast Link — Your authorized partner for high-grade mechanical parts, electrical supplies, and safety equipment.",
    render: null,
    onEnter: null,
    onAfterRender: null,
  },

  products: {
    title: "Our Supplies",
    description:
      "Browse Fast Link's complete range of industrial supplies — mechanical parts, electrical equipment, safety gear, and more.",
    render: null,
    onEnter: null,
    onAfterRender: null,
  },

  checkout: {
    title: "Checkout",
    description: "Complete your order at Fast Link Industrial Supplies.",
    render: null,
    onEnter: null,
    onAfterRender: null,
  },

  contact: {
    title: "Contact Us",
    description:
      "Get in touch with Fast Link Industrial Supplies. Email, phone, or visit our Karachi office.",
    render: null,
    onEnter: null,
    onAfterRender: null,
  },

  about: {
    title: "About Us",
    description:
      "Learn about Fast Link — 15+ years of industrial supply excellence trusted by 500+ corporate clients.",
    render: null,
    onEnter: null,
    onAfterRender: null,
  },

  "*": {
    title: "Page Not Found",
    description: "",
    render: () => `
      <div class="flex flex-col items-center justify-center py-32 text-center">
        <h1 class="text-6xl font-extrabold text-blue-950 mb-4">404</h1>
        <p class="text-gray-500 text-lg mb-8">The page you're looking for doesn't exist.</p>
        <a href="#home" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
          Go Home
        </a>
      </div>
    `,
    onEnter: null,
    onAfterRender: null,
  },
};

export default routes;
