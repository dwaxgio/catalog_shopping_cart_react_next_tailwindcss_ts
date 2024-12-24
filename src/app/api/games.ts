import { NextApiRequest, NextApiResponse } from "next";
import { allGames, availableFilters } from "../../utils/endpoint";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { genre = "All", limit } = req.query;

  let filteredGames =
    genre === "All"
      ? allGames
      : allGames.filter((game) => game.genre === genre);

  const limitedGames = limit
    ? filteredGames.slice(0, Number(limit))
    : filteredGames;

  res.status(200).json({
    games: limitedGames,
    availableFilters,
  });
}
