import { createSlice } from "@reduxjs/toolkit";

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("trendmart_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const initialUser = getStoredUser();

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: initialUser,
    isAuthenticated: Boolean(initialUser),
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      try {
        localStorage.setItem("trendmart_user", JSON.stringify(action.payload));
      } catch (err) {
        console.error("Failed to save user to localStorage", err);
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      try {
        localStorage.removeItem("trendmart_user");
      } catch (err) {
        console.error("Failed to remove user from localStorage", err);
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
