import React, { createContext, useContext, useState, useCallback } from 'react';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  images: string[];
}

interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const addToWishlist = useCallback((product: Product) => {
    if (!product || !product.id) {
      console.warn('Invalid product data provided to addToWishlist');
      return;
    }
    setWishlist(prev => {
      // Check if product already exists
      if (prev.some(item => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((id: string) => {
    if (!id) {
      console.warn('Invalid id provided to removeFromWishlist');
      return;
    }
    setWishlist(prev => prev.filter(item => item.id !== id));
  }, []);

  const isInWishlist = useCallback((id: string) => {
    if (!id) {
      console.warn('Invalid id provided to isInWishlist');
      return false;
    }
    return wishlist.some(item => item.id === id);
  }, [wishlist]);

  const value = React.useMemo(() => ({
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  }), [wishlist, addToWishlist, removeFromWishlist, isInWishlist]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
} 