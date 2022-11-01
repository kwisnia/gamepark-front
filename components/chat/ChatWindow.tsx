import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
} from "@chakra-ui/react";
import { use, useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { BasicUserDetails } from "../../types/user";
import ChatBox from "./ChatBox";
import UserAutocomplete from "./UserAutocomplete";

const ChatWindow = () => {
  const { user } = useLoggedInUser();
  const { data: users, mutate } = useSWR<BasicUserDetails[]>("/chat/history");
  const [selectedUser, setSelectedUser] = useState<BasicUserDetails | null>(
    users?.[0] ?? null
  );

  useEffect(() => {
    mutate();
  }, [user, mutate]);

  useEffect(() => {
    if (users) {
      setSelectedUser(users[0]);
    }
  }, [users]);

  const userHistory = useMemo(
    () =>
      users?.map((user) => {
        return (
          <Flex
            alignItems="center"
            key={user.id}
            bg={user.id === selectedUser?.id ? "gray.600" : "gray.700"}
            p={3}
            gap={3}
            _hover={{ bg: "gray.600" }}
            cursor="pointer"
            onClick={() => setSelectedUser(user)}
          >
            <Avatar src={user.avatar ?? ""} />
            <Text>{user.displayName}</Text>
          </Flex>
        );
      }),
    [users, selectedUser]
  );

  return (
    <Flex height="100%" bg="gray.700" marginTop={10}>
      <Stack flex={2}>
        <Popover>
          <PopoverTrigger>
            <Button width="full">New chat</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Search for users</PopoverHeader>
            <PopoverBody>
              <UserAutocomplete onSelect={setSelectedUser} />
            </PopoverBody>
          </PopoverContent>
        </Popover>
        {users?.length || selectedUser ? (
          <Box>
            {selectedUser && !users?.find((u) => u.id === selectedUser?.id) ? (
              <Flex alignItems="center" bg="gray.600" p={3} gap={3}>
                <Avatar src={selectedUser.avatar ?? ""} />
                <Text>{selectedUser.displayName}</Text>
              </Flex>
            ) : null}
            {userHistory}
          </Box>
        ) : (
          <Text>No users</Text>
        )}
      </Stack>
      <Box flex={8}>
        {selectedUser ? (
          <ChatBox user={selectedUser} />
        ) : (
          <Heading textAlign="center">Select a user to start chatting</Heading>
        )}
      </Box>
    </Flex>
  );
};

export default ChatWindow;
