import { Center, Heading, Slide, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { GameListElement, IGDBImageSize } from "../types/game";
import { getCoverUrl } from "../utils/ImageUtils";

interface Props {
  game: GameListElement;
}

const GameListElement = ({ game }: Props) => {
  const [hover, setHover] = useState(false);
  const { name, slug, cover } = game;

  return (
    <Link
      className="cursor-pointer transition-transform hover:-translate-y-3 relative overflow-y-hidden rounded-lg w-[264px] h-[374px]"
      href={`/games/${slug}`}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {cover?.imageId ? (
        <Image
          src={getCoverUrl(cover?.imageId, IGDBImageSize.CoverBig, false)}
          alt={name}
          className="object-cover rounded-lg"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 264px"
        />
      ) : (
        <Center background="gray.500" height="full" rounded="lg">
          <Heading>{name}</Heading>
        </Center>
      )}

      <Slide direction="bottom" in={hover}>
        <Text
          color="orange.500"
          fontWeight="extrabold"
          w="full"
          h={14}
          bg="blackAlpha.800"
          textAlign="center"
        >
          {name}
        </Text>
      </Slide>
    </Link>
  );
};
export default GameListElement;
