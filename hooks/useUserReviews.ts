import { useCallback, useMemo } from "react";
import { UserReview } from "../types/review";
import useSWRInfinite from "swr/infinite";

const useUserReviews = (username?: string, pageSize: number = 20) => {
  const getKey = useCallback(
    (pageIndex: number, previousPageData: UserReview[] | undefined) => {
      if (!username) {
        return null;
      }
      if (previousPageData && !previousPageData.length) return null;
      return `/${username}/reviews?page=${pageIndex + 1}&pageSize=${pageSize}`;
    },
    [username, pageSize]
  );

  const { data, size, setSize, mutate, error } =
    useSWRInfinite<UserReview[]>(getKey);
  const reviews = useMemo(() => data?.flat() ?? [], [data]);

  const fetchNextPage = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === "undefined";
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < pageSize);

  return {
    reviews,
    fetchNextPage,
    mutate,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
  };
};

export default useUserReviews;
