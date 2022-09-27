import { Box } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { getGame } from "../../api/GamesApi";
import GameHeader from "../../components/game/GameHeader";
import GameDetailsTab from "../../components/game/GameDetailsTabs";
import { GameDetails } from "../../types/game";
import Image from "next/future/image";
import { getRandomImage } from "../../utils/ImageUtils";
import styles from "../../styles/GamePage.module.css";

interface Props {
  game: GameDetails;
}

const GamePage = ({ game }: Props) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Box>Loading...</Box>;
  }
  return (
    <Box>
      {getRandomImage(game) && (
        <Image
          src={getRandomImage(game)}
          alt={game.name}
          sizes="100vw"
          width={1920}
          height={1080}
          className={`w-full -translate-y-96 absolute z-0 opacity-30 ${styles["game-header-image"]}`}
        />
      )}
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
