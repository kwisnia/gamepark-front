import { useCallback, useState } from "react";
import { UserReview } from "../types/review";
import useSWRInfinite from "swr/infinite";
import { DiscussionPost } from "../types/discussion";

const useDiscussionPosts = (
  gameSlug: string,
  discussionId: number,
  pageSize: number = 20
) => {
  const getKey = useCallback(
    (pageIndex: number, previousPageData: DiscussionPost[] | undefined) => {
      if (previousPageData && !previousPageData.length) return null;
      return `/games/${gameSlug}/discussions/${discussionId}/posts?page=${
        pageIndex + 1
      }&pageSize=${pageSize}`;
    },
    [gameSlug, pageSize, discussionId]
  );

  const { data, size, setSize, mutate } =
    useSWRInfinite<DiscussionPost[]>(getKey);

  const fetchNextPage = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  return {
    posts: data,
    fetchNextPage,
    mutate,
  };
};

export default useDiscussionPosts;
