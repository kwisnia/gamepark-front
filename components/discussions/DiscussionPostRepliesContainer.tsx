import { Box, useBoolean, useDisclosure, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import usePostReplies from "../../hooks/usePostReplies";
import { DiscussionPost, GameDiscussion } from "../../types/discussion";
import DiscussionReplyPost from "./DiscussionReplyPost";

interface DiscussionPostRepliesContainerProps {
  post: DiscussionPost;
  discussion: GameDiscussion;
}

const DiscussionPostRepliesContainer = ({
  post,
  discussion,
}: DiscussionPostRepliesContainerProps) => {
  const { posts, mutate, fetchNextPage } = usePostReplies(
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

  const postsFlat = posts?.flat() ?? [];

  return (
    <Box pl={3} borderLeft="1px">
      {postsFlat.map((post) => (
        <DiscussionReplyPost
          key={post.id}
          post={post}
          discussion={discussion}
          mutate={mutate}
        />
      ))}
    </Box>
  );
};

export default DiscussionPostRepliesContainer;
