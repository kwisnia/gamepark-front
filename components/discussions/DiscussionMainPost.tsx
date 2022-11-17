import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import type { KeyedMutator } from "swr";
import { deleteDiscussion, scoreDiscussion } from "../../api/DiscussionApi";
import { useLoginModal } from "../../contexts/LoginModalContext";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import type { GameDiscussion } from "../../types/discussion";
import { IGDBImageSize } from "../../types/game";
import type { GameListElement } from "../../types/game";
import { getCoverUrl } from "../../utils/ImageUtils";
import RemoveConfirmDialog from "../common/RemoveConfirmDialog";
import OutputEditor from "../editor/OutputEditor";
import UserDisplay from "../user/UserDisplay";
import DiscussionScore from "./DiscussionScore";

interface DiscussionProps {
  discussion: GameDiscussion;
  game: GameListElement;
  mutate: KeyedMutator<GameDiscussion>;
}

const DiscussionMainPost = ({ discussion, game, mutate }: DiscussionProps) => {
  const { user, loggedOut } = useLoggedInUser();
  const { openModal } = useLoginModal();
  const {
    isOpen: isConfirmDialogOpen,
    onClose: onConfirmDialogClose,
    onOpen: openConfirmDialog,
  } = useDisclosure();
  const router = useRouter();
  const toast = useToast();

  const onScoreChange = async (score: number) => {
    if (loggedOut) {
      openModal();
      return;
    }
    await scoreDiscussion(discussion.game, discussion.id, score);
    mutate({
      ...discussion,
      score: discussion.score + -1 * discussion.userScore + score,
      userScore: score,
    });
  };

  const onDelete = async () => {
    if (loggedOut) {
      openModal();
      return;
    }
    try {
      await deleteDiscussion(discussion.game, discussion.id);
      router.replace(`/games/${discussion.game}`);
      toast({
        title: "Discussion deleted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: "Error deleting discussion",
        description: "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const isCreator = user?.id === discussion.user.id;

  return (
    <Box>
      <Tooltip label="Go back">
        <IconButton
          aria-label="Go back"
          icon={<ArrowBackIcon />}
          onClick={() => router.back()}
          zIndex="1"
          size="lg"
          variant="ghost"
        />
      </Tooltip>
      <Flex gap={5} w="full" alignItems="center" my={5}>
        <DiscussionScore
          score={discussion.score}
          onScoreChange={onScoreChange}
          userScore={discussion.userScore}
        />
        <Flex justifyContent="space-between" flex={10} alignItems="center">
          <Box>
            <Heading>{discussion.title}</Heading>
            <UserDisplay user={discussion.user} size="md" />
          </Box>
          <Box>
            <Flex gap={3}>
              <Box alignSelf="end">
                <Text>Discussion on</Text>
                <Link href={`/games/${game.slug}`}>
                  <Text fontWeight="bold">{game.name}</Text>
                </Link>
              </Box>
              <Box
                rounded="xl"
                border="2px"
                borderColor="gray.500"
                overflow="hidden"
              >
                <Image
                  src={getCoverUrl(
                    game.cover?.imageId ?? "",
                    IGDBImageSize.CoverSmall,
                    true
                  )}
                  alt={game.name}
                  width={100}
                  height={100}
                />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Flex>
      <Box>
        <OutputEditor content={discussion.body} />
      </Box>
      {isCreator ? (
        <>
          <Button
            aria-label="Delete discussion"
            leftIcon={<DeleteIcon />}
            colorScheme="red"
            size="xs"
            my={3}
            onClick={openConfirmDialog}
          >
            Delete discussion
          </Button>
          <RemoveConfirmDialog
            header="Delete discussion"
            isOpen={isConfirmDialogOpen}
            onClose={onConfirmDialogClose}
            confirmAction={onDelete}
          />
        </>
      ) : null}
    </Box>
  );
};

export default DiscussionMainPost;
