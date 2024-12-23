"use client";
import { useEffect, useState } from "react";
import { allGames, availableFilters, delay, Game } from "../utils/endpoint";

const CatalogPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [genre, setGenre] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<Game[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      await delay(500);
      const filteredGames =
        genre === "All"
          ? allGames
          : allGames.filter((game) => game.genre === genre);
      setGames(filteredGames);
      setLoading(false);
    };
    fetchGames();
  }, [genre]);

  const toggleCartItem = (game: Game) => {
    const isInCart = cart.some((item) => item.id === game.id);
    let updatedCart;
    if (isInCart) {
      updatedCart = cart.filter((item) => item.id !== game.id);
    } else {
      updatedCart = [...cart, game];
    }
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      <div className="catalog-container">
        <div className="catalog">
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

          <div className="custom-main-sub-header">
            <h2 className="custom-main-sub-header-title">Top Sellers</h2>
            <br />
            <div className="custom-main-sub-header-title-filter">
              Genre<span> | </span>
              <select
                onChange={(e) => setGenre(e.target.value)}
                className="border rounded p-2 my-4"
              >
                <option value="All">All</option>
                {availableFilters.map((filter) => (
                  <option key={filter} value={filter}>
                    {filter}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="custom-cards-container">
            {loading ? (
              <p>Loading...</p>
            ) : games.length > 0 ? (
              games.map((game) => (
                <div key={game.id} className="custom-card relative">
                  {game.isNew && <div className="custom-card-new">New</div>}

                  <img
                    src={game.image}
                    alt={game.name}
                    className="custom-card-img"
                  />

                  <div className="custom-card-genre">
                    <p>{game.genre}</p>
                  </div>
                  <div className="custom-card-header">
                    <p className="custom-card-name">{game.name}</p>
                    <p className="custom-card-price">${game.price}</p>
                  </div>
                  <button
                    onClick={() => toggleCartItem(game)}
                    className="custom-card-button"
                  >
                    {cart.some((item) => item.id === game.id)
                      ? "Remove"
                      : "Add to Cart"}
                  </button>
                </div>
              ))
            ) : (
              <p>No games available</p>
            )}
          </div>
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
    </>
  );
};

export default CatalogPage;
