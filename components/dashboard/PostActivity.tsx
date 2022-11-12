import { Flex, Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import type { KeyedMutator } from "swr";
import type {
  PostActivity as PostActivityType,
  UserActivity,
} from "../../types/dashboard";
import { getTimeAgo } from "../../utils/DateUtils";
import DiscussionReplyPost from "../discussions/DiscussionReplyPost";
import UserDisplay from "../user/UserDisplay";

interface PostActivityProps {
  activity: PostActivityType;
  mutate: KeyedMutator<UserActivity[][]>;
}

const PostActivity = ({ activity, mutate }: PostActivityProps) => {
  return (
    <Stack>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" gap={2}>
          <UserDisplay user={activity.user} size="md" />
          <Text fontWeight="bold">replied to</Text>
          <NextLink
            href={`games/${activity.data.discussion.game}/discussions/${activity.data.discussion.id}`}
            legacyBehavior
            passHref
          >
            <Link>
              <Text fontWeight="bold">{activity.data.discussion.title}</Text>
            </Link>
          </NextLink>
        </Flex>
        <Text>{getTimeAgo(activity.createdAt)}</Text>
      </Flex>
      <DiscussionReplyPost
        discussion={activity.data.discussion}
        post={{
          ...activity.data.post,
          user: activity.user,
        }}
        mutate={mutate}
      />
    </Stack>
  );
};

export default PostActivity;
