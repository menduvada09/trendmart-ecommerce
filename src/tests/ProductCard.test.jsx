import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../redux/slices/cartSlice";
import wishlistReducer from "../redux/slices/wishlistSlice";
import ProductCard from "../components/ProductCard";

const sampleProduct = {
  id: 101,
  title: "Solid Gold Petite Micropave Ring",
  price: 168.0,
  category: "jewelery",
  image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
  rating: { rate: 4.6, count: 400 },
};

function renderWithStore(component) {
  const store = configureStore({
    reducer: {
      cart: cartReducer,
      wishlist: wishlistReducer,
    },
  });
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  );
}

describe("ProductCard Component", () => {
  it("renders product information properly", () => {
    renderWithStore(<ProductCard product={sampleProduct} />);
    expect(
      screen.getByText(/Solid Gold Petite Micropave Ring/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/jewelery/i)).toBeInTheDocument();
  });

  it('toggles to "Go to Cart" button when item is added', () => {
    renderWithStore(<ProductCard product={sampleProduct} />);
    const button = screen.getByRole("button", { name: /Add to Cart/i });
    fireEvent.click(button);
    expect(
      screen.getByRole("button", { name: /Go to Cart/i })
    ).toBeInTheDocument();
  });
});
