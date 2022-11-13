import { useCallback, useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import { GameDiscussionListItem } from "../types/discussion";

const useDiscussions = (gameSlug: string, pageSize: number = 20) => {
  const getKey = useCallback(
    (
      pageIndex: number,
      previousPageData: GameDiscussionListItem[] | undefined
    ) => {
      if (previousPageData && !previousPageData.length) return null;
      return `/games/${gameSlug}/discussions?page=${
        pageIndex + 1
      }&pageSize=${pageSize}`;
    },
    [gameSlug, pageSize]
  );

  const { data, size, setSize, mutate, error } =
    useSWRInfinite<GameDiscussionListItem[]>(getKey);

  const fetchNextPage = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === "undefined";
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < pageSize);

  const discussions = useMemo(() => data?.flat() ?? [], [data]);

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

export default useDiscussions;
