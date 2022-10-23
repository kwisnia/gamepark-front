import { AddIcon, CloseIcon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { addToList } from "../../api/ListApi";
import { removeReview } from "../../api/ReviewApi";
import { LoginModalContext } from "../../contexts/LoginModalContext";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import useUserGameInfo from "../../hooks/useUserGameInfo";
import { GameDetails } from "../../types/game";
import RemoveReviewDialog from "../review/RemoveReviewDialog";
import ReviewModal from "../review/ReviewModal";
import Rating from "../review/StarRating";

interface Props {
  game: GameDetails;
}

const GameSidebar = ({ game }: Props) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isRemoveReviewDialogOpen, setIsRemoveReviewDialogOpen] =
    useState(false);
  const { loggedOut, user } = useLoggedInUser();
  const { lists, review, mutate, loading } = useUserGameInfo(game.slug);
  const { openModal, setFormType } = useContext(LoginModalContext);
  const [rating, setRating] = useState(review?.rating ?? 0);
  const toast = useToast();

  const openLoginModal = () => {
    setFormType("Login");
    openModal();
  };

  useEffect(() => {
    setRating(review?.rating ?? 0);
  }, [review]);

  const listsWithoutGame = user?.lists?.filter(
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

  const confirmRemoveReview = async () => {
    await removeReview(game.slug);
    toast({
      title: "Review removed",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    mutate();
    setIsRemoveReviewDialogOpen(false);
    setRating(0);
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

  const openReviewModal = (rating: number) => {
    setRating(rating);
    setIsReviewModalOpen(true);
  };
  return (
    <Box rounded="md" bg="gray.700" flex={2} padding={5}>
      <Text color="gray.500" fontWeight="bold">
        Developed by:
      </Text>
      <Text color="gray.300">
        {game.involvedCompanies?.length ? getGameDevelopers() : "N/A"}
      </Text>
      <Text color="gray.500" fontWeight="bold" paddingTop={5}>
        Published by:
      </Text>
      <Text color="gray.300">
        {game.involvedCompanies?.length ? getGamePublishers() : "N/A"}
      </Text>
      <Text color="gray.500" fontWeight="bold" paddingTop={5}>
        Available on:
      </Text>
      <Text color="gray.300">
        {game.platforms?.length
          ? game.platforms?.map((platform) => platform.name).join(", ")
          : "N/A"}
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
          {lists && lists.length ? (
            <Text>This game is already on {lists.length} of your lists</Text>
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
          <Text color="gray.500" fontWeight="bold" marginTop={5}>
            {review ? "Your rating" : "Rate this game"}
          </Text>
          <Flex alignItems="center">
            <Rating
              icons={5}
              rating={rating}
              onChange={openReviewModal}
              readonly={Boolean(review)}
              icon={<StarIcon />}
              iconSize={32}
            />
            {review ? (
              <>
                <Tooltip label="Remove your rating">
                  <IconButton
                    variant="ghost"
                    size="xs"
                    aria-label="Remove rating"
                    icon={<CloseIcon />}
                    marginLeft={2}
                    onClick={() => setIsRemoveReviewDialogOpen(true)}
                  />
                </Tooltip>
                <RemoveReviewDialog
                  confirmAction={confirmRemoveReview}
                  isOpen={isRemoveReviewDialogOpen}
                  onClose={() => setIsRemoveReviewDialogOpen(false)}
                />
              </>
            ) : null}
          </Flex>
          <ReviewModal
            open={isReviewModalOpen}
            onClose={() => {
              setIsReviewModalOpen(false);
            }}
            game={game}
            rating={rating}
            setRating={setRating}
            mutate={mutate}
          />
        </Center>
      ) : null}
    </Box>
  );
};

export default GameSidebar;
