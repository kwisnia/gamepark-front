import {
  ChevronDownIcon,
  ChevronUpIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  pseudoSelectors,
  useBoolean,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FormikHelpers } from "formik";
import { forwardRef } from "react";
import { BsFillReplyFill } from "react-icons/bs";
import { KeyedMutator } from "swr";
import {
  createDiscussionPost,
  deleteDiscussionPost,
  scoreDiscussionPost,
  updateDiscussionPost,
} from "../../api/DiscussionApi";
import { useLoginModal } from "../../contexts/LoginModalContext";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import {
  DiscussionPost,
  DiscussionPostForm,
  GameDiscussion,
} from "../../types/discussion";
import OutputEditor from "../editor/OutputEditor";
import UserDisplay from "../user/UserDisplay";
import DiscussionPostRepliesContainer from "./DiscussionPostRepliesContainer";
import DiscussionReplyForm from "./DiscussionReplyForm";
import DiscussionScore from "./DiscussionScore";
import RemoveConfirmDialog from "../common/RemoveConfirmDialog";

interface DiscussionPostProps {
  post: DiscussionPost;
  discussion: GameDiscussion;
  mutate: KeyedMutator<DiscussionPost[][]>;
}

const DiscussionReplyPost = ({
  post,
  discussion,
  mutate,
}: DiscussionPostProps) => {
  const { user, loggedOut } = useLoggedInUser();
  const { openModal } = useLoginModal();
  const {
    isOpen: isConfirmDialogOpen,
    onClose: onConfirmDialogClose,
    onOpen: openConfirmDialog,
  } = useDisclosure();
  const [isEditing, setIsEditing] = useBoolean();
  const [isReplying, setIsReplying] = useBoolean();
  const [areRepliesVisible, setAreRepliesVisible] = useBoolean();
  const toast = useToast();

  const isAuthor = user?.id === post.user.id;

  const onScoreChange = async (score: number) => {
    if (loggedOut) {
      openModal();
      return;
    }
    await scoreDiscussionPost(discussion.game, discussion.id, post.id, score);
    mutate();
  };

  const deletePost = async () => {
    await deleteDiscussionPost(discussion.game, discussion.id, post.id);
    mutate();
  };

  const handleSubmit = async (
    values: DiscussionPostForm,
    helpers: FormikHelpers<DiscussionPostForm>
  ) => {
    try {
      helpers.setSubmitting(true);
      await updateDiscussionPost(
        discussion.game,
        discussion.id,
        post.id,
        values
      );
      mutate();
      setIsEditing.off();
    } catch (e) {
      toast({
        title: "Error",
        description: "Error occured while trying to update post",
        status: "error",
        isClosable: true,
      });
    } finally {
      helpers.setSubmitting(false);
    }
  };

  const handleReplySubmit = async (
    values: DiscussionPostForm,
    helpers: FormikHelpers<DiscussionPostForm>
  ) => {
    try {
      helpers.setSubmitting(true);
      await createDiscussionPost(discussion.game, discussion.id, values);
      mutate();
      setIsReplying.off();
    } catch (e) {
      toast({
        title: "Error",
        description: "Error occured while trying to update post",
        status: "error",
        isClosable: true,
      });
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <Box bg="gray.700" rounded="md" p={3}>
      <Flex justify="space-between">
        <UserDisplay
          displayName={post.user.displayName}
          username={post.user.username}
          size="md"
        />
        {isAuthor ? (
          <Flex gap={3}>
            <IconButton
              icon={<BsFillReplyFill />}
              aria-label="Reply"
              onClick={setIsReplying.toggle}
            />
            <IconButton
              icon={<EditIcon />}
              onClick={setIsEditing.toggle}
              aria-label="Edit post"
            />
            <IconButton
              icon={<DeleteIcon />}
              onClick={openConfirmDialog}
              aria-label="Delete post"
            />
          </Flex>
        ) : null}
      </Flex>
      <Flex>
        <DiscussionScore
          score={post.score}
          userScore={post.userScore}
          onScoreChange={onScoreChange}
        />
        {isEditing ? (
          <DiscussionReplyForm body={post.body} onSubmit={handleSubmit} />
        ) : (
          <OutputEditor content={post.body} />
        )}
      </Flex>
      {isReplying ? (
        <DiscussionReplyForm onSubmit={handleReplySubmit} replyTo={post} />
      ) : null}
      <Box>
        {post.replyCount > 0 ? (
          <Box>
            <Flex
              alignItems="center"
              cursor="pointer"
              onClick={setAreRepliesVisible.toggle}
            >
              {areRepliesVisible ? <ChevronUpIcon /> : <ChevronDownIcon />}
              {post.replyCount} replies
            </Flex>
            {areRepliesVisible ? (
              <DiscussionPostRepliesContainer
                discussion={discussion}
                post={post}
              />
            ) : null}
          </Box>
        ) : null}
      </Box>
      <RemoveConfirmDialog
        header="Remove your post"
        confirmAction={deletePost}
        isOpen={isConfirmDialogOpen}
        onClose={onConfirmDialogClose}
      />
    </Box>
  );
};
DiscussionReplyPost.displayName = "DiscussionReplyPost";

export default DiscussionReplyPost;
