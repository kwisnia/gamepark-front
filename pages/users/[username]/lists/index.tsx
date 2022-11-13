import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  List,
  ListItem,
  Skeleton,
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
  const { user, isLoading: isLoadingUser } = useUserDetails(username as string);
  const {
    data,
    mutate: listsMutate,
    error,
  } = useSWR<GameList[]>(user?.username ? `/${user.username}/lists` : null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const { user: loggedInUser } = useLoggedInUser();
  const toast = useToast();

  const isOwner = user?.id === loggedInUser?.id;
  const isLoadingLists = !data && !error;

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

  if (error) {
    router.replace("/404");
  }

  const title = user ? `${user?.displayName}'s lists - GamePark` : "Loading...";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <UserPageLayout>
        <Skeleton isLoaded={!isLoadingUser}>
          <Heading>{user?.displayName}&apos;s lists</Heading>
        </Skeleton>
        <Flex justifyContent="space-between" alignItems="center">
          <Skeleton isLoaded={!isLoadingLists}>
            <Text color="gray.200">{data?.length} lists</Text>
          </Skeleton>
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
          {isLoadingLists
            ? [...Array(3)].map((_, i) => (
                <ListItem key={`list-skeleton-${i}`}>
                  <Box
                    bg="gray.700"
                    rounded="md"
                    padding={5}
                    marginY={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Skeleton height="20px" width={`${Math.random() * 50}%`} />
                  </Box>
                </ListItem>
              ))
            : data?.map((gameList) => (
                <ListItem key={gameList.id}>
                  <LinkBox
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
                        passHref
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
                </ListItem>
              ))}
        </List>
      </UserPageLayout>
    </>
  );
};

export default UserListPage;
