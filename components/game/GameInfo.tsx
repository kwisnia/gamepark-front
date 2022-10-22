import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useEffect } from "react";
import { mutate } from "swr";
import useReviews from "../../hooks/useReviews";
import useUserGameInfo from "../../hooks/useUserGameInfo";
import { GameDetails } from "../../types/game";
import UserReview from "../review/UserReview";
import GameMediaCarousel from "./GameMediaCarousel";
import GameSidebar from "./GameSidebar";

interface Props {
  game: GameDetails;
}

const GameInfo = ({ game }: Props) => {
  const { review, mutate } = useUserGameInfo(game.slug);
  const {
    reviews,
    setFilters,
    mutate: reviewsMutate,
  } = useReviews(game.slug, 3);

  useEffect(() => {
    console.log(reviews);
  }, [reviews]);

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
        <Heading size="lg" paddingTop={5} paddingBottom={2}>
          Reviews
          {review ? <UserReview review={review} mutate={mutate} /> : null}
          {reviews?.length
            ? reviews.map((reviewPage) =>
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
              )
            : null}
        </Heading>
      </Box>
      <GameSidebar game={game} />
    </Flex>
  );
};

export default GameInfo;
