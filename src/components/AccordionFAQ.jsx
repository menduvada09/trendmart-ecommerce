import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    q: "What is the standard delivery timeframe?",
    a: "Orders are processed within 24 hours and delivered within 3 to 5 business days across domestic zones.",
  },
  {
    q: "How can I return an eligible item?",
    a: "Go to your account or contact support within 30 days of receiving the package for a prepaid return label.",
  },
  {
    q: "Are payments and data storage safe?",
    a: "All personal cart and session preferences remain stored locally on your device via standard browser storage APIs.",
  },
];

export default function AccordionFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="my-10 max-w-2xl mx-auto">
      <h3 className="text-lg font-bold text-slate-800 text-center mb-4">
        Frequently Asked Questions
      </h3>
      <div className="space-y-2">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="border border-slate-200 rounded-lg bg-white overflow-hidden"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full px-4 py-3 text-left text-xs font-semibold text-slate-700 flex justify-between items-center hover:bg-slate-50"
            >
              <span>{faq.q}</span>
              <FiChevronDown
                className={`transition-transform duration-200 ${
                  openIndex === idx
                    ? "rotate-180 text-sky-600"
                    : "text-slate-400"
                }`}
              />
            </button>
            {openIndex === idx && (
              <div className="px-4 pb-3 text-xs text-slate-600 border-t border-slate-100 pt-2 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
