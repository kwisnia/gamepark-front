import { Box, Center, Text } from "@chakra-ui/react";
import { GameDetails } from "../../types/game";

interface Props {
  game: GameDetails;
}

const GameSidebar = ({ game }: Props) => {
  const getGameDevelopers = () => {
    return game.involvedCompanies
      ?.filter((company) => company.developer)
      .map((company) => company.company.name)
      .join(", ");
  };
  const getGamePublishers = () => {
    return game.involvedCompanies
      ?.filter((company) => company.publisher)
      .map((company) => company.company.name)
      .join(", ");
  };
  return (
    <Box rounded="md" bg="gray.700" flex={2} padding={5}>
      <Text color="gray.500" fontWeight="bold">
        Developed by:
      </Text>
      <Text color="gray.300">{getGameDevelopers()}</Text>
      <Text color="gray.500" fontWeight="bold" paddingTop={5}>
        Published by:
      </Text>
      <Text color="gray.300">{getGamePublishers()}</Text>
      <Text color="gray.500" fontWeight="bold" paddingTop={5}>
        Available on:
      </Text>
      <Text color="gray.300">
        {game.platforms?.map((platform) => platform.name).join(", ")}
      </Text>
      {/* TODO: Add release dates and age ratings */}
    </Box>
  );
};

export default GameSidebar;
