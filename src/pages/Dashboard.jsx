import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  setSelectedCategory,
} from "../redux/slices/productSlice";
import ProductCard from "../components/ProductCard";
import BannerCarousel from "../components/BannerCarousel";
import PoliciesSection from "../components/PoliciesSection";
import AccordionFAQ from "../components/AccordionFAQ";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { items, categories, selectedCategory, searchQuery, status, error } =
    useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const filteredProducts = items.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <BannerCarousel />
      <PoliciesSection />

      <div className="flex items-center gap-2 overflow-x-auto pb-3 my-4 no-scrollbar">
        {categories.map((categoryName) => (
          <button
            key={categoryName}
            onClick={() => dispatch(setSelectedCategory(categoryName))}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap transition ${
              selectedCategory === categoryName
                ? "bg-sky-600 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
            }`}
          >
            {categoryName}
          </button>
        ))}
      </div>

      {status === "loading" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-slate-200 h-72 animate-pulse p-4 flex flex-col justify-between"
            >
              <div className="bg-slate-200 h-36 rounded-lg"></div>
              <div className="space-y-2 mt-3">
                <div className="h-3.5 bg-slate-200 rounded w-3/4"></div>
                <div className="h-3.5 bg-slate-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {status === "failed" && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 p-4 rounded-xl text-center text-xs">
          Failed to load catalog: {error}
        </div>
      )}

      {status === "succeeded" && (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
              <p className="text-slate-500 text-xs">
                No matching products found.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}

      <AccordionFAQ />
    </div>
  );
}
