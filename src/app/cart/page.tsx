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
      <a
        href="/"
        className="text-blue-500 text-lg font-semibold hover:underline"
      >
        ← Back to Catalog
      </a>

      <div className="p-4">
        <h2 className="text-xl font-bold">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">No items in cart</p>
        ) : (
          <>
            <p>
              {cart.length} {cart.length > 1 ? "items" : "item"}
            </p>

            <ul className="space-y-4">
              {cart.map((item: Game) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16"
                    />
                    <div>
                      <p className="text-gray-600">{item.genre}</p>
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="text-gray-600">{item.description}</p>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="hover:underline"
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <button className="bg-blue-500 text-white p-2 rounded">
                Checkout
              </button>
            </div>
          </>
        )}
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
