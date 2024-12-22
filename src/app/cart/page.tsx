"use client";
import { useState } from "react";
import { Game } from "../../utils/endpoint";

const CartPage = () => {
  const [cart, setCart] = useState<Game[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart">
      <header className="custom-main-header flex justify-between items-center">
        <h1 className="custom-main-header-title">GamerShop</h1>
        <div className="custom-main-header-img">
          <a href="/cart">
            <img
              src="/app-images/CART_ICON.png"
              alt="cart-icon"
              className="cursor-pointer"
            />
          </a>
        </div>
      </header>
      <div className="custom-cart-sub-header">
        <div className="custom-cart-sub-header-container">
          <a href="/" className="custom-cart-sub-header-content">
            <img
              src="/app-images/BACK_ICON.png"
              alt="Back to Catalog"
              className="custom-cart-sub-header-content-back-icon"
            />
            <p className="custom-cart-sub-header-content-text">
              Back to Catalog
            </p>
          </a>
        </div>
      </div>

      <div className="p-4 flex flex-col md:flex-row justify-between">
        {/* Items List */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          <p className="text-gray-600 mb-4">
            {cart.length} {cart.length > 1 ? "items" : "item"}
          </p>

          <ul className="space-y-4">
            {cart.map((item: Game) => (
              <li
                key={item.id}
                className="flex items-start justify-between border-b pb-4"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-500 text-sm">{item.genre}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:underline"
                      >
                        x
                      </button>
                    </div>
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="text-gray-500 text-sm">
                      {item.description || "Description if necessary"}
                    </p>
                    <p className="text-lg font-semibold">${item.price}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary */}
        <div className="custom-cart-order-summary">
          <div className="custom-cart-order-summary-detail">
            <h3 className="">Order Summary</h3>
            {cart.length} {cart.length > 1 ? "items" : "item"}
            {cart.map((item: Game) => (
              <div key={item.id} className="flex justify-between">
                <p className="text-gray-600">{item.name}</p>
                <p className="font-semibold">${item.price}</p>
              </div>
            ))}
            <hr className="my-4" />
            <div className="flex justify-between text-lg font-bold">
              <p>Order Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>

          <button className="custom-cart-checkout-button">Checkout</button>
        </div>
      </div>

      <footer className="custom-main-footer">
        <div className="custom-main-footer-information">
          <div className="custom-main-footer-img">
            <img
              src="/app-images/AP_LOGO.png"
              alt="Logo"
              className="logo-image"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;
