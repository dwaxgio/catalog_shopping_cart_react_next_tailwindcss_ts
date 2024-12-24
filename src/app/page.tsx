"use client";
import { useEffect, useState } from "react";

interface Game {
  id: string;
  genre: string;
  image: string;
  name: string;
  description: string;
  price: number;
  isNew: boolean;
}

const CatalogPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [displayedGames, setDisplayedGames] = useState<Game[]>([]);
  const [filters, setFilters] = useState<string[]>(["All"]);
  const [genre, setGenre] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<Game[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(12);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // Cargar carrito desde localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  useEffect(() => {
    // Obtener filtros desde la API
    const fetchFilters = async () => {
      try {
        const response = await fetch(`${API_URL}/games`);
        const data = await response.json();
        setFilters(["All", ...data.availableFilters]);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };

    fetchFilters();
  }, [API_URL]);

  useEffect(() => {
    // Obtener juegos desde la API
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/games?genre=${genre}&limit=${visibleCount}`
        );
        const data = await response.json();
        setGames(data.games);
        setDisplayedGames(data.games.slice(0, visibleCount));
      } catch (error) {
        console.error("Error fetching games:", error);
      }
      setLoading(false);
    };

    fetchGames();
  }, [genre, visibleCount, API_URL]);

  const toggleCartItem = (game: Game) => {
    const isInCart = cart.some((item) => item.id === game.id);
    const updatedCart = isInCart
      ? cart.filter((item) => item.id !== game.id)
      : [...cart, game];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const loadMoreGames = () => {
    setVisibleCount((prevCount) => prevCount + 3);
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
              <p className="custom-main-sub-header-title-filter-text">
                Genre &nbsp;&nbsp;|&nbsp;&nbsp;
              </p>
              <select
                onChange={(e) => setGenre(e.target.value)}
                className="custom-main-sub-header-title-filter-filter"
              >
                {filters.map((filter) => (
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
            ) : displayedGames.length > 0 ? (
              displayedGames.map((game) => (
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

          {!loading && displayedGames.length < games.length && (
            <div className="custom-see-more-container">
              <button
                onClick={loadMoreGames}
                className="custom-see-more-button"
              >
                SEE MORE
              </button>
            </div>
          )}
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
