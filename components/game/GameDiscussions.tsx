import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useSpinDelay } from "spin-delay";
import useDiscussions from "../../hooks/useDiscussions";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import type { GameDetails } from "../../types/game";
import EmptyState from "../common/EmptyState";
import CreateDiscussionForm from "../discussions/CreateDiscussionForm";
import DiscussionItem from "../discussions/DiscussionItem";
import DiscussionItemSkeleton from "../discussions/DiscussionItemSkeleton";

interface DiscussionsProps {
  game: GameDetails;
}

const GameDiscussions = ({ game }: DiscussionsProps) => {
  const { loggedOut } = useLoggedInUser();
  const {
    discussions,
    fetchNextPage,
    mutate,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
  } = useDiscussions(game.slug);
  const [inCreationMode, setInCreationMode] = useState(false);
  const { ref, inView } = useInView();
  const shouldRenderSkeleton =
    useSpinDelay(isLoadingInitialData) || isLoadingMore;

  useEffect(() => {
    if (inView && !isReachingEnd) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isReachingEnd]);

  return (
    <Box>
      {inCreationMode ? (
        <CreateDiscussionForm
          game={game}
          onClose={() => setInCreationMode(false)}
          mutate={mutate}
        />
      ) : (
        <Box>
          {loggedOut ? null : (
            <Flex justifyContent="end" pb={3}>
              <Button onClick={() => setInCreationMode(true)}>
                Create a new discussion
              </Button>
            </Flex>
          )}
          <Stack direction="column" spacing={2}>
            {isEmpty ? (
              <EmptyState message="No discussions about this game yet 😥" />
            ) : (
              discussions.map((discussion) => (
                <DiscussionItem
                  key={`discussion-item-${discussion.id}`}
                  discussion={discussion}
                  mutate={mutate}
                />
              ))
            )}
            {shouldRenderSkeleton
              ? [...Array(3)].map((_, i) => (
                  <DiscussionItemSkeleton
                    key={`discussion-item-skeleton-${i}`}
                  />
                ))
              : null}
          </Stack>
          <Box h={1} ref={ref} />
        </Box>
      )}
    </Box>
  );
};

export default GameDiscussions;
