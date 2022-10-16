import { Flex } from "@chakra-ui/react";
import { Rating, RatingProps } from "react-simple-star-rating";

const UserRating = (ratingProps: RatingProps) => {
  return (
    <Flex alignItems="center" justifyContent="center" mb="4">
      <Rating
        allowFraction
        transition
        fillStyle={{
          display: "-webkit-box",
        }}
        emptyStyle={{
          display: "flex",
        }}
        {...ratingProps}
      />
    </Flex>
  );
};

export default UserRating;
