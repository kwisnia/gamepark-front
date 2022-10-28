import {
  Avatar,
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import Link from "next/link";
import { KeyedMutator } from "swr";
import { scoreDiscussion } from "../../api/DiscussionApi";
import { useLoginModal } from "../../contexts/LoginModalContext";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { GameDiscussion } from "../../types/discussion";
import OutputEditor from "../editor/OutputEditor";
import UserDisplay from "../user/UserDisplay";
import DiscussionScore from "./DiscussionScore";

interface DiscussionProps {
  discussion: GameDiscussion;
  mutate: KeyedMutator<GameDiscussion>;
}

const DiscussionMainPost = ({ discussion, mutate }: DiscussionProps) => {
  const { user, loggedOut } = useLoggedInUser();
  const { openModal } = useLoginModal();
  const onScoreChange = async (score: number) => {
    if (loggedOut) {
      openModal();
      return;
    }
    await scoreDiscussion(discussion.game, discussion.id, score);
    mutate({
      ...discussion,
      score: discussion.score + -1 * discussion.userScore + score,
      userScore: score,
    });
  };
  return (
    <Box>
      <Heading>{discussion.title}</Heading>
      <UserDisplay
        displayName={discussion.user.displayName}
        username={discussion.user.username}
        size="md"
      />
      <Flex>
        <DiscussionScore
          score={discussion.score}
          onScoreChange={onScoreChange}
          userScore={discussion.userScore}
        />
        <Box flex={10}>
          <OutputEditor content={discussion.body} />
        </Box>
      </Flex>
    </Box>
  );
};

export default DiscussionMainPost;
