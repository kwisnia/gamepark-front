import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import Image from "next/future/image";
import { GameDetails, IGDBImageSize } from "../../types/game";
import { getCoverUrl } from "../../utils/ImageUtils";

interface Props {
  game: GameDetails;
}

const GameHeader = ({ game }: Props) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="end"
      height="96"
      marginTop="8%"
    >
      <Flex
        direction="row"
        width="60%"
        justifyContent="space-between"
        zIndex={1}
      >
        <Image
          src={getCoverUrl(game.cover?.imageId, IGDBImageSize.CoverBig, false)}
          alt={game.name}
          width={264}
          height={374}
          className="rounded-lg select-none"
        />
        <Flex
          flex={8}
          direction="column"
          alignItems="center"
          justifyContent="end"
          paddingX="auto"
          paddingBottom={10}
          zIndex={1}
        >
          <Heading size="4xl" fontWeight="bold" paddingBottom={5}>
            {game.name}
          </Heading>
          <Text fontSize="xl" fontWeight="semibold" color="gray.400">
            First released on{" "}
            {DateTime.fromISO(game.firstReleaseDate).toFormat("dd LLL yyyy")}
          </Text>
        </Flex>
        <Flex direction="column" justifyContent={"end"} paddingBottom={10}>
          <CircularProgress value={game.aggregatedRating} size="150px">
            <CircularProgressLabel>
              {Math.floor(game.aggregatedRating)}
            </CircularProgressLabel>
          </CircularProgress>
          <Text
            fontSize="xl"
            fontWeight="semibold"
            color="gray.400"
            textAlign="center"
          >
            {game.aggregatedRatingCount} critic ratings
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GameHeader;
