import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IGDBImageSize } from "../../types/game";
import type { GameDetails } from "../../types/game";
import { getCoverUrl } from "../../utils/ImageUtils";
import { Center } from "@chakra-ui/react";
import { A11y, Autoplay, Lazy, Navigation, Pagination } from "swiper";

interface GameMediaCarouselProps {
  game: GameDetails;
}

const GameMediaCarousel = ({ game }: GameMediaCarouselProps) => {
  return (
    <Center width="100%" paddingX={10} paddingY={5} userSelect="none">
      <Swiper
        modules={[Navigation, A11y, Pagination, Autoplay, Lazy]}
        spaceBetween={10}
        slidesPerView="auto"
        navigation
        pagination={{ clickable: true }}
        autoHeight
        autoplay={{ delay: 5000 }}
        lazy
      >
        {game.screenshots?.map((screenshot) => (
          <SwiperSlide key={screenshot.imageId}>
            <Image
              src={getCoverUrl(screenshot.imageId, IGDBImageSize.FullHD, false)}
              height={1080}
              width={1920}
              alt={game.name}
            />
          </SwiperSlide>
        ))}
        {game.artworks?.map((artwork) => (
          <SwiperSlide key={artwork.imageId}>
            <Image
              src={getCoverUrl(artwork.imageId, IGDBImageSize.FullHD, false)}
              height={1080}
              width={1920}
              alt={game.name}
            />
          </SwiperSlide>
        ))}
        {game.videos?.map((video) => (
          <SwiperSlide key={video.videoId}>
            <iframe
              src={`https://www.youtube.com/embed/${video.videoId}`}
              title={game.name}
              width="100%"
              className="aspect-video"
              allowFullScreen
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Center>
  );
};

export default GameMediaCarousel;
