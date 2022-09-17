import { NextPage } from "next";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import FilterSortWindow from "../../components/FilterWindow";
import GameListElement from "../../components/GameListElement";
import useGames from "../../hooks/useGames";

const GamesList: NextPage = () => {
  const {
    games,
    fetchNextPage,
    filters,
    setFilters,
    sort,
    setSort,
    order,
    setOrder,
  } = useGames();
  const { ref, inView, entry } = useInView();

  useEffect(() => {
    if (inView) {
      console.log("New page time");
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className="w-4/5 m-auto">
      <FilterSortWindow
        filter={filters}
        setFilter={setFilters}
        sort={sort}
        setSort={setSort}
      />
      <div className="grid grid-cols-5 gap-4">
        {games &&
          games.map((games) =>
            games.map((game) => <GameListElement key={game.slug} game={game} />)
          )}
        {games && <div ref={ref} className="h-1" />}
      </div>
    </div>
  );
};

export default GamesList;
