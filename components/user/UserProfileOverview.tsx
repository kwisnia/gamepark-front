import { Avatar, Flex, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import type { BasicUserDetails } from "../../types/user";
import FollowButton from "./FollowButton";

interface UserProfileOverviewProps {
  user: BasicUserDetails;
}

const UserProfileOverview = ({ user }: UserProfileOverviewProps) => {
  return (
    <Stack rounded="md" bg="gray.700" p={4}>
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" gap={2}>
          <Avatar src={user.avatar ?? ""} />
          <Link href={`/users/${user.username}`}>
            <Text
              fontWeight="bold"
              _hover={{
                textDecoration: "underline",
              }}
            >
              {user.displayName}
            </Text>
          </Link>
        </Flex>
        <FollowButton username={user.username} />
      </Flex>
      <Flex gap={3}>
        <Text color="gray.400" fontWeight="semibold">
          {user.followerCount} Followers
        </Text>
        <Text color="gray.400" fontWeight="semibold">
          {user.followingCount} Following
        </Text>
      </Flex>
      <Text noOfLines={3}>{user.bio}</Text>
    </Stack>
  );
};

export default UserProfileOverview;
