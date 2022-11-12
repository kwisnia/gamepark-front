import { useCallback } from "react";
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

  const { data, setSize, mutate, error } =
    useSWRInfinite<DiscussionPost[]>(getKey);

  const fetchNextPage = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  const isLoading = !data && !error;

  return {
    posts: data,
    fetchNextPage,
    mutate,
    isLoading,
  };
};

export default usePostReplies;
