import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import { BasicUserDetails } from "../types/user";

const useUserFollowing = (username: string, pageSize: number = 50) => {
  const getKey = useCallback(
    (pageIndex: number, previousPageData: BasicUserDetails[] | undefined) => {
      if (!username) return null;
      if (previousPageData && !previousPageData.length) return null;
      return `/${username}/following?page=${
        pageIndex + 1
      }&pageSize=${pageSize}`;
    },
    [username, pageSize]
  );

  const { data, size, setSize, mutate, error } =
    useSWRInfinite<BasicUserDetails[]>(getKey);

  const fetchNextPage = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);
  const following = data?.flat() ?? [];

  const isLoadingInitialData = !data && !error;
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < pageSize);
  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === "undefined" && !isReachingEnd;

  return {
    following,
    fetchNextPage,
    mutate,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
  };
};

export default useUserFollowing;
