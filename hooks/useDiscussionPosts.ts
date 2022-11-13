import { useCallback } from "react";
import useSWRInfinite from "swr/infinite";
import { DiscussionPost } from "../types/discussion";

const useDiscussionPosts = (
  gameSlug: string,
  discussionId: number,
  pageSize: number = 20
) => {
  const getKey = useCallback(
    (pageIndex: number, previousPageData: DiscussionPost[] | undefined) => {
      if (!Boolean(gameSlug && discussionId)) {
        return null;
      }
      if (previousPageData && !previousPageData.length) return null;
      return `/games/${gameSlug}/discussions/${discussionId}/posts?page=${
        pageIndex + 1
      }&pageSize=${pageSize}`;
    },
    [gameSlug, pageSize, discussionId]
  );

  const { data, size, setSize, mutate, error } =
    useSWRInfinite<DiscussionPost[]>(getKey);

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
    posts: data,
    fetchNextPage,
    mutate,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
  };
};

export default useDiscussionPosts;
