import { Flex, SimpleGrid } from "@chakra-ui/react";
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
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <div className="w-4/5 m-auto">
      <Flex width={"full"} justifyContent={"flex-end"} paddingRight={8}>
        <FilterSortWindow
          filter={filters}
          setFilter={setFilters}
          sort={sort}
          setSort={setSort}
        />
      </Flex>
      <SimpleGrid columns={5} columnGap={16} rowGap={8}>
        {games &&
          games.map((games) =>
            games.map((game) => <GameListElement key={game.slug} game={game} />)
          )}
        {games && <div ref={ref} className="h-1" />}
      </SimpleGrid>
    </div>
  );
};

export default GamesList;
