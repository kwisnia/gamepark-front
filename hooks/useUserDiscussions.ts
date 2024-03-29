import { useCallback, useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import { GameDiscussionListItem } from "../types/discussion";

const useUserDiscussions = (username: string, pageSize: number = 20) => {
  const getKey = useCallback(
    (
      pageIndex: number,
      previousPageData: GameDiscussionListItem[] | undefined
    ) => {
      if (!username) return null;
      if (previousPageData && !previousPageData.length) return null;
      return `/${username}/discussions?page=${
        pageIndex + 1
      }&pageSize=${pageSize}`;
    },
    [username, pageSize]
  );

  const { data, size, setSize, mutate, error } =
    useSWRInfinite<GameDiscussionListItem[]>(getKey);
  const discussions = useMemo(() => data?.flat() ?? [], [data]);

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
    discussions,
    fetchNextPage,
    mutate,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
  };
};

export default useUserDiscussions;
