import { CartItem } from '@/types';
import { products } from './products';

export const cartItems: CartItem[] = [
  {
    product: products[0],
    quantity: 1,
    color: products[0].colors[0],
    size: products[0].sizes[2]
  },
  {
    product: products[3],
    quantity: 1,
    color: products[3].colors[1],
    size: products[3].sizes[1]
  }
];

// Mock functions for cart management
// In a real app, these would be connected to API calls or local storage
export const getCartTotal = () => {
  return cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};

export const getCartCount = () => {
  return cartItems.reduce((count, item) => count + item.quantity, 0);
};