import {
  Box,
  Button,
  Center,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  List,
  ListItem,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import useUserDetails from "../../../../hooks/useUserDetails";
import useSWRImmutable from "swr/immutable";
import { GameListDetails } from "../../../../types/lists";
import useLoggedInUser from "../../../../hooks/useLoggedInUser";
import Image from "next/future/image";
import { getCoverUrl } from "../../../../utils/ImageUtils";
import { IGDBImageSize } from "../../../../types/game";
import { DeleteIcon } from "@chakra-ui/icons";
import { removeFromList } from "../../../../api/ListApi";
import ListCreateModal from "../../../../components/user/ListCreateModal";
import { useState } from "react";
import Head from "next/head";

const DetailedListPage = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const router = useRouter();
  const { username, listId } = router.query;
  const { user } = useUserDetails(username as string);
  const { user: loggedInUser } = useLoggedInUser();
  const { data, error, mutate } = useSWRImmutable<GameListDetails>(
    `/list/${listId}`
  );
  const toast = useToast();

  const isOwner = user?.id === loggedInUser?.id;

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
    <Box
      width={{
        base: "90%",
        md: "60%",
      }}
      margin="auto"
    >
      <Head>
        <title>
          {data && user
            ? `${data.name} by ${user.displayName} - GamePark`
            : "Loading..."}
        </title>
      </Head>
      <Heading>{data?.name}</Heading>
      <Text>{data?.description}</Text>
      {user?.username === loggedInUser?.username ? (
        <Button onClick={() => setEditModalOpen(true)}>Edit</Button>
      ) : null}
      <List>
        {data?.games.map((game) => (
          <ListItem
            key={game.slug}
            bg="gray.500"
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
                <LinkOverlay href={`/games/${game.slug}`}>
                  {game.name}
                </LinkOverlay>
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
    </Box>
  );
};

export default DetailedListPage;
