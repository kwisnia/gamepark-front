import { useCallback } from "react";
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

  const { data, setSize, mutate } =
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

export default useUserDiscussions;
