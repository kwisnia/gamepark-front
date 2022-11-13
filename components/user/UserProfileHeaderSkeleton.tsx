import { Box, Flex, Skeleton, SkeletonCircle, Stack } from "@chakra-ui/react";

const UserProfileHeaderSkeleton = () => {
  return (
    <Box>
      <Box position="relative" w="full" h={52} overflow="hidden">
        <Skeleton objectFit="cover" h="full" />
      </Box>
      <Flex justifyContent="space-between">
        <Stack spacing={3} mt={-16} ml={6}>
          <SkeletonCircle size="128" />
          <Skeleton height={16} width={64} />
          <Skeleton height={6} width={32} />
          <Skeleton height={6} width={64} />
          <Skeleton height={6} width={12} />
        </Stack>
      </Flex>
    </Box>
  );
};

export default UserProfileHeaderSkeleton;
