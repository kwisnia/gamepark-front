import { useCallback, useMemo } from "react";
import useSWRInfinite from "swr/infinite";
import { DiscussionPost } from "../types/discussion";

const usePostReplies = (
  gameSlug: string,
  discussionId: number,
  postId: number,
  pageSize: number = 20
) => {
  const getKey = useCallback(
    (pageIndex: number, previousPageData: DiscussionPost[] | undefined) => {
      if (previousPageData && !previousPageData.length) return null;
      return `/games/${gameSlug}/discussions/${discussionId}/posts/${postId}/replies?page=${
        pageIndex + 1
      }&pageSize=${pageSize}`;
    },
    [gameSlug, pageSize, discussionId, postId]
  );

  const { data, size, setSize, mutate, error } =
    useSWRInfinite<DiscussionPost[]>(getKey);

  const fetchNextPage = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  const posts = useMemo(() => data?.flat() ?? [], [data]);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === "undefined";
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < pageSize);
  return {
    posts,
    fetchNextPage,
    mutate,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
  };
};

export default usePostReplies;
