import {
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

interface Props {
  game: GameDetails;
}

const GameDetailsTabs = ({ game }: Props) => {
  return (
    <Flex direction="column" alignItems="center">
      <Tabs
        variant="line"
        marginTop="5"
        width={{
          base: "100%",
          md: "60%",
        }}
        zIndex={1}
      >
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
            <p>Reviews</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

export default GameDetailsTabs;
