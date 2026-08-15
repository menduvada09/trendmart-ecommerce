import React from "react";
import { FiTruck, FiRotateCcw, FiHeadphones, FiShield } from "react-icons/fi";

export default function PoliciesSection() {
  const items = [
    {
      icon: <FiTruck size={22} />,
      title: "Free Delivery",
      desc: "Orders above $100",
    },
    {
      icon: <FiRotateCcw size={22} />,
      title: "30-Day Returns",
      desc: "Simple replacement policy",
    },
    {
      icon: <FiHeadphones size={22} />,
      title: "24/7 Assistance",
      desc: "Real-time customer desk",
    },
    {
      icon: <FiShield size={22} />,
      title: "Secure Checkout",
      desc: "Encrypted tokenized billing",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center gap-3"
        >
          <div className="text-sky-600 p-2 bg-sky-50 rounded-lg">
            {item.icon}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">{item.title}</h4>
            <p className="text-[11px] text-slate-500">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
