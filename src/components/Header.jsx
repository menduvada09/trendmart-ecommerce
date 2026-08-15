import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiBell,
} from "react-icons/fi";
import { setSearchQuery } from "../redux/slices/productSlice";
import { logout } from "../redux/slices/authSlice";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSearchInput, setShowSearchInput] = useState(false);

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const searchQuery = useSelector((state) => state.products.searchQuery);

  const totalCartUnits = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="bg-sky-600 text-white font-bold text-lg px-2.5 py-1 rounded">
            TM
          </span>
          <span className="font-extrabold text-xl tracking-tight text-slate-800">
            Trend<span className="text-sky-600">Mart</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {showSearchInput ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                autoFocus
                className="w-48 sm:w-64 border border-slate-300 rounded-full py-1.5 pl-4 pr-8 text-xs focus:outline-none focus:border-sky-500"
              />
              <button
                onClick={() => setShowSearchInput(false)}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSearchInput(true)}
              className="p-2 text-slate-600 hover:text-sky-600 rounded-full hover:bg-slate-100"
              aria-label="Open search input"
            >
              <FiSearch size={20} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            className="text-slate-600 hover:text-sky-600 hidden sm:block"
            aria-label="Notifications"
          >
            <FiBell size={20} />
          </button>

          <Link
            to="/wishlist"
            className="relative p-2 text-slate-600 hover:text-sky-600"
            aria-label="Wishlist"
          >
            <FiHeart size={20} />
            {wishlistItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative p-2 text-slate-600 hover:text-sky-600"
            aria-label="Cart"
          >
            <FiShoppingCart size={20} />
            {totalCartUnits > 0 && (
              <span className="absolute top-0 right-0 bg-sky-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalCartUnits}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-700 hidden md:inline">
                {user.email.split("@")[0]}
              </span>
              <button
                onClick={() => dispatch(logout())}
                className="flex items-center gap-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded"
              >
                <FiLogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-1 text-xs bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5 rounded font-semibold"
            >
              <FiUser size={14} /> Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
