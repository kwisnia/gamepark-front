import { Box, Center, Heading } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/future/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";
import { useEffect, useState } from "react";
import { GameListElement, IGDBImageSize } from "../types/game";
import { getCoverUrl } from "../utils/ImageUtils";

interface Props {
  game: GameListElement;
}

const GameListElement = ({ game }: Props) => {
  const [hover, setHover] = useState(false);
  const { name, slug, cover } = game;

  // TODO: Implement chakra transitions, see https://chakra-ui.com/docs/components/transition
  // TODO: Implement chakra LinkOverlay, see https://chakra-ui.com/docs/components/link-overlay
  return (
    <Link className="cursor-pointer" href={`/games/${slug}`}>
      <a
        className="transition-transform hover:-translate-y-3 relative overflow-y-hidden rounded-lg w-[264px] h-[374px]"
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {cover?.imageId ? (
          <Image
            src={getCoverUrl(cover?.imageId, IGDBImageSize.CoverBig, false)}
            fill
            alt={name}
            className="object-cover rounded-lg"
          />
        ) : (
          <Center background="gray.500" height="full" rounded="lg">
            <Heading>{name}</Heading>
          </Center>
        )}

        <motion.div
          animate={{ bottom: hover ? 0 : -100 }}
          className="w-full font-medium text-center text-orange-500 bg-black bg-opacity-60 h-14
        absolute"
        >
          <h1>{name}</h1>
        </motion.div>
      </a>
    </Link>
  );
};
export default GameListElement;
