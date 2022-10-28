import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Flex,
  Heading,
  Link,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GameDiscussion } from "../../types/discussion";
import NextLink from "next/link";

interface DiscussionItemProps {
  discussion: GameDiscussion;
}

const DiscussionItem = ({ discussion }: DiscussionItemProps) => {
  console.log(discussion);
  return (
    <Flex
      bg="gray.700"
      rounded="md"
      padding={5}
      marginY={2}
      height="full"
      width="full"
    >
      <Stack direction="column" alignItems="center">
        <ChevronUpIcon w={30} />
        <Heading>{discussion.score}</Heading>
        <ChevronDownIcon />
      </Stack>
      <Stack flex={10} marginLeft={5} alignItems="flex-start" spacing={2}>
        <Heading size="xl">
          <NextLink
            href={`/games/${discussion.game}/discussions/${discussion.id}`}
          >
            <Link variant="link">{discussion.title}</Link>
          </NextLink>
        </Heading>
        <Text fontSize="sm">
          created by{" "}
          <LinkBox as={Flex} gap={2} alignItems="center">
            <Avatar size="xs" />
            <Heading
              fontSize={{
                base: "md",
                md: "lg",
              }}
            >
              <NextLink href={`/users/${discussion.user.username}`} passHref>
                <LinkOverlay>{discussion.user.displayName}</LinkOverlay>
              </NextLink>
            </Heading>
          </LinkBox>
        </Text>
      </Stack>
    </Flex>
  );
};

export default DiscussionItem;
