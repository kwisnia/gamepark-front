import useReviews from "../../hooks/useReviews";
import { GameDetails } from "../../types/game";

interface Props {
  game: GameDetails;
}

const GameReviews = ({ game }: Props) => {
  const { reviews } = useReviews(game.slug);

  
};

export default GameReviews;
