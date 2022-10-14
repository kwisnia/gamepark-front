import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Flex,
  Text,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { GameDetails } from "../../types/game";
import GameMediaCarousel from "./GameMediaCarousel";
import GameSidebar from "./GameSidebar";

interface Props {
  game: GameDetails;
}

const GameInfo = ({ game }: Props) => {
  return (
    <Flex maxWidth="100%">
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
      </Box>
      <GameSidebar game={game} />
    </Flex>
  );
};

export default GameInfo;
