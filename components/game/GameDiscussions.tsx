import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { mutate } from "swr";
import useDiscussions from "../../hooks/useDiscussions";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { GameDetails } from "../../types/game";
import CreateDiscussionForm from "../discussions/CreateDiscussionForm";
import DiscussionItem from "../discussions/DiscussionItem";

interface DiscussionsProps {
  game: GameDetails;
}

const GameDiscussions = ({ game }: DiscussionsProps) => {
  const { user, loggedOut } = useLoggedInUser();
  const { discussions } = useDiscussions(game.slug);
  const [inCreationMode, setInCreationMode] = useState(false);

  const discussionsFlat = useMemo(() => {
    return discussions?.flat() ?? [];
  }, [discussions]);

  return (
    <Box>
      {inCreationMode ? (
        <CreateDiscussionForm
          game={game}
          onClose={() => setInCreationMode(false)}
          mutate={mutate}
        />
      ) : (
        <>
          {loggedOut ? null : (
            <Flex justifyContent="end">
              <Button onClick={() => setInCreationMode(true)}>
                Create a new discussion
              </Button>
            </Flex>
          )}
          <Stack direction="column">
            {discussionsFlat.map((discussion) => (
              <DiscussionItem key={discussion.id} discussion={discussion} />
            ))}
          </Stack>
        </>
      )}
    </Box>
  );
};

export default GameDiscussions;
