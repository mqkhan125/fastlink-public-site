// ============================================
// src/main.js
// Entry point — imports styles, boots app,
// initializes router
// Replaces: src/main.jsx
// ============================================

// 1. Import styles (Tailwind + custom CSS)
import "./styles/index.css";

// 2. Import and initialize the app
import { initApp } from "./app.js";
import { initRouter } from "./router/router.js";

// 3. Boot
initApp();
initRouter();
