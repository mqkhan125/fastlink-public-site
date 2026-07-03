import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      localStorage.removeItem("admin_role");
      localStorage.removeItem("admin_name");
      localStorage.removeItem("admin_email");
      window.location.href = "/admin/login";
    }
    return Promise.reject(error);
  },
);

// Admin Management
export const getAdmins = () => api.get("/admins");
export const createAdmin = (data) => api.post("/admins", data);
export const updateAdmin = (id, data) => api.put(`/admins/${id}`, data);
export const changePassword = (id, data) =>
  api.put(`/admins/${id}/password`, data);
export const deleteAdmin = (id) => api.delete(`/admins/${id}`);

// Activity Logs
export const getActivityLogs = (limit = 100) =>
  api.get(`/activity-logs?limit=${limit}`);
export const clearActivityLogs = () => api.delete("/activity-logs/clear");

// Auth
export const adminLogin = (data) => api.post("/auth/login", data);

// Dashboard
export const getDashboardStats = () => api.get("/dashboard/stats");

// Products
export const getStoreProducts = () => api.get("/products");
export const getAdminProducts = () => api.get("/products/admin/all");
export const createProduct = (data) => api.post("/products", data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Notifications
export const getNotifications = () => api.get("/notifications");
export const markAsRead = (id) => api.put(`/notifications/${id}/read`);
export const markAllAsRead = () => api.put("/notifications/read-all");
export const deleteNotification = (id) => api.delete(`/notifications/${id}`);
export const clearAllNotifications = () =>
  api.delete("/notifications/clear-all");

// Inventory
export const getInventory = () => api.get("/inventory");
export const getInventorySummary = () => api.get("/inventory/summary");
export const updateStock = (id, quantity) =>
  api.put(`/inventory/${id}/stock`, { quantity });
export const adjustStock = (id, adjustment) =>
  api.put(`/inventory/${id}/adjust`, { adjustment });

// Orders
export const getOrders = () => api.get("/orders");
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const createOrder = (data) => api.post("/orders", data);
export const deleteOrder = (id) => api.delete(`/orders/${id}`);
export const updateDeliveryCharge = (id, data) =>
  api.put(`/orders/${id}/delivery-charge`, data);
export const updateOrderStatus = (id, status) => {
  const payload =
    typeof status === "object" && status !== null ? status : { status };
  return api.put(`/orders/${id}/status`, payload);
};

// Contacts
export const getContacts = () => api.get("/contacts");
export const createContact = (data) => api.post("/contacts", data);
export const deleteContact = (id) => api.delete(`/contacts/${id}`);

// Services API
export const getActiveServices = () => api.get("/services/active");
export const getAdminServices = () => api.get("/services");
export const getServiceById = (id) => api.get(`/services/${id}`);
export const createService = (data) => api.post("/services", data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);

// Clients API
export const getActiveClients = () => api.get("/clients/active");
export const getAdminClients = () => api.get("/clients");
export const getClientById = (id) => api.get(`/clients/${id}`);
export const createClient = (data) => api.post("/clients", data);
export const updateClient = (id, data) => api.put(`/clients/${id}`, data);
export const deleteClient = (id) => api.delete(`/clients/${id}`);

// Hero Content API
export const getActiveHeroContent = () => api.get("/hero/active");
export const getAdminHeroContent = () => api.get("/hero");
export const getHeroContentById = (id) => api.get(`/hero/${id}`);
export const createHeroContent = (data) => api.post("/hero", data);
export const updateHeroContent = (id, data) => api.put(`/hero/${id}`, data);
export const deleteHeroContent = (id) => api.delete(`/hero/${id}`);

// Layout Order API
export const getLayoutOrder = () => api.get("/layout-order");
export const updateLayoutOrder = (sections) =>
  api.put("/layout-order", sections);

export default api;
