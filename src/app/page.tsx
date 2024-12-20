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
    <div className="catalog">
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <h1 className="text-2xl font-bold">GamerShop</h1>
        <a
          href="/cart"
          className="text-blue-500 text-lg font-semibold hover:underline"
        >
          View Cart ({cart.length})
        </a>
      </header>

      <div className="p-4">
        <h2 className="text-xl font-bold">Top Sellers</h2>
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
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {games.map((game) => (
              <div key={game.id} className="card">
                <img src={game.image} alt={game.name} />
                <h3>{game.name}</h3>
                <p>{game.genre}</p>
                <p>${game.price}</p>
                <button
                  onClick={() => toggleCartItem(game)}
                  className={
                    cart.some((item) => item.id === game.id)
                      ? "bg-red-500"
                      : "bg-blue-500"
                  }
                >
                  {cart.some((item) => item.id === game.id)
                    ? "Remove"
                    : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
