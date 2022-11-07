import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Heading, Stack } from "@chakra-ui/react";

interface DiscussionScoreProps {
  score: number;
  onScoreChange: (score: number) => void;
  userScore: number;
}

const DiscussionScore = ({
  score,
  onScoreChange,
  userScore,
}: DiscussionScoreProps) => {
  return (
    <Stack direction="column" alignItems="center">
      <ChevronUpIcon
        w={30}
        h={30}
        color={userScore > 0 ? "orange" : "white"}
        cursor="pointer"
        onClick={() => onScoreChange(1)}
      />
      <Heading>{score}</Heading>
      <ChevronDownIcon
        w={30}
        h={30}
        color={userScore < 0 ? "blue.400" : "white"}
        cursor="pointer"
        onClick={() => onScoreChange(-1)}
      />
    </Stack>
  );
};

export default DiscussionScore;
