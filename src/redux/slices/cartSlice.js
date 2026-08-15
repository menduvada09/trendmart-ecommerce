import { createSlice } from "@reduxjs/toolkit";

const getStoredCart = () => {
  try {
    const raw = localStorage.getItem("trendmart_cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  try {
    localStorage.setItem("trendmart_cart", JSON.stringify(items));
  } catch (err) {
    console.error("Failed to save cart to localStorage", err);
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getStoredCart(),
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCart(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCart(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const target = state.items.find((item) => item.id === id);
      if (target && quantity > 0) {
        target.quantity = quantity;
      }
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      try {
        localStorage.removeItem("trendmart_cart");
      } catch (err) {
        console.error("Failed to remove cart from localStorage", err);
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
