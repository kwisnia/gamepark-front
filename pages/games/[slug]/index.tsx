import { Box } from "@chakra-ui/react";
import type { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { getGame } from "../../../api/GamesApi";
import GameHeader from "../../../components/game/GameHeader";
import GameDetailsTab from "../../../components/game/GameDetailsTabs";
import type { GameDetails } from "../../../types/game";
import Image from "next/image";
import { getRandomImage } from "../../../utils/ImageUtils";
import styles from "styles/GamePage.module.css";
import { useMemo } from "react";
import Head from "next/head";
import GameDetailsSkeleton from "../../../components/game/GameDetailsSkeleton";

interface Props {
  game: GameDetails;
}

const GamePage = ({ game }: Props) => {
  const router = useRouter();
  const randomImageUrl = useMemo(() => getRandomImage(game), [game]);

  if (router.isFallback) {
    return <GameDetailsSkeleton />;
  }
  const title = `${game.name} - GamePark`;

  return (
    <Box>
      <Head>
        <title>{title}</title>
      </Head>
      {getRandomImage(game) ? (
        <Image
          src={randomImageUrl}
          alt={game.name}
          sizes="100vw"
          width={1920}
          height={1080}
          className={`w-full -translate-y-96 absolute z-0 opacity-30 ${styles["game-header-image"]} select-none`}
          priority
        />
      ) : null}
      <GameHeader game={game} />
      <GameDetailsTab game={game} />
    </Box>
  );
};

export default GamePage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params) {
    const { slug } = params;
    const game = await getGame(slug as string);
    return {
      props: {
        game,
      },
      notFound: !game,
      revalidate: 60 * 60 * 24, // 24 hours
    };
  }
  return {
    props: {},
    notFound: true,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};
