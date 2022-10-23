import { Box, Flex, SimpleGrid, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import useReviews from "../../hooks/useReviews";
import { GameDetails } from "../../types/game";
import UserReview from "../review/UserReview";

interface Props {
  game: GameDetails;
}

const GameReviews = ({ game }: Props) => {
  const { reviews, mutate, fetchNextPage } = useReviews(game.slug);
  const { ref, inView } = useInView();

  const reviewsFlat = useMemo(() => reviews?.flat() ?? [], [reviews]);
  const half = Math.ceil(reviewsFlat.length / 2);

  useEffect(() => {
    if (inView) {
      console.log("more");
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <Box>
      <SimpleGrid
        columns={{
          base: 1,
          xl: 2,
        }}
        justifyContent="center"
        gap={10}
      >
        <Flex direction="column" gap={5}>
          {reviewsFlat.slice(0, half).map((review) => (
            <UserReview key={review.id} review={review} mutate={mutate} />
          ))}
        </Flex>
        <Flex direction="column" gap={5}>
          {reviewsFlat.slice(half).map((review) => (
            <UserReview key={review.id} review={review} mutate={mutate} />
          ))}
        </Flex>
      </SimpleGrid>
      <Box ref={ref} height={1} />
    </Box>
  );
};

export default GameReviews;
