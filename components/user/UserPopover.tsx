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
import FollowButton from "./FollowButton";

interface UserPopoverProps {
  user: Omit<BasicUserDetails, "id">;
}

const UserPopoverBody = ({ user }: UserPopoverProps) => {
  return (
    <Stack>
      <Flex alignItems="flex-end" gap={5}>
        <Avatar size="lg" src={user.avatar ?? ""} />
        <Heading size="md">{user.displayName}</Heading>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading size="sm">@{user.username}</Heading>
        <FollowButton username={user.username} />
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
