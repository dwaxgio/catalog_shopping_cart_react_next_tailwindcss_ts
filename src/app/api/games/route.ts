import { allGames, availableFilters, delay } from "@/utils/endpoint";

const ITEMS_PER_PAGE = 12;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const genre = searchParams.get("genre");
  let page = parseInt(searchParams.get("page") ?? "1");

  let games = allGames;

  if (genre && genre.toLowerCase() !== "all") {
    games = games.filter(
      (game) => game.genre.toLowerCase() === genre.toLowerCase()
    );
  }

  if (page < 1 || isNaN(page)) page = 1;

  await delay(2000);

  const fromIndex = (page - 1) * ITEMS_PER_PAGE;
  const toIndex = page * ITEMS_PER_PAGE;
  const paginatedGames = games.slice(fromIndex, toIndex);

  const totalPages = Math.ceil(games.length / ITEMS_PER_PAGE);
  const currentPage = page;

  return new Response(
    JSON.stringify({
      games: paginatedGames,
      availableFilters,
      totalPages,
      currentPage,
    }),
    { headers: { "Content-Type": "application/json" }, status: 200 }
  );
}
