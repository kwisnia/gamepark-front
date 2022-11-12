import { useCallback, useState } from "react";
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

  const { data, setSize, mutate, error } = useSWRInfinite<UserReview[]>(getKey);

  const fetchNextPage = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);
  const isLoading = !data && !error;

  return {
    reviews: data,
    fetchNextPage,
    filters,
    setFilters,
    mutate,
    isLoading,
  };
};

export default useReviews;
