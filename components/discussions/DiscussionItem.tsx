import { ChatIcon, ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GameDiscussionListItem } from "../../types/discussion";
import NextLink from "next/link";
import DiscussionScore from "./DiscussionScore";
import { useLoginModal } from "../../contexts/LoginModalContext";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { scoreDiscussion } from "../../api/DiscussionApi";
import { KeyedMutator } from "swr";
import UserDisplay from "../user/UserDisplay";

interface DiscussionItemProps {
  discussion: GameDiscussionListItem;
  isUserPage?: boolean;
  mutate?: () => void;
}

const DiscussionItem = ({
  discussion,
  isUserPage,
  mutate,
}: DiscussionItemProps) => {
  const { loggedOut } = useLoggedInUser();
  const { openModal } = useLoginModal();

  const onScoreChange = async (score: number) => {
    if (loggedOut) {
      openModal();
      return;
    }
    await scoreDiscussion(discussion.game, discussion.id, score);
    mutate?.();
  };

  return (
    <Flex bg="gray.700" rounded="md" padding={5} height="full" width="full">
      <DiscussionScore
        score={discussion.score}
        onScoreChange={onScoreChange}
        userScore={discussion.userScore}
      />
      <Stack flex={10} marginLeft={5} alignItems="flex-start" spacing={2}>
        <Heading size="xl">
          <NextLink
            href={`/games/${discussion.game}/discussions/${discussion.id}`}
            legacyBehavior
          >
            <Link variant="link">{discussion.title}</Link>
          </NextLink>
        </Heading>
        {isUserPage ? (
          <Box fontSize="sm">
            <Text>on </Text>
            <LinkBox as={Flex} gap={2} alignItems="center">
              <Heading
                fontSize={{
                  base: "md",
                  md: "lg",
                }}
              >
                <LinkOverlay>
                  <NextLink href={`/games/${discussion.game}`} legacyBehavior>
                    {discussion.gameDetails?.name}
                  </NextLink>
                </LinkOverlay>
              </Heading>
            </LinkBox>
          </Box>
        ) : (
          <Box fontSize="sm">
            <Text>created by</Text>
            <UserDisplay size="sm" user={discussion.user} />
          </Box>
        )}
      </Stack>
      <Flex gap={1} alignItems="center">
        <ChatIcon w={25} h={25} />
        <Text fontWeight="bold" fontSize="xl">
          {discussion.postsCount}
        </Text>
      </Flex>
    </Flex>
  );
};

export default DiscussionItem;
