import { Box, Flex, Skeleton, SkeletonCircle, Stack } from "@chakra-ui/react";

const DicussionMainPostSkeleton = () => {
  return (
    <Stack mt={3}>
      <Flex justifyContent="space-between" flex={10} alignItems="center">
        <Stack>
          <Skeleton height={10} width={150} />
          <Flex alignItems="center" gap={3}>
            <SkeletonCircle size="12" />
            <Skeleton height="20px" width="100px" />
          </Flex>
        </Stack>
        <Flex alignItems="flex-end" gap={3}>
          <Stack>
            <Skeleton width={100} height={5} />
            <Skeleton width={300} height={5} />
          </Stack>
          <Skeleton rounded="xl" width={100} height={134} />
        </Flex>
      </Flex>
      <Box bg="gray.700" rounded="lg" p={5} h="50vh">
        {[...Array(10)].map((_, i) => (
          <Skeleton
            key={`discussion-content-skeleton-${i}`}
            height="20px"
            mt={3}
            width={`${Math.random() * 100}%`}
          />
        ))}
      </Box>
    </Stack>
  );
};

export default DicussionMainPostSkeleton;
