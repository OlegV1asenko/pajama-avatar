"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ShopItem, ShopItemVariant } from '@/components/PajamaShopModal';

export interface CartItem {
  id: string; // unique key, e.g. `${productId}-${variant || 'base'}-${size || 'base'}`
  productId: string;
  name: string;
  price: number;
  imageSrc: string;
  variantName?: string;
  size?: string;
  quantity: number;
  colorTheme: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: ShopItem, variant?: ShopItemVariant | null, size?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  totalCount: number;
  totalAmount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  toastMessage: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // 1. Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('pajama_charity_cart');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
    setIsInitialized(true);
  }, []);

  // 2. Save to localStorage on change
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('pajama_charity_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, isInitialized]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  const addToCart = (
    product: ShopItem,
    variant?: ShopItemVariant | null,
    size?: string,
    quantity = 1
  ) => {
    const finalPrice = variant ? variant.price : product.price;
    const variantLabel = variant ? variant.name : undefined;
    const sizeLabel = size && size.trim() !== '' ? size : undefined;
    const cartItemId = `${product.id}-${variantLabel || 'default'}-${sizeLabel || 'default'}`;

    setItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.id === cartItemId);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            name: product.name,
            price: finalPrice,
            imageSrc: product.imageSrc,
            variantName: variantLabel,
            size: sizeLabel,
            quantity: Math.max(1, quantity),
            colorTheme: product.colorTheme,
          },
        ];
      }
    });

    showToast(`«${product.name}» додано в кошик! 🛍️`);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        totalAmount,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toastMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
