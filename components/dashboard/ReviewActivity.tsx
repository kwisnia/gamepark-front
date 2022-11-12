import { Flex, Stack, Text } from "@chakra-ui/react";
import { KeyedMutator } from "swr";
import type {
  ReviewActivity as ReviewActivityType,
  UserActivity,
} from "../../types/dashboard";
import { getTimeAgo } from "../../utils/DateUtils";
import UserReview from "../review/UserReview";
import UserDisplay from "../user/UserDisplay";

interface ReviewActivityProps {
  activity: ReviewActivityType;
  mutate: KeyedMutator<UserActivity[][]>;
}

const ReviewActivity = ({ activity, mutate }: ReviewActivityProps) => {
  return (
    <Stack>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" gap={2}>
          <UserDisplay user={activity.user} size="md" />
          <Text fontWeight="bold">created a new review</Text>
        </Flex>
        <Text>{getTimeAgo(activity.createdAt)}</Text>
      </Flex>
      <UserReview
        key={activity.data.review.id}
        review={activity.data.review}
        mutate={mutate}
        isUserPage
      />
    </Stack>
  );
};

export default ReviewActivity;
