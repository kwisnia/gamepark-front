import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import useDiscussions from "../../hooks/useDiscussions";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import type { GameDetails } from "../../types/game";
import CreateDiscussionForm from "../discussions/CreateDiscussionForm";
import DiscussionItem from "../discussions/DiscussionItem";

interface DiscussionsProps {
  game: GameDetails;
}

const GameDiscussions = ({ game }: DiscussionsProps) => {
  const { loggedOut } = useLoggedInUser();
  const { discussions, fetchNextPage, mutate } = useDiscussions(game.slug);
  const [inCreationMode, setInCreationMode] = useState(false);
  const { ref, inView } = useInView();

  const discussionsFlat = useMemo(() => {
    return discussions?.flat() ?? [];
  }, [discussions]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

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
            {discussionsFlat.map((discussion) => (
              <DiscussionItem
                key={discussion.id}
                discussion={discussion}
                mutate={mutate}
              />
            ))}
          </Stack>
          <Box h={1} ref={ref} />
        </Box>
      )}
    </Box>
  );
};

export default GameDiscussions;
