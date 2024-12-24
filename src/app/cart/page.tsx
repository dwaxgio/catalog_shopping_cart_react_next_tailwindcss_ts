"use client";
import { useState, useEffect } from "react";
import { Game } from "../../utils/endpoint";

const CartPage = () => {
  const [cart, setCart] = useState<Game[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      console.log(savedCart); 
      setCart(savedCart);
    }
  }, []);

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container flex-1">
        <div className="cart">
          <header className="custom-main-header">
            <div className="custom-main-header-internal-container">
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
                  {"  "}Back to Catalog
                </p>
              </a>
            </div>
          </div>

          <div className="p-4">
            <div className="custom-cart-sub-sub-header-container">
              <div className="custom-cart-sub-sub-header-title">
                <p>Your Cart</p>
              </div>
              <div className="custom-cart-sub-sub-header-items-count">
                <p>
                  {cart.length} {cart.length > 1 ? "items" : "item"}
                </p>
              </div>
            </div>

            <div className="custom-cart-left-and-right-panels-container flex flex-col md:flex-row gap-8">
              <div className="custom-cart-left-panel">
                <ul className="space-y-4">
                  {cart.map((item: Game, index) => (
                    <li
                      key={item.id}
                      className={`custom-cart-left-item-container ${
                        index !== cart.length - 1 ? "border-bottom" : ""
                      }`}
                    >
                      <div className="custom-cart-left-item-img">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="custom-cart-left-item-information">
                        <div className="custom-cart-left-item-header">
                          <p className="custom-cart-left-item-information-genre">
                            {item.genre}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="custom-cart-left-item-information-remove-button"
                          >
                            X
                          </button>
                        </div>

                        <p className="custom-cart-left-item-information-name">
                          {item.name}
                        </p>
                        <p className="custom-cart-left-item-information-description">
                          {item.description || "Description if necessary"}
                        </p>
                        <div className="custom-cart-left-item-information-price-container">
                          <p className="custom-cart-left-item-information-price">
                            ${item.price}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="custom-cart-right-panel">
                <div className="custom-cart-order-summary">
                  <div className="custom-cart-order-summary-detail">
                    <div className="custom-cart-order-summary-detail-title">
                      Order Summary
                    </div>
                    <div className="custom-cart-order-summary-detail-total-items">
                      {cart.length} {cart.length > 1 ? "items" : "item"}
                    </div>

                    {cart.length > 0 ? (
                      cart.map((item: Game) => (
                        <div key={item.id} className="flex justify-between">
                          <p className="custom-cart-order-summary-detail-name">
                            {item.name}
                          </p>
                          <p className="custom-cart-order-summary-detail-price">
                            ${item.price}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>No items in the cart</p>
                    )}

                    <hr className="my-4" />
                    <div className="custom-cart-order-summary-detail-total-container">
                      <p className="custom-cart-order-summary-detail-total-title">
                        Order Total
                      </p>
                      <p className="custom-cart-order-summary-detail-total-price">
                        $ {total.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <button className="custom-cart-checkout-button">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="custom-main-footer flex-shrink-0">
        <div className="custom-main-footer-information">
          <div className="custom-main-footer-img">
            <a href="/">
              <img
                src="/app-images/AP_LOGO.png"
                alt="Logo"
                className="logo-image"
              />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CartPage;
