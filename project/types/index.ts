export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  description: string;
  sizes: string[];
  colors: Color[];
  categoryId: string;
  rating: number;
  reviews: number;
  isFeatured: boolean;
  isNew: boolean;
  stock: number;
}

export interface Color {
  name: string;
  code: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  color: Color;
  size: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
}

export interface Address {
  id: string;
  title: string;
  recipientName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  phone: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'applePay';
  lastFour?: string;
  expiryDate?: string;
  cardType?: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  address: Address;
  paymentMethod: PaymentMethod;
  date: string;
  trackingNumber?: string;
}