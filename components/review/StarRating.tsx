import { Box, Icon } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  icon: ReactNode;
  rating: number;
  icons?: number;
  iconSize?: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
}

const Rating = ({
  icon,
  rating,
  onChange,
  readonly,
  icons = 5,
  iconSize = 20,
}: Props) => {
  const [activeRating, setActiveRating] = useState(rating);
  const ratings = Array.from(Array(icons).keys());

  const getRelativePosition = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    return x / rect.width;
  };

  useEffect(() => {
    setActiveRating(rating);
  }, [rating]);

  return (
    <Box onMouseLeave={() => setActiveRating(rating)} position="relative">
      {ratings.map((_, i) => (
        <Icon
          as="span"
          key={i}
          fontSize={iconSize}
          onMouseOver={() => {
            if (readonly) {
              return;
            }
            setActiveRating(i + 1);
          }}
        >
          {icon}
        </Icon>
      ))}
      <Box
        position="absolute"
        top={0}
        left={0}
        width={`${activeRating * iconSize}px`}
        maxWidth="100%"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        {ratings.map((_, i) => (
          <Icon
            as="span"
            key={i}
            color="gold"
            fontSize={iconSize}
            cursor={readonly ? "default" : "pointer"}
            onMouseMove={(e) => {
              if (readonly) {
                return;
              }
              const mousePosition = getRelativePosition(e);
              mousePosition > 0.5
                ? setActiveRating(i + 1)
                : setActiveRating(i + 0.5);
            }}
            onClick={(e) => {
              if (readonly) {
                return;
              }
              const mousePosition = getRelativePosition(e);
              mousePosition > 0.5 ? onChange?.(i + 1) : onChange?.(i + 0.5);
            }}
          >
            {icon}
          </Icon>
        ))}
      </Box>
    </Box>
  );
};

export default Rating;
