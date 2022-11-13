import {
  Box,
  Button,
  Center,
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
import useUserDetails from "../../../../hooks/useUserDetails";
import useSWRImmutable from "swr/immutable";
import { GameListDetails } from "../../../../types/lists";
import useLoggedInUser from "../../../../hooks/useLoggedInUser";
import Image from "next/image";
import { getCoverUrl } from "../../../../utils/ImageUtils";
import { IGDBImageSize } from "../../../../types/game";
import { DeleteIcon } from "@chakra-ui/icons";
import { removeFromList } from "../../../../api/ListApi";
import ListCreateModal from "../../../../components/user/ListCreateModal";
import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import UserPageLayout from "../../../../components/user/UserPageLayout";
import EmptyState from "../../../../components/common/EmptyState";

const DetailedListPage = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const router = useRouter();
  const { username, listId } = router.query;
  const { user } = useUserDetails(username as string);
  const { user: loggedInUser } = useLoggedInUser();
  const { data, error, mutate } = useSWRImmutable<GameListDetails>(
    listId ? `/list/${listId}` : null
  );
  const toast = useToast();

  const isLoading = !data && !error;
  const isOwner = user?.id === loggedInUser?.id;
  const isEmpty = data?.games.length === 0;
  const title =
    data && user
      ? `${data.name} by ${user.displayName} - GamePark`
      : "Loading...";

  const removeGameFromList = async (gameSlug: string) => {
    await removeFromList(Number(listId), gameSlug);
    mutate();
    toast({
      title: "Game removed from list",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <UserPageLayout>
        <Skeleton isLoaded={!isLoading} maxW="50%">
          <Heading>{data?.name}</Heading>
        </Skeleton>
        <Skeleton isLoaded={!isLoading}>
          <Text>{data?.description}</Text>
        </Skeleton>
        {user?.username === loggedInUser?.username ? (
          <Button onClick={() => setEditModalOpen(true)}>Edit</Button>
        ) : null}
        <List>
          {isLoading
            ? [...Array(3)].map((_, i) => (
                <ListItem
                  key={i}
                  bg="gray.700"
                  rounded="md"
                  padding={5}
                  marginY={2}
                  display="flex"
                  alignItems="center"
                  height="full"
                  width="full"
                  gap={5}
                >
                  <Skeleton height="142px" width="100px" flex={1} />
                  <Flex
                    height={8}
                    width="50%"
                    flex={10}
                    justifyContent="center"
                  >
                    <Skeleton height="100%" width="50%" />
                  </Flex>
                </ListItem>
              ))
            : null}
          {isEmpty && !isLoading ? (
            <EmptyState message="This list is empty 😥" />
          ) : null}
          {data?.games.map((game) => (
            <ListItem
              key={game.slug}
              bg="gray.700"
              rounded="md"
              padding={5}
              marginY={2}
              display="flex"
              alignItems="center"
              height="full"
              width="full"
            >
              <LinkBox display="flex" alignItems="center" flex={10}>
                <Box flex={1}>
                  <Image
                    src={getCoverUrl(
                      game.cover?.imageId || "",
                      IGDBImageSize.CoverBig,
                      false
                    )}
                    width={100}
                    height={100}
                    alt={`${game.name} cover`}
                  />
                </Box>
                <Heading
                  size="md"
                  justifyContent="center"
                  flex={8}
                  textAlign="center"
                >
                  <Link href={`/games/${game.slug}`} legacyBehavior passHref>
                    <LinkOverlay>{game.name}</LinkOverlay>
                  </Link>
                </Heading>
              </LinkBox>
              {isOwner ? (
                <Center flex={1}>
                  <IconButton
                    aria-label="Delete game from list"
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => removeGameFromList(game.slug)}
                  />
                </Center>
              ) : null}
            </ListItem>
          ))}
        </List>
        {data && isOwner ? (
          <ListCreateModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            mode="edit"
            listId={Number(listId)}
            initialName={data.name}
            initialDescription={data.description}
            mutate={mutate}
          />
        ) : null}
      </UserPageLayout>
    </>
  );
};

export default DetailedListPage;
