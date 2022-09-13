import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
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
  const { name, slug, cover } = game;
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="w-32 md:w-48 lg:w-64 cursor-pointer h-full"
        onClick={() => router.push(`/games/${slug}`)}
      >
        <Image
          src={getCoverUrl(cover?.imageId)}
          width={264}
          height={374}
          alt={name}
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
      <div className="mt-2 w-full text-sm font-medium text-center text-orange-500">
        {name}
      </div>
    </div>
  );
};
export default GameListElement;
