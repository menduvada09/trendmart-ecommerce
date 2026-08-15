import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function WishlistPage() {
  const wishlistItems = useSelector((state) => state.wishlist.items);

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          Your Wishlist is Empty
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Click the heart icon on any product to save items here.
        </p>
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-sky-600 text-white rounded text-xs font-bold hover:bg-sky-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-xl font-extrabold text-slate-900 mb-4">
        Saved Products ({wishlistItems.length})
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
