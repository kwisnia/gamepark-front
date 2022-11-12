import { Flex, Skeleton, SkeletonCircle, Stack } from "@chakra-ui/react";

interface UserReviewSkeletonProps {
  withGameDetails?: boolean;
}

const DiscussionItemSkeleton = ({
  withGameDetails,
}: UserReviewSkeletonProps) => {
  return (
    <Flex bg="gray.700" rounded="md" padding={5} height="full" width="full">
      <Stack flex={10} marginLeft={5} alignItems="flex-start" spacing={2}>
        <Skeleton height="42px" width={`${Math.random() * 75}%`} />
        <Skeleton>created by</Skeleton>
        {withGameDetails ? null : (
          <Flex alignItems="center" gap={3}>
            <SkeletonCircle size="8" />
            <Skeleton height="20px" width="100px" />
          </Flex>
        )}
      </Stack>
      <Skeleton width={50} height={50} alignSelf="center" />
    </Flex>
  );
};

export default DiscussionItemSkeleton;
