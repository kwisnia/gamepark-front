import { Box, Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";

const DiscussionReplyPostSkeleton = () => {
  return (
    <Box bg="gray.700" rounded="md" p={3}>
      <Flex alignItems="center" gap={3}>
        <SkeletonCircle size="12" />
        <Skeleton height="20px" width="100px" />
      </Flex>
      <Skeleton height="20px" mt={3} width={`${Math.random() * 100}%`} />
      <Skeleton height="20px" mt={3} width={`${Math.random() * 100}%`} />
      <Skeleton height="20px" mt={3} width={`${Math.random() * 100}%`} />
    </Box>
  );
};
export default DiscussionReplyPostSkeleton;
