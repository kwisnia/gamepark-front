import { useCallback, useEffect, useState } from "react";
import { GameListElement } from "../types/game";
import { SWRInfiniteKeyLoader } from "swr/infinite";
import useSWRInfinite from "swr/infinite";
import { getPlaiceholder } from "plaiceholder";

const useGames = () => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<number[]>([]);
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const getKey = useCallback(
    (pageIndex: number, previousPageData: GameListElement[] | undefined) => {
      if (previousPageData && !previousPageData.length) return null;
      return `/games?page=${pageIndex + 1}&pageSize=50${filters
        .map((id) => `&filters=${id}`)
        .join("")}&search=${search.toLowerCase()}&sort=${sort}.${order}`;
    },
    [search, filters, sort, order]
  );

  const { data, size, setSize } = useSWRInfinite<GameListElement[]>(getKey, {
    revalidateFirstPage: false,
  });

  const fetchNextPage = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  return {
    games: data,
    fetchNextPage,
    filters,
    setFilters,
    search,
    setSearch,
    sort,
    setSort,
    order,
    setOrder,
  };
};

export default useGames;
