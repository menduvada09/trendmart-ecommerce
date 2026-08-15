import React, { useState, useEffect } from "react";

const bannerItems = [
  {
    tag: "Limited Time Deal",
    title: "Spring Tech & Fashion 2026",
    desc: "Get flat 15% automatic discount on all electronics and apparel items.",
    bgStyle: "bg-gradient-to-r from-sky-700 to-indigo-800",
  },
  {
    tag: "Hardware Essentials",
    title: "Certified Computing Accessories",
    desc: "Reliable solid state drives and monitors with direct warranty support.",
    bgStyle: "bg-gradient-to-r from-slate-900 to-sky-900",
  },
  {
    tag: "Jewelry Collection",
    title: "Crafted Everyday Wear",
    desc: "Silver and gold-plated accessories with insured fast delivery.",
    bgStyle: "bg-gradient-to-r from-amber-700 to-rose-900",
  },
];

export default function BannerCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % bannerItems.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-xl text-white shadow my-6">
      <div
        className={`p-8 sm:p-10 transition-all duration-700 ${bannerItems[activeIdx].bgStyle}`}
      >
        <div className="max-w-md">
          <span className="bg-white/20 text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">
            {bannerItems[activeIdx].tag}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-3 tracking-tight">
            {bannerItems[activeIdx].title}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-200">
            {bannerItems[activeIdx].desc}
          </p>
        </div>
      </div>
      <div className="absolute bottom-4 right-6 flex gap-1.5">
        {bannerItems.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`h-2 rounded-full transition-all ${
              activeIdx === i ? "bg-white w-6" : "bg-white/40 w-2"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
