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
          <Link variant="link">
            <NextLink
              href={`/games/${discussion.game}/discussions/${discussion.id}`}
            >
              {discussion.title}
            </NextLink>
          </Link>
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
              <LinkOverlay>
                <NextLink href={`/users/${discussion.user.username}`}>
                  {discussion.user.displayName}
                </NextLink>
              </LinkOverlay>
            </Heading>
          </LinkBox>
        </Text>
      </Stack>
    </Flex>
  );
};

export default DiscussionItem;
