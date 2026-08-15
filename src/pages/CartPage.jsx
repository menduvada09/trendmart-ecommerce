import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FiTrash2, FiMinus, FiPlus, FiArrowRight } from "react-icons/fi";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/slices/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * 0.85 * item.quantity,
    0
  );
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
  const grandTotal = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          Add products from our catalog to review order details here.
        </p>
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-sky-600 text-white rounded text-xs font-bold hover:bg-sky-700"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-extrabold text-slate-900">
          Your Cart ({cartItems.length} items)
        </h1>
        <button
          onClick={() => dispatch(clearCart())}
          className="text-xs text-rose-600 font-semibold hover:underline"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {cartItems.map((item) => {
            const itemPrice = (item.price * 0.85).toFixed(2);
            return (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl p-3.5 flex gap-3 items-center"
              >
                <div className="w-16 h-16 bg-slate-50 p-1.5 rounded flex-shrink-0 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full object-contain"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-xs font-semibold text-slate-800 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-sky-600 font-bold mt-0.5">
                    ${itemPrice}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-slate-200 rounded">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity - 1,
                            })
                          )
                        }
                        disabled={item.quantity <= 1}
                        className="px-2 py-0.5 text-slate-500 hover:text-slate-800 disabled:opacity-30"
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="px-2 text-xs font-bold text-slate-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        className="px-2 py-0.5 text-slate-500 hover:text-slate-800"
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-rose-500 hover:text-rose-700 text-xs flex items-center gap-1"
                    >
                      <FiTrash2 size={12} /> Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900">
                    ${(itemPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 h-fit shadow-sm">
          <h2 className="text-sm font-bold text-slate-900 mb-3">
            Order Summary
          </h2>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-800">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="font-semibold text-slate-800">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            {shipping === 0 && (
              <p className="text-[10px] text-emerald-600">
                Free shipping unlocked above $100 order total.
              </p>
            )}
            <div className="border-t border-slate-100 pt-2 flex justify-between text-xs font-bold text-slate-900">
              <span>Grand Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => alert("Order placement simulated successfully.")}
            className="w-full mt-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded text-xs font-bold flex items-center justify-center gap-1.5"
          >
            Checkout <FiArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
