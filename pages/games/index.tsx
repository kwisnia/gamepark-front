import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
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
    <Box
      margin="auto"
      width={{
        base: "100%",
        md: "80%",
      }}
    >
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
            width={{
              base: "100%",
              md: "50%",
            }}
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
      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg: 3,
          xl: 4,
          "2xl": 5,
        }}
        rowGap={8}
        columnGap={8}
        justifyItems="center"
      >
        {games
          ? games.map((games) =>
              games.map((game) => (
                <GameListElement key={game.slug} game={game} />
              ))
            )
          : null}
        {games ? <div ref={ref} className="h-1" /> : null}
      </SimpleGrid>
    </Box>
  );
};

export default GamesList;
