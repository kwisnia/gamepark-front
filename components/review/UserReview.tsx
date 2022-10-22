import { StarIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { KeyedMutator, mutate } from "swr";
import { markHelpful, unmarkHelpful } from "../../api/ReviewApi";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import { UserGameInfo } from "../../hooks/useUserGameInfo";
import { GameCompletionStatus, UserReview } from "../../types/review";
import { getReadableCompletionStatus } from "../../utils/ReviewUtils";
import Rating from "./StarRating";

interface Props {
  review: UserReview;
  mutate: KeyedMutator<UserReview[][]> | KeyedMutator<UserGameInfo>;
}

const UserReview = ({ review, mutate }: Props) => {
  const { user } = useLoggedInUser();
  const isUserReview = user?.username === review.creator;

  const [isReviewBlurred, setIsReviewBlurred] = useState(
    review.containsSpoilers
  );

  const markAsHelpful = useCallback(async () => {
    if (review.markedAsHelpful) {
      await unmarkHelpful(review.game, review.id);
    } else {
      await markHelpful(review.game, review.id);
    }
    mutate();
  }, [review, mutate]);

  return (
    <Box rounded="md" bg="gray.700">
      {isUserReview ? (
        <Text
          fontSize="md"
          fontWeight="semibold"
          textAlign="left"
          width="100%"
          bg="green.400"
          padding={1}
          rounded="md"
          textColor="white"
        >
          Your review
        </Text>
      ) : null}
      <Stack padding={5}>
        <Box>
          <Flex
            alignItems="center"
            justifyContent="space-between"
            marginBottom={3}
          >
            <LinkBox as={Flex} gap={5} alignItems="center">
              <Avatar size="md" />
              <Text fontSize="xl">
                <Link href={`/users/${review.user.username}`} passHref>
                  <LinkOverlay>{review.user.displayName}</LinkOverlay>
                </Link>
              </Text>
            </LinkBox>
            <Rating
              icon={<StarIcon />}
              iconSize={32}
              rating={review.rating}
              readonly
            />
          </Flex>
          <Text fontSize="lg" fontWeight="semibold" color="gray.400">
            {getReadableCompletionStatus(review.gameCompletionID)} on{" "}
            {review.platform.name}
          </Text>
        </Box>
        <Divider />
        <Box position="relative">
          {isReviewBlurred ? (
            <Center
              bg="transparent"
              position="absolute"
              height="100%"
              width="100%"
              flexDirection="column"
              gap={3}
              zIndex={10}
            >
              <Heading size="md" textColor="white">
                This review contains spoilers
              </Heading>
              <Button
                textTransform="uppercase"
                variant="solid"
                colorScheme="orange"
                onClick={() => setIsReviewBlurred(false)}
              >
                Display
              </Button>
            </Center>
          ) : null}
          <Stack
            filter={isReviewBlurred ? "blur(10px)" : ""}
            userSelect={isReviewBlurred ? "none" : "auto"}
            direction="column"
            spacing={4}
          >
            <Heading size="lg">{review.title}</Heading>
            <Text
              fontSize="lg"
              fontWeight="medium"
              color="gray.400"
              noOfLines={1}
            >
              {review.body}
            </Text>
          </Stack>
        </Box>

        <Flex alignItems="center" gap="3">
          <Tooltip
            label={review.markedAsHelpful ? "No longer helpful" : "Helpful"}
          >
            <Box
              as={motion.div}
              whileHover={{
                scale: 1.1,
                cursor: "pointer",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={markAsHelpful}
            >
              {review.markedAsHelpful ? (
                <Icon as={AiFillHeart} color="red.500" />
              ) : (
                <Icon as={AiOutlineHeart} />
              )}
            </Box>
          </Tooltip>
          <Text userSelect="none">{review.helpfulCount}</Text>
        </Flex>
      </Stack>
    </Box>
  );
};

export default UserReview;
