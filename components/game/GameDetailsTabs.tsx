import {
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { GameDetails } from "../../types/game";
import GameInfo from "./GameInfo";
import GameReviews from "./GameReviews";

interface Props {
  game: GameDetails;
}

const GameDetailsTabs = ({ game }: Props) => {
  return (
    <Flex>
      <Container maxW="container.xl" zIndex={1}>
        <Tabs variant="line" marginTop="5" isLazy>
          <TabList>
            <Tab>Information</Tab>
            <Tab>Discussions</Tab>
            <Tab>Reviews</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <GameInfo game={game} />
            </TabPanel>
            <TabPanel>
              <p>Discussions</p>
            </TabPanel>
            <TabPanel>
              <GameReviews game={game} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Flex>
  );
};

export default GameDetailsTabs;
