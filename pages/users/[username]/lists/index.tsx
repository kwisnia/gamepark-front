import {
  Box,
  Button,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  List,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import ListCreateModal from "../../../../components/user/ListCreateModal";
import useLoggedInUser from "../../../../hooks/useLoggedInUser";
import useUserDetails from "../../../../hooks/useUserDetails";
import { GameList } from "../../../../types/lists";

const UserListPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const { data, error } = useSWR<GameList[]>(`/${username}/lists`);
  const { user, loading } = useUserDetails(username as string);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { user: loggedInUser } = useLoggedInUser();

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (!data || loading || !user) return <div>loading...</div>;

  return (
    <Box width="60%" margin="auto">
      <Heading>{user.displayName}&apos;s lists</Heading>
      <Flex justifyContent="space-between" alignItems="center">
        <Text color="gray.200">{data.length} lists</Text>
        {username === loggedInUser?.username && (
          <Button
            colorScheme="facebook"
            onClick={() => setCreateModalOpen(true)}
          >
            Create a new list
          </Button>
        )}
      </Flex>
      <ListCreateModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
      <List>
        {data?.map((gameList) => (
          <LinkBox
            key={gameList.id}
            bg="gray.500"
            rounded="md"
            padding={5}
            marginY={2}
          >
            <Heading key={gameList.id} size="md">
              <LinkOverlay
                href={`/users/${username}/lists/${gameList.id}`}
              ></LinkOverlay>
              {gameList.name}
            </Heading>
          </LinkBox>
        ))}
      </List>
    </Box>
  );
};

export default UserListPage;
