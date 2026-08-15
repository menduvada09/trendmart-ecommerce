import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiHeart, FiStar } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { addToCart } from "../redux/slices/cartSlice";
import { toggleWishlist } from "../redux/slices/wishlistSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isInCart = cartItems.some((item) => item.id === product.id);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const originalPrice = Number(product.price).toFixed(2);
  const discountedPrice = (product.price * 0.85).toFixed(2);

  const handleCartClick = (e) => {
    e.preventDefault();
    if (isInCart) {
      navigate("/cart");
    } else {
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between group">
      <div className="relative p-4 bg-slate-50 flex items-center justify-center h-48">
        <button
          onClick={() => dispatch(toggleWishlist(product))}
          className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow hover:scale-110 transition z-10"
          aria-label="Wishlist toggle"
        >
          {isInWishlist ? (
            <FaHeart className="text-rose-500" size={16} />
          ) : (
            <FiHeart className="text-slate-400" size={16} />
          )}
        </button>
        <img
          src={product.image}
          alt={product.title}
          className="max-h-40 object-contain group-hover:scale-105 transition duration-300"
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-wider font-bold text-sky-600">
            {product.category}
          </span>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-xs font-semibold text-slate-800 line-clamp-2 hover:text-sky-600 mt-1">
              {product.title}
            </h3>
          </Link>

          <div className="flex items-center gap-1 mt-2 text-amber-500 text-xs">
            <FiStar className="fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-700">
              {product.rating?.rate || 4.0}
            </span>
            <span className="text-slate-400">
              ({product.rating?.count || 85})
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-slate-900">
              ${discountedPrice}
            </div>
            <div className="text-[11px] text-slate-400 line-through">
              ${originalPrice}
            </div>
          </div>

          <button
            onClick={handleCartClick}
            className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
              isInCart
                ? "bg-slate-800 text-white hover:bg-slate-900"
                : "bg-sky-600 text-white hover:bg-sky-700"
            }`}
          >
            {isInCart ? "Go to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
