import { useCallback, useState } from "react";
import { UserReview } from "../types/review";
import useSWRInfinite from "swr/infinite";

const useReviews = (gameSlug: string, pageSize: number = 20) => {
  const [filters, setFilters] = useState<number[]>([]);
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const getKey = useCallback(
    (pageIndex: number, previousPageData: UserReview[] | undefined) => {
      if (previousPageData && !previousPageData.length) return null;
      return `/games/${gameSlug}/reviews?page=${
        pageIndex + 1
      }&pageSize=${pageSize}${filters
        .map((id) => `&filters=${id}`)
        .join("")}&sort=${sort}.${order}`;
    },
    [filters, sort, order, gameSlug, pageSize]
  );

  const { data, size, setSize, mutate } = useSWRInfinite<UserReview[]>(getKey);

  const fetchNextPage = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  return {
    reviews: data,
    fetchNextPage,
    filters,
    setFilters,
    sort,
    setSort,
    order,
    setOrder,
    mutate,
  };
};

export default useReviews;
