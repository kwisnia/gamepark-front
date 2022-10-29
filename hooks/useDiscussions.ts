import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import { GameDiscussion, GameDiscussionListItem } from "../types/discussion";

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

  const { data, size, setSize, mutate } =
    useSWRInfinite<GameDiscussionListItem[]>(getKey);

  const fetchNextPage = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  return {
    discussions: data,
    fetchNextPage,
    mutate,
  };
};

export default useDiscussions;
