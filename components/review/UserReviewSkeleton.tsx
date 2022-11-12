import {
  Box,
  Divider,
  Flex,
  Skeleton,
  SkeletonCircle,
  Stack,
} from "@chakra-ui/react";

interface UserReviewSkeletonProps {
  withGameDetails?: boolean;
}

const UserReviewSkeleton = ({ withGameDetails }: UserReviewSkeletonProps) => {
  return (
    <Box rounded="md" bg="gray.700">
      <Stack padding={5}>
        <Box>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            marginBottom={3}
            gap={3}
            direction={{
              base: "column",
              md: "row",
            }}
          >
            {withGameDetails ? (
              <Flex alignItems="flex-end" gap={3}>
                <Skeleton height="134px" width="100px" rounded="md" />
                <Skeleton height="20px" width="100px" />
              </Flex>
            ) : (
              <Flex alignItems="center" gap={3}>
                <SkeletonCircle size="14" />
                <Skeleton height="20px" width="100px" />
              </Flex>
            )}
            <Skeleton width={140} height={7} />
          </Flex>
          <Skeleton height="20px" mt={3} width={`${Math.random() * 100}%`} />
        </Box>
        <Divider />
        <Stack gap={3}>
          <Skeleton height="30px" mt={3} width={`${Math.random() * 100}%`} />{" "}
          <Skeleton height="20px" mt={3} width={`${Math.random() * 100}%`} />{" "}
          <Skeleton height="20px" mt={3} width={`${Math.random() * 100}%`} />{" "}
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserReviewSkeleton;
