import { useState, useEffect } from "react";

const CART_KEY = "notestalgia_cart";
const WISHLIST_KEY = "notestalgia_wishlist";

export function useCartWishlist() {
  const [cart, setCart] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Initialize state on mount (client-side only to prevent SSR mismatches)
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_KEY);
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedWishlist = localStorage.getItem(WISHLIST_KEY);
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
    } catch (e) {
      console.error("Failed to load cart/wishlist from localStorage", e);
    }
  }, []);

  const addToCart = (id: string) => {
    setCart((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem(CART_KEY, JSON.stringify(next));
      // Dispatch a custom event to notify other site-nav instances if they coexist
      window.dispatchEvent(new Event("cart_updated"));
      return next;
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => {
      const next = prev.filter((item) => item !== id);
      localStorage.setItem(CART_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("cart_updated"));
      return next;
    });
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = prev.includes(id) 
        ? prev.filter((item) => item !== id) 
        : [...prev, id];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("wishlist_updated"));
      return next;
    });
  };

  const isInCart = (id: string) => cart.includes(id);
  const isInWishlist = (id: string) => wishlist.includes(id);

  // Sync state across different instances / tabs
  useEffect(() => {
    const handleCartUpdate = () => {
      const storedCart = localStorage.getItem(CART_KEY);
      if (storedCart) setCart(JSON.parse(storedCart));
    };

    const handleWishlistUpdate = () => {
      const storedWishlist = localStorage.getItem(WISHLIST_KEY);
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
    };

    window.addEventListener("cart_updated", handleCartUpdate);
    window.addEventListener("wishlist_updated", handleWishlistUpdate);
    return () => {
      window.removeEventListener("cart_updated", handleCartUpdate);
      window.removeEventListener("wishlist_updated", handleWishlistUpdate);
    };
  }, []);

  return {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    toggleWishlist,
    isInCart,
    isInWishlist,
  };
}
