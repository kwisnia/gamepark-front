import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { animated, useSpring, useTransition } from "react-spring";
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
  const [rollIn, api] = useSpring(() => ({
    bottom: -100,
  }));
  const { name, slug, cover } = game;

  useEffect(() => {
    api.start({
      bottom: hover ? 0 : -100,
    });

    return () => {
      api.stop();
    };
  }, [hover, api]);

  return (
    <Link className="cursor-pointer" href={`/games/${slug}`}>
      <a
        className="transition-transform hover:-translate-y-3 relative overflow-y-hidden rounded-lg w-[264px] h-[374px]"
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Image
          src={getCoverUrl(cover?.imageId)}
          layout="fill"
          alt={name}
          className="object-cover rounded-lg"
        />
        <animated.div
          style={rollIn}
          className="w-full font-medium text-center text-orange-500 bg-black bg-opacity-60 h-14
        absolute"
        >
          <h1>{name}</h1>
        </animated.div>
      </a>
    </Link>
  );
};
export default GameListElement;
