import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSpinDelay } from "spin-delay";
import usePostReplies from "../../hooks/usePostReplies";
import type { DiscussionPost, GameDiscussion } from "../../types/discussion";
import DiscussionReplyPost from "./DiscussionReplyPost";
import DiscussionReplyPostSkeleton from "./DiscussionReplyPostSkeleton";

interface DiscussionPostRepliesContainerProps {
  post: DiscussionPost;
  discussion: GameDiscussion;
}

const DiscussionPostRepliesContainer = ({
  post,
  discussion,
}: DiscussionPostRepliesContainerProps) => {
  const {
    posts,
    mutate,
    fetchNextPage,
    isLoadingInitialData,
    isLoadingMore,
    isReachingEnd,
  } = usePostReplies(discussion.game, discussion.id, post.id);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isReachingEnd) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isReachingEnd]);

  const shouldRenderSkeleton =
    useSpinDelay(isLoadingInitialData) || isLoadingMore;

  return (
    <Box pl={3} borderLeft="1px">
      {posts.map((post) => (
        <DiscussionReplyPost
          key={post.id}
          post={post}
          discussion={discussion}
          mutate={mutate}
          withActions
        />
      ))}
      {shouldRenderSkeleton
        ? Array(3).map((_, i) => (
            <DiscussionReplyPostSkeleton
              key={`post-${post.id}-reply-skeleton-${i}`}
            />
          ))
        : null}
      <Box ref={ref} height={1} />
    </Box>
  );
};

export default DiscussionPostRepliesContainer;
