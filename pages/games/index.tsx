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
import Head from "next/head";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSpinDelay } from "spin-delay";
import { useDebouncedCallback } from "use-debounce";
import EmptyState from "../../components/common/EmptyState";
import FilterSortWindow from "../../components/FilterWindow";
import GameListElement from "../../components/GameListElement";
import GameListSkeleton from "../../components/GameListElementSkeleton";
import useGames from "../../hooks/useGames";

const GamesList: NextPage = () => {
  const {
    games,
    fetchNextPage,
    filters,
    setFilters,
    setSearch,
    sort,
    setSort,
    order,
    setOrder,
    isEmpty,
    isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
  } = useGames();
  const { ref, inView } = useInView();
  const shouldRenderSkeletons =
    useSpinDelay(isLoadingInitialData) || isLoadingMore;

  useEffect(() => {
    if (inView && !isReachingEnd) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isReachingEnd]);

  const handleSearchChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    500
  );

  return (
    <Box
      marginX="auto"
      maxWidth={{
        base: "100%",
        md: "80%",
      }}
    >
      <Head>
        <title>GamePark - Games</title>
      </Head>
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
      {isEmpty ? (
        <EmptyState message="No games found matching your query" />
      ) : null}
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
        {games?.map((games, index) =>
          games.map((game) => (
            <GameListElement
              key={game.slug}
              game={game}
              priority={index === 0}
            />
          ))
        )}
        {shouldRenderSkeletons
          ? [...Array(10)].map((_, i) => (
              <GameListSkeleton key={`games-skeleton-${i}`} />
            ))
          : null}
        <Box h={1} ref={ref} />
      </SimpleGrid>
    </Box>
  );
};

export default GamesList;
