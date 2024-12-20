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
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul>
            {cart.map((item: Game) => (
              <li key={item.id}>
                <img src={item.image} alt={item.name} />
                <h2>{item.name}</h2>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button>Checkout</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
