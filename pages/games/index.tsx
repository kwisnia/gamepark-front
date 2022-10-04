import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useDebouncedCallback } from "use-debounce";
import FilterSortWindow from "../../components/FilterWindow";
import GameListElement from "../../components/GameListElement";
import useGames from "../../hooks/useGames";

const GamesList: NextPage = () => {
  const {
    games,
    fetchNextPage,
    filters,
    setFilters,
    search,
    setSearch,
    sort,
    setSort,
    order,
    setOrder,
  } = useGames();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const handleSearchChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    500
  );

  return (
    <div className="w-4/5 m-auto">
      <Flex width={"full"} justifyContent={"space-between"} padding={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search for a game"
            onChange={handleSearchChange}
            backgroundColor="gray.600"
            border={"none"}
            width="md"
          />
        </InputGroup>
        <FilterSortWindow
          filter={filters}
          setFilter={setFilters}
          sort={sort}
          setSort={setSort}
          order={order}
          setOrder={setOrder}
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
