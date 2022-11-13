import { useCallback, useState } from "react";
import { GameListElement, SortDirection } from "../types/game";
import useSWRInfinite from "swr/infinite";

const useGames = (pageSize: number = 50) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<number[]>([]);
  const [sort, setSort] = useState("aggregated_rating");
  const [order, setOrder] = useState<SortDirection>(SortDirection.Descending);

  const getKey = useCallback(
    (pageIndex: number, previousPageData: GameListElement[] | undefined) => {
      if (previousPageData && !previousPageData.length) return null;
      return `/games?page=${pageIndex + 1}&pageSize=${pageSize}${filters
        .map((id) => `&filters=${id}`)
        .join("")}&search=${search.toLowerCase()}&sort=${sort}.${order}`;
    },
    [search, filters, sort, order, pageSize]
  );

  const { data, size, setSize, error } = useSWRInfinite<GameListElement[]>(
    getKey,
    {
      revalidateFirstPage: false,
    }
  );

  const fetchNextPage = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  const isLoadingInitialData = !data && !error;
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < pageSize);
  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === "undefined" && !isReachingEnd;

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
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
  };
};

export default useGames;
