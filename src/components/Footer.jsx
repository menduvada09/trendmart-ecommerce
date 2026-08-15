import React, { useState } from "react";
import PrivacyModal from "./privacyModal";

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <footer className="bg-slate-900 text-slate-300 mt-16 pt-10 pb-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-sky-500 text-white font-bold text-sm px-2 py-0.5 rounded">
              TM
            </span>
            <span className="font-extrabold text-base text-white">
              TrendMart
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Reliable catalog discovery with persistent cart handling and
            responsive layouts.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
            Navigation
          </h4>
          <ul className="space-y-1 text-xs">
            <li>
              <a href="/" className="hover:text-white">
                Store Home
              </a>
            </li>
            <li>
              <a href="/cart" className="hover:text-white">
                Cart
              </a>
            </li>
            <li>
              <a href="/wishlist" className="hover:text-white">
                Saved Wishlist
              </a>
            </li>
            <li>
              <button
                onClick={() => setModalOpen(true)}
                className="hover:text-white text-left"
              >
                Privacy Policy
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
            Support Desk
          </h4>
          <p className="text-xs text-slate-400">Phone: +91 1800 200 400</p>
          <p className="text-xs text-slate-400 mt-1">
            Email: contact@trendmart.internal
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Available 24 hours daily
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
            Newsletter
          </h4>
          <p className="text-xs text-slate-400 mb-2">
            Receive product updates and discounts.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed to updates.");
            }}
            className="flex gap-2"
          >
            <input
              type="email"
              required
              placeholder="Email address"
              className="bg-slate-800 border border-slate-700 text-white px-2.5 py-1 rounded text-xs flex-grow focus:outline-none focus:border-sky-500"
            />
            <button
              type="submit"
              className="bg-sky-600 text-white px-3 py-1 rounded text-xs font-semibold hover:bg-sky-700"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 border-t border-slate-800 pt-4 text-center text-[11px] text-slate-500">
        TrendMart Capstone Project Submission.
      </div>

      <PrivacyModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </footer>
  );
}
