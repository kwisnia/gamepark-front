import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { useSpinDelay } from "spin-delay";
import useReviews from "../../hooks/useReviews";
import type { GameDetails } from "../../types/game";
import EmptyState from "../common/EmptyState";
import UserReview from "../review/UserReview";
import UserReviewSkeleton from "../review/UserReviewSkeleton";

interface GameReviewsProps {
  game: GameDetails;
}

const GameReviews = ({ game }: GameReviewsProps) => {
  const {
    reviews,
    mutate,
    fetchNextPage,
    setFilters,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
  } = useReviews(game.slug);
  const { ref, inView } = useInView();
  const shouldRenderSkeleton =
    useSpinDelay(isLoadingInitialData) || isLoadingMore;

  const half = Math.ceil(reviews.length / 2);

  const platforms = useMemo(
    () =>
      game.platforms?.map((platform) => ({
        label: platform.name,
        value: platform.id,
      })) ?? [],
    [game]
  );

  useEffect(() => {
    if (inView && !isReachingEnd) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isReachingEnd]);

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
        <>
          <Flex direction="column" gap={5}>
            {reviews.slice(0, half).map((review) => (
              <UserReview
                key={`review-${review.id}`}
                review={review}
                mutate={mutate}
              />
            ))}
            {shouldRenderSkeleton ? (
              <>
                <UserReviewSkeleton />
                <UserReviewSkeleton />
              </>
            ) : null}
          </Flex>
          <Flex direction="column" gap={5}>
            {reviews.slice(half).map((review) => (
              <UserReview
                key={`review-${review.id}`}
                review={review}
                mutate={mutate}
              />
            ))}
            {shouldRenderSkeleton ? (
              <>
                <UserReviewSkeleton />
                <UserReviewSkeleton />
              </>
            ) : null}
          </Flex>
        </>
      </SimpleGrid>
      {isEmpty && !isLoadingInitialData ? (
        <EmptyState message="No reviews were found matching the criteria 😥" />
      ) : null}
      <Box ref={ref} height={1} />
    </Box>
  );
};

export default GameReviews;
