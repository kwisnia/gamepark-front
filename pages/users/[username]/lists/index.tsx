import { DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  List,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import ListCreateModal from "../../../../components/user/ListCreateModal";
import useLoggedInUser from "../../../../hooks/useLoggedInUser";
import useUserDetails from "../../../../hooks/useUserDetails";
import { GameList } from "../../../../types/lists";
import { removeList as removeListApi } from "../../../../api/ListApi";
import Head from "next/head";
import Link from "next/link";
import UserPageLayout from "../../../../components/user/UserPageLayout";

const UserListPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const {
    data,
    mutate: listsMutate,
    error,
  } = useSWR<GameList[]>(username ? `/${username}/lists` : null);
  const { user, loading, mutate } = useUserDetails(username as string);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { user: loggedInUser } = useLoggedInUser();
  const toast = useToast();

  const isOwner = user?.id === loggedInUser?.id;

  const removeList = async (listId: number) => {
    await removeListApi(listId);
    listsMutate(data?.filter((list) => list.id !== listId));
    toast({
      title: "List removed",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  if (error) return <div>failed to load</div>;
  if (!data || loading || !user) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>{user.displayName}&apos;s lists - GamePark</title>
      </Head>
      <UserPageLayout>
        <Heading>{user.displayName}&apos;s lists</Heading>
        <Flex justifyContent="space-between" alignItems="center">
          <Text color="gray.200">{data.length} lists</Text>
          {isOwner ? (
            <Button
              colorScheme="facebook"
              onClick={() => setCreateModalOpen(true)}
            >
              Create a new list
            </Button>
          ) : null}
        </Flex>
        <ListCreateModal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          mode="create"
          mutate={listsMutate}
        />
        <List>
          {data?.map((gameList) => (
            <LinkBox
              key={gameList.id}
              bg="gray.700"
              rounded="md"
              padding={5}
              marginY={2}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Heading key={gameList.id} size="md">
                <Link
                  href={`/users/${username}/lists/${gameList.id}`}
                  legacyBehavior
                >
                  <LinkOverlay>{gameList.name}</LinkOverlay>
                </Link>
              </Heading>
              {isOwner ? (
                <Flex>
                  <IconButton
                    aria-label="Delete list"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => removeList(gameList.id)}
                  />
                </Flex>
              ) : null}
            </LinkBox>
          ))}
        </List>
      </UserPageLayout>
    </>
  );
};

export default UserListPage;
