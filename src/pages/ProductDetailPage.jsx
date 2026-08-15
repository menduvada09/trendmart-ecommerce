import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FiStar,
  FiHeart,
  FiTruck,
  FiShield,
  FiArrowLeft,
} from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { addToCart } from "../redux/slices/cartSlice";
import { toggleWishlist } from "../redux/slices/wishlistSlice";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isInCart = cartItems.some((item) => item.id === Number(id));
  const isInWishlist = wishlistItems.some((item) => item.id === Number(id));

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-500 text-xs">
        Loading product information...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-600 text-xs mb-3">
          Product could not be found.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-3.5 py-1.5 bg-sky-600 text-white rounded text-xs font-semibold"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const discounted = (product.price * 0.85).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-sky-600 mb-4"
      >
        <FiArrowLeft size={14} /> Back to Catalog
      </button>

      <div className="bg-white border border-slate-200 rounded-xl p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-sm">
        <div className="bg-slate-50 rounded-lg p-6 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-72 object-contain"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">
              {product.category}
            </span>
            <h1 className="text-xl font-bold text-slate-900 mt-2">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                <FiStar className="fill-amber-400" /> {product.rating?.rate}
              </div>
              <span className="text-slate-400 text-xs">
                ({product.rating?.count} reviews)
              </span>
              <span className="text-emerald-600 text-[11px] font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                In Stock
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-slate-900">
                ${discounted}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ${Number(product.price).toFixed(2)}
              </span>
              <span className="text-[11px] font-bold text-emerald-600">
                15% Discount
              </span>
            </div>

            <div className="mt-4 border-t border-b border-slate-100 py-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Details
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 my-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <FiTruck className="text-sky-600" size={16} />
                <span>Delivery: 3-5 Business Days</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FiShield className="text-sky-600" size={16} />
                <span>1-Year Direct Warranty</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() =>
                isInCart ? navigate("/cart") : dispatch(addToCart(product))
              }
              className={`flex-grow py-2.5 rounded-lg font-bold text-xs transition ${
                isInCart
                  ? "bg-slate-900 text-white hover:bg-black"
                  : "bg-sky-600 text-white hover:bg-sky-700"
              }`}
            >
              {isInCart ? "Go to Cart" : "Add to Cart"}
            </button>
            <button
              onClick={() => dispatch(toggleWishlist(product))}
              className="p-2.5 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
              aria-label="Wishlist toggle"
            >
              {isInWishlist ? (
                <FaHeart className="text-rose-500" size={18} />
              ) : (
                <FiHeart className="text-slate-600" size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
