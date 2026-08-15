import { createSlice } from "@reduxjs/toolkit";

const getStoredWishlist = () => {
  try {
    const raw = localStorage.getItem("trendmart_wishlist");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveWishlist = (items) => {
  try {
    localStorage.setItem("trendmart_wishlist", JSON.stringify(items));
  } catch (err) {
    console.error("Failed to save wishlist to localStorage", err);
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: getStoredWishlist(),
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const existsIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existsIndex >= 0) {
        state.items.splice(existsIndex, 1);
      } else {
        state.items.push(action.payload);
      }
      saveWishlist(state.items);
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
