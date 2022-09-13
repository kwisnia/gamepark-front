import { NextPage } from "next";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import GameListElement from "../../components/GameListElement";
import useGames from "../../hooks/useGames";

const GamesList: NextPage = () => {
  const { games, fetchNextPage } = useGames();
  const { ref, inView, entry } = useInView();

  useEffect(() => {
    if (inView) {
      console.log("New page time");
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className="grid grid-cols-5 gap-4 w-4/5 m-auto">
      {games &&
        games.map((games) =>
          games.data.map((game) => (
            <GameListElement key={game.slug} game={game} />
          ))
        )}
      {games && <div ref={ref} className="h-1" />}
    </div>
  );
};

export default GamesList;
