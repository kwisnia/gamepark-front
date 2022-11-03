import {
  Avatar,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import useSWR, { KeyedMutator } from "swr";
import { followUser, unfollowUser } from "../../api/UserApi";
import { BasicUserDetails } from "../../types/user";

interface UserPopoverProps {
  user: Omit<BasicUserDetails, "id">;
}

const UserPopoverBody = ({ user }: UserPopoverProps) => {
  const { data: followStatus, mutate } = useSWR<boolean>(
    `/follow/${user.username}`
  );
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleFollow = async () => {
    try {
      setIsLoading(true);
      await followUser(user.username);
      mutate(!followStatus);
    } catch (e) {
      const error = e as Error;
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnfollow = async () => {
    try {
      setIsLoading(true);
      await unfollowUser(user.username);
      mutate(!followStatus);
    } catch (e) {
      const error = e as Error;
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack>
      <Flex alignItems="flex-end" gap={5}>
        <Avatar size="lg" src={user.avatar ?? ""} />
        <Heading size="md">{user.displayName}</Heading>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size="sm">@{user.username}</Heading>
        {followStatus === undefined ? null : followStatus ? (
          <Button
            colorScheme="red"
            size="sm"
            onClick={handleUnfollow}
            isLoading={isLoading}
          >
            Stop following
          </Button>
        ) : (
          <Button
            colorScheme="blue"
            size="sm"
            onClick={handleFollow}
            isLoading={isLoading}
          >
            Follow
          </Button>
        )}
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        fontSize="md"
        color="gray.400"
      >
        <Flex alignItems="center" gap={2}>
          <Text fontWeight="bold">{user.followerCount}</Text>
          <Text>Followers</Text>
        </Flex>
        <Flex alignItems="center" gap={2}>
          <Text fontWeight="bold">{user.followingCount}</Text>
          <Text>Followers</Text>
        </Flex>
      </Flex>
    </Stack>
  );
};

export default UserPopoverBody;
