import React from "react";

export default function PrivacyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
        <h3 className="text-base font-bold text-slate-900 mb-2">
          Terms of Service & Privacy
        </h3>
        <div className="text-xs text-slate-600 space-y-2 max-h-56 overflow-y-auto pr-2">
          <p>
            1. <strong>Local Storage Usage:</strong> Your cart items and saved
            favorites are kept locally on your web browser via localStorage.
          </p>
          <p>
            2. <strong>Product Data:</strong> All product listings, mock prices,
            and categories are retrieved in real-time from the public Fake Store
            API.
          </p>
          <p>
            3. <strong>Data Privacy:</strong> No personal credentials or payment
            details are collected or transmitted to external servers.
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-sky-600 text-white text-xs font-semibold rounded hover:bg-sky-700"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
}
