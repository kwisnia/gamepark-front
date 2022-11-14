import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import { UserActivity } from "../types/dashboard";

const useFollowedActivities = (username?: string, pageSize: number = 25) => {
  const getKey = useCallback(
    (pageIndex: number, previousPageData: UserActivity[] | undefined) => {
      if (!username) return null;
      if (previousPageData && !previousPageData.length) return null;
      return `/dashboard?page=${pageIndex + 1}&pageSize=${pageSize}`;
    },
    [pageSize, username]
  );

  const { data, size, setSize, mutate, error } =
    useSWRInfinite<UserActivity[]>(getKey);

  const fetchNextPage = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  const activities = data?.flat() ?? [];

  console.log(data, typeof data?.[size - 1], size);

  const isLoadingInitialData = !data && !error;
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < pageSize);
  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === "undefined" && !isReachingEnd;

  return {
    activities,
    fetchNextPage,
    mutate,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    error,
  };
};

export default useFollowedActivities;
