import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { addToList } from "../../api/ListApi";
import { LoginModalContext } from "../../contexts/LoginModalContext";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import useUserGameInfo from "../../hooks/useUserGameInfo";
import { GameDetails } from "../../types/game";

interface Props {
  game: GameDetails;
}

const GameSidebar = ({ game }: Props) => {
  const { loggedOut, user } = useLoggedInUser();
  const { lists, mutate, loading } = useUserGameInfo(game.slug);
  const { openModal, setFormType } = useContext(LoginModalContext);
  const toast = useToast();

  const openLoginModal = () => {
    setFormType("Login");
    openModal();
  };

  const listsWithoutGame = user?.lists.filter(
    (list) =>
      !lists || lists.some((gameList) => gameList.id === list.id) === false
  );

  const addGameToList = async (listId: number) => {
    await addToList(listId, game.slug);
    toast({
      title: "Game added to list",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    mutate();
  };

  const getGameDevelopers = () => {
    return game.involvedCompanies
      ?.filter((company) => company.developer)
      .map((company) => company.company.name)
      .join(", ");
  };
  const getGamePublishers = () => {
    return game.involvedCompanies
      ?.filter((company) => company.publisher)
      .map((company) => company.company.name)
      .join(", ");
  };
  return (
    <Box rounded="md" bg="gray.700" flex={2} padding={5}>
      <Text color="gray.500" fontWeight="bold">
        Developed by:
      </Text>
      <Text color="gray.300">{getGameDevelopers()}</Text>
      <Text color="gray.500" fontWeight="bold" paddingTop={5}>
        Published by:
      </Text>
      <Text color="gray.300">{getGamePublishers()}</Text>
      <Text color="gray.500" fontWeight="bold" paddingTop={5}>
        Available on:
      </Text>
      <Text color="gray.300">
        {game.platforms?.map((platform) => platform.name).join(", ")}
      </Text>
      {/* TODO: Add release dates and age ratings and genres */}
      {loggedOut ? (
        <Text color="gray.300" marginTop={5}>
          <Button variant="link" onClick={openLoginModal}>
            Log in
          </Button>{" "}
          to keep this and many other games organized in lists!
        </Text>
      ) : null}
      {!loggedOut && user ? (
        <Center flexDirection="column" marginTop={5}>
          {lists ? (
            <Text>This game is already on {lists?.length} of your lists</Text>
          ) : null}
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="blue"
              marginTop={5}
              leftIcon={<AddIcon />}
            >
              Add to list
            </MenuButton>
            <MenuList>
              {listsWithoutGame?.map((list) => (
                <MenuItem key={list.id} onClick={() => addGameToList(list.id)}>
                  {list.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Center>
      ) : null}
    </Box>
  );
};

export default GameSidebar;
