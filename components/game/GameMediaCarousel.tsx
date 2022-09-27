import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/future/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { GameDetails, IGDBImageSize } from "../../types/game";
import { getCoverUrl } from "../../utils/ImageUtils";
import { Center } from "@chakra-ui/react";
import { A11y, Navigation, Pagination } from "swiper";

interface Props {
  game: GameDetails;
}

const GameMediaCarousel = ({ game }: Props) => {
  return (
    <Center width="100%" paddingX={10} paddingY={5} userSelect="none">
      <Swiper
        modules={[Navigation, A11y, Pagination]}
        spaceBetween={10}
        slidesPerView="auto"
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        autoHeight
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
