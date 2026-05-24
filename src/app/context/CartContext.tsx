import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  gradient: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = window.localStorage.getItem('sfx_cart_v1');
      if (!stored) return [];
      const parsed = JSON.parse(stored) as CartItem[];
      return Array.isArray(parsed)
        ? parsed.filter((item) => item && typeof item.id === 'string' && typeof item.price === 'number')
        : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen]         = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem('sfx_cart_v1', JSON.stringify(items));
    } catch {
      // Cart persistence is best-effort only.
    }
  }, [items]);

  const addToCart = (item: CartItem) => {
    setItems((prev) => {
      if (prev.find(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const openCart     = () => setIsCartOpen(true);
  const closeCart    = () => setIsCartOpen(false);
  const openCheckout = () => { setIsCartOpen(false); setIsCheckoutOpen(true); };
  const closeCheckout = () => setIsCheckoutOpen(false);

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, clearCart, total,
      isCartOpen, openCart, closeCart,
      isCheckoutOpen, openCheckout, closeCheckout,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
