import { Flex, Stack, Text } from "@chakra-ui/react";
import type { KeyedMutator } from "swr";
import type {
  DiscussionActivity as DiscussionActivityType,
  UserActivity,
} from "../../types/dashboard";
import { getTimeAgo } from "../../utils/DateUtils";
import DiscussionItem from "../discussions/DiscussionItem";
import UserDisplay from "../user/UserDisplay";

interface DiscussionActivityProps {
  activity: DiscussionActivityType;
  mutate: KeyedMutator<UserActivity[][]>;
}

const DiscussionActivity = ({ activity, mutate }: DiscussionActivityProps) => {
  return (
    <Stack>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" gap={2}>
          <UserDisplay user={activity.user} size="md" />
          <Text fontWeight="bold">created a new discussion</Text>
        </Flex>
        <Text>{getTimeAgo(activity.createdAt)}</Text>
      </Flex>
      <DiscussionItem
        discussion={activity.data.discussion}
        mutate={mutate}
        isUserPage
      />
    </Stack>
  );
};

export default DiscussionActivity;
