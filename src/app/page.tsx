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
  const [totalGames, setTotalGames] = useState<number>(0);
  const [page, setPage] = useState<number>(1);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  useEffect(() => {
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
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/games?genre=${genre}&page=${page}&limit=12`
        );
        const data = await response.json();
        setTotalGames(data.totalGames);

        if (page === 1) {
          setGames(data.games);
          setDisplayedGames(data.games);
        } else {
          setDisplayedGames((prev) => [...prev, ...data.games]);
        }
      } catch (error) {
        console.error("Error fetching games:", error);
      }
      setLoading(false);
    };

    fetchGames();
  }, [genre, API_URL, page]);

  const toggleCartItem = (game: Game) => {
    const isInCart = cart.some((item) => item.id === game.id);
    const updatedCart = isInCart
      ? cart.filter((item) => item.id !== game.id)
      : [...cart, game];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const loadMoreGames = () => {
    setPage(page + 1);
  };

  const showSeeMoreButton = !loading && displayedGames.length < totalGames;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="catalog-container flex-1">
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
                onChange={(e) => {
                  setGenre(e.target.value);
                  setVisibleCount(12);
                  setDisplayedGames([]);
                  setGames([]);
                  setPage(1);
                }}
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
          {showSeeMoreButton && (
            <div className="custom-see-more-container flex justify-center mt-4">
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

export default CatalogPage;
