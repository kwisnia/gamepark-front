import { useCallback, useState } from "react";
import { GameListElement } from "../types/game";
import useSWRInfinite from "swr/infinite";

const useGames = (pageSize: number = 50) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<number[]>([]);
  const [sort, setSort] = useState("aggregated_rating");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const getKey = useCallback(
    (pageIndex: number, previousPageData: GameListElement[] | undefined) => {
      if (previousPageData && !previousPageData.length) return null;
      return `/games?page=${pageIndex + 1}&pageSize=${pageSize}${filters
        .map((id) => `&filters=${id}`)
        .join("")}&search=${search.toLowerCase()}&sort=${sort}.${order}`;
    },
    [search, filters, sort, order, pageSize]
  );

  const { data, setSize } = useSWRInfinite<GameListElement[]>(getKey, {
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
