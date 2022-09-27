import { motion } from "framer-motion";
import Image from "next/future/image";
import Link from "next/link";
import { getPlaiceholder } from "plaiceholder";
import { useEffect, useState } from "react";
import { GameListElement } from "../types/game";

interface Props {
  game: GameListElement;
}

const getCoverUrl = (coverId?: string) => {
  if (!coverId) {
    return "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=";
  }
  return `https://images.igdb.com/igdb/image/upload/t_cover_big/${coverId}.jpg`;
};

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
        <Image
          src={getCoverUrl(cover?.imageId)}
          fill
          alt={name}
          className="object-cover rounded-lg"
        />
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
