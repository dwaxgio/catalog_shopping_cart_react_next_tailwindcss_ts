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
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <h1 className="text-2xl font-bold">GamerShop</h1>
      </header>
      <a
        href="/"
        className="text-blue-500 text-lg font-semibold hover:underline"
      >
        Back to Catalog
      </a>

      {/* Contenido principal */}
      <div className="p-4">
        <h2 className="text-xl font-bold">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">No items in cart</p>
        ) : (
          <>
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
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
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
    </div>
  );
};

export default CartPage;
