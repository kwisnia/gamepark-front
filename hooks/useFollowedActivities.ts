import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import { UserActivity } from "../types/dashboard";

const useFollowedActivities = (username: string, pageSize: number = 25) => {
  const getKey = useCallback(
    (pageIndex: number, previousPageData: UserActivity[] | undefined) => {
      if (!username) return null;
      if (previousPageData && !previousPageData.length) return null;
      return `/dashboard?page=${pageIndex + 1}&pageSize=${pageSize}`;
    },
    [pageSize, username]
  );

  const { data, setSize, mutate } = useSWRInfinite<UserActivity[]>(getKey);

  const fetchNextPage = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  return {
    activities: data,
    fetchNextPage,
    mutate,
  };
};

export default useFollowedActivities;
