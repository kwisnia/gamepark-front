import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import Image from "next/future/image";
import { GameDetails, IGDBImageSize } from "../../types/game";
import { getCoverUrl } from "../../utils/ImageUtils";

interface Props {
  game: GameDetails;
}

const GameHeader = ({ game }: Props) => {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <Flex alignItems="end" justifyContent="center" marginTop="8%">
      <Flex
        direction={{
          base: "column",
          md: "row",
        }}
        width={{
          base: "100%",
          md: "60%",
        }}
        justifyContent="space-between"
        zIndex={1}
      >
        <Image
          src={getCoverUrl(game.cover?.imageId, IGDBImageSize.CoverBig, false)}
          alt={game.name}
          width={264}
          height={374}
          className="rounded-lg select-none m-auto"
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
          <Heading
            size={{
              base: "md",
              md: "xl",
              lg: "2xl",
            }}
            fontWeight="bold"
            paddingBottom={5}
            textAlign="center"
          >
            {game.name}
          </Heading>
          <Text fontSize="xl" fontWeight="semibold" color="gray.400">
            First released on{" "}
            {DateTime.fromISO(game.firstReleaseDate).toFormat("dd LLL yyyy")}
          </Text>
        </Flex>
        <Flex justifyContent="center">
          <Flex
            direction="column"
            justifyContent="end"
            alignItems="center"
            paddingBottom={10}
          >
            <CircularProgress
              value={game.aggregatedRating}
              size={isMobile ? "100px" : "150px"}
            >
              <CircularProgressLabel>
                {Math.floor(game.aggregatedRating)}
              </CircularProgressLabel>
            </CircularProgress>
            <Text
              fontSize={{
                base: "sm",
                md: "md",
              }}
              fontWeight="semibold"
              color="gray.400"
              textAlign="center"
            >
              {game.aggregatedRatingCount} critic ratings
            </Text>
          </Flex>
          <Flex
            direction="column"
            justifyContent="end"
            alignItems="center"
            paddingBottom={10}
            paddingLeft={5}
          >
            <CircularProgress
              value={game.rating * 20}
              size={isMobile ? "80px" : "120px"}
            >
              <CircularProgressLabel textAlign="center">
                {Math.floor(game.rating * 20)}
              </CircularProgressLabel>
            </CircularProgress>
            <Text
              fontSize={{
                base: "sm",
                md: "md",
              }}
              fontWeight="semibold"
              color="gray.400"
              textAlign="center"
            >
              {game.ratingCount} user ratings
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GameHeader;
