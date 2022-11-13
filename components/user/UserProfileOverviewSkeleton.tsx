import { Flex, Skeleton, SkeletonCircle, Stack } from "@chakra-ui/react";

const UserProfileOverviewSkeleton = () => {
  return (
    <Stack rounded="md" bg="gray.700" p={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" gap={2}>
          <SkeletonCircle size="10" />
          <Skeleton height={6} width={32} />
        </Flex>
      </Flex>
      <Flex gap={3}>
        <Skeleton height={6} width={32} />
        <Skeleton height={6} width={32} />
      </Flex>
    </Stack>
  );
};

export default UserProfileOverviewSkeleton;
