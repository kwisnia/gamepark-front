import { Flex, Skeleton, SkeletonCircle, Stack } from "@chakra-ui/react";
import { ActivityType } from "../../types/dashboard";
import DiscussionItemSkeleton from "../discussions/DiscussionItemSkeleton";
import DiscussionReplyPostSkeleton from "../discussions/DiscussionReplyPostSkeleton";
import UserReviewSkeleton from "../review/UserReviewSkeleton";

interface ActivitySkeletonProps {
  type: ActivityType;
}

const ActivitySkeleton = ({ type }: ActivitySkeletonProps) => {
  return (
    <Stack>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" gap={2}>
          <SkeletonCircle size="12" />
          <Skeleton height="20px" width="100px" />
        </Flex>
        <Skeleton height="20px" width="100px" />
      </Flex>
      {type === ActivityType.NewReview ? (
        <UserReviewSkeleton withGameDetails />
      ) : type === ActivityType.NewDiscussion ? (
        <DiscussionItemSkeleton withGameDetails />
      ) : (
        <DiscussionReplyPostSkeleton />
      )}
    </Stack>
  );
};

export default ActivitySkeleton;
