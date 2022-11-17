import { useCallback, useEffect, useMemo, useState } from "react";
import { UserReview } from "../types/review";
import useSWRInfinite from "swr/infinite";

const useReviews = (gameSlug: string, pageSize: number = 20) => {
  const [filters, setFilters] = useState<number[]>([]);

  const getKey = useCallback(
    (pageIndex: number, previousPageData: UserReview[] | undefined) => {
      if (previousPageData && !previousPageData.length) return null;
      return `/games/${gameSlug}/reviews?page=${
        pageIndex + 1
      }&pageSize=${pageSize}${filters.map((id) => `&filters=${id}`).join("")}`;
    },
    [filters, gameSlug, pageSize]
  );

  const { data, size, setSize, mutate, error } =
    useSWRInfinite<UserReview[]>(getKey);

  useEffect(() => {
    setSize(1);
  }, [filters, setSize]);

  const fetchNextPage = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  const reviews = useMemo(() => data?.flat() ?? [], [data]);

  const isLoadingInitialData = !data && !error;
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < pageSize);
  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === "undefined" && !isReachingEnd;

  return {
    reviews,
    fetchNextPage,
    filters,
    setFilters,
    mutate,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
  };
};

export default useReviews;
