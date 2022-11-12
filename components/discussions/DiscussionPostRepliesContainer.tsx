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
  const { posts, mutate, fetchNextPage, isLoading } = usePostReplies(
    discussion.game,
    discussion.id,
    post.id
  );
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const shouldRenderSkeleton = useSpinDelay(isLoading);

  const postsFlat = posts?.flat() ?? [];

  const replyNodes = shouldRenderSkeleton
    ? [0, 1, 2].map((i) => (
        <DiscussionReplyPostSkeleton
          key={`post-${post.id}-reply-skeleton-${i}`}
        />
      ))
    : postsFlat.map((post) => (
        <DiscussionReplyPost
          key={post.id}
          post={post}
          discussion={discussion}
          mutate={mutate}
          withActions
        />
      ));

  return (
    <Box pl={3} borderLeft="1px">
      {replyNodes}
      <Box ref={ref} height={1} />
    </Box>
  );
};

export default DiscussionPostRepliesContainer;
