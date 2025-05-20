import api from '../config/api';

// Auth services
export const authService = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
  getProfile: () => api.get('/auth/me'),
};

// Product services
export const productService = {
  getProducts: (params?: any) => api.get('/products', { params }),
  getProduct: (id: string) => api.get(`/products/${id}`),
  createProduct: (data: any) => api.post('/products', data),
  updateProduct: (id: string, data: any) => api.put(`/products/${id}`, data),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),
  addReview: (id: string, data: any) => api.post(`/products/${id}/reviews`, data),
};

// Category services
export const categoryService = {
  getCategories: (params?: any) => api.get('/categories', { params }),
  getCategory: (id: string) => api.get(`/categories/${id}`),
  createCategory: (data: any) => api.post('/categories', data),
  updateCategory: (id: string, data: any) => api.put(`/categories/${id}`, data),
  deleteCategory: (id: string) => api.delete(`/categories/${id}`),
};

// Order services
export const orderService = {
  getOrders: (params?: any) => api.get('/orders', { params }),
  getMyOrders: () => api.get('/orders/my-orders'),
  getOrder: (id: string) => api.get(`/orders/${id}`),
  createOrder: (data: any) => api.post('/orders', data),
  updateOrderStatus: (id: string, status: string) =>
    api.put(`/orders/${id}/status`, { status }),
  updatePaymentStatus: (id: string, data: any) =>
    api.put(`/orders/${id}/pay`, data),
};

// User services
export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
  updatePassword: (data: any) => api.put('/users/password', data),
  addAddress: (data: any) => api.post('/users/addresses', data),
  updateAddress: (id: string, data: any) =>
    api.put(`/users/addresses/${id}`, data),
  deleteAddress: (id: string) => api.delete(`/users/addresses/${id}`),
  addToWishlist: (productId: string) =>
    api.post(`/users/wishlist/${productId}`),
  removeFromWishlist: (productId: string) =>
    api.delete(`/users/wishlist/${productId}`),
  updateCart: (data: any) => api.put('/users/cart', data),
}; 