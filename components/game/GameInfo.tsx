import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import useReviews from "../../hooks/useReviews";
import useUserGameInfo from "../../hooks/useUserGameInfo";
import type { GameDetails } from "../../types/game";
import GameListElement from "../GameListElement";
import UserReview from "../review/UserReview";
import GameMediaCarousel from "./GameMediaCarousel";
import GameSidebar from "./GameSidebar";

interface GameInfoProps {
  game: GameDetails;
  changeTab: (index: number) => void;
}

const GameInfo = ({ game, changeTab }: GameInfoProps) => {
  const { review, mutate } = useUserGameInfo(game.slug);
  const {
    reviews,
    setFilters,
    mutate: reviewsMutate,
  } = useReviews(game.slug, 3);

  useEffect(() => {
    setFilters(game.platforms?.map((p) => p.id) ?? []);
  }, [game, setFilters]);

  return (
    <Flex
      maxWidth="100%"
      gap={5}
      direction={{
        base: "column",
        md: "row",
      }}
    >
      <Box flex={8}>
        <Text fontSize="xl" fontWeight="semibold" color="gray.400">
          {game.summary}
        </Text>
        <GameMediaCarousel game={game} />
        {game.storyline ? (
          <Accordion allowToggle>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left" textColor="white">
                  Storyline (may contain spoilers)
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <Text fontSize="xl" color="gray.400">
                  {game.storyline}
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ) : null}
        <Stack spacing="5">
          <Heading size="lg" paddingTop={5} paddingBottom={2}>
            Reviews
          </Heading>

          {review ? <UserReview review={review} mutate={mutate} /> : null}
          {reviews?.length ? (
            <>
              {reviews.map((reviewPage) =>
                reviewPage
                  .filter(
                    (gameReview) => gameReview.creator !== review?.creator
                  )
                  .map((review) => (
                    <UserReview
                      key={review.id}
                      review={review}
                      mutate={reviewsMutate}
                    />
                  ))
              )}
              <Button onClick={() => changeTab(2)}>See all reviews</Button>
            </>
          ) : null}
        </Stack>
        {game.similarGames ? (
          <Accordion allowToggle mt={5}>
            <AccordionItem>
              <AccordionButton>
                <Heading flex="1" textAlign="left" textColor="white">
                  Similar games
                </Heading>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <SimpleGrid columns={3} spacing={5} paddingTop={5}>
                  {game.similarGames.map((game) => (
                    <GameListElement game={game} key={game.slug} />
                  ))}
                </SimpleGrid>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ) : null}
      </Box>
      <GameSidebar game={game} />
    </Flex>
  );
};

export default GameInfo;
