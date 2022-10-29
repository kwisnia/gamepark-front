import { Box, Flex, SimpleGrid, Text, useMediaQuery } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import useReviews from "../../hooks/useReviews";
import { GameDetails } from "../../types/game";
import UserReview from "../review/UserReview";

interface Props {
  game: GameDetails;
}

const GameReviews = ({ game }: Props) => {
  const { reviews, mutate, fetchNextPage, filters, setFilters } = useReviews(
    game.slug
  );
  const { ref, inView } = useInView();

  const reviewsFlat = useMemo(() => reviews?.flat() ?? [], [reviews]);
  const half = Math.ceil(reviewsFlat.length / 2);

  const platforms = useMemo(
    () =>
      game.platforms?.map((platform) => ({
        label: platform.name,
        value: platform.id,
      })) ?? [],
    [game]
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <Box>
      <Flex justifyContent="end" mb={5}>
        <Box w={0.3}>
          <Text>Platforms</Text>
          <Select
            useBasicStyles
            colorScheme="red"
            closeMenuOnSelect={false}
            options={platforms}
            isMulti
            defaultValue={platforms}
            onChange={(value) =>
              setFilters(value.map((option) => option.value))
            }
          />
        </Box>
      </Flex>
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
