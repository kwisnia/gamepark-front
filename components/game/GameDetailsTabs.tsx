import {
  Container,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useState } from "react";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { GameDetails } from "../../types/game";
import Editor from "../editor/Editor";
import GameDiscussions from "./GameDiscussions";
import GameInfo from "./GameInfo";
import GameReviews from "./GameReviews";

interface Props {
  game: GameDetails;
}

const GameDetailsTabs = ({ game }: Props) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <Flex>
      <Container maxW="container.xl" zIndex={1}>
        <Tabs
          variant="line"
          marginTop="5"
          index={tabIndex}
          onChange={handleTabChange}
          isLazy
        >
          <TabList>
            <Tab>Information</Tab>
            <Tab>Discussions</Tab>
            <Tab>Reviews</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <GameInfo game={game} changeTab={handleTabChange} />
            </TabPanel>
            <TabPanel>
              <GameDiscussions game={game} />
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
