import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import EmptyState from "../../../components/common/EmptyState";
import UserReview from "../../../components/review/UserReview";
import UserPageLayout from "../../../components/user/UserPageLayout";
import useUserDetails from "../../../hooks/useUserDetails";
import useUserReviews from "../../../hooks/useUserReviews";

const UserReviewPage: NextPage = () => {
  const router = useRouter();

  const { username } = router.query;

  const { user } = useUserDetails(username as string);

  const { reviews, mutate, fetchNextPage } = useUserReviews(username as string);
  const { ref, inView } = useInView();

  const reviewsFlat = useMemo(() => reviews?.flat() ?? [], [reviews]);

  console.log(reviewsFlat);
  const half = Math.ceil(reviewsFlat.length / 2);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const title = user
    ? `${user?.displayName}'s reviews - GamePark`
    : "Loading...";
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <UserPageLayout>
        {reviewsFlat.length > 0 ? (
          <SimpleGrid
            columns={{
              base: 1,
              xl: 2,
            }}
            justifyContent="center"
            gap={10}
          >
            <Flex direction="column" gap={5}>
              {reviewsFlat.slice(0, half).map((review) => (
                <UserReview
                  key={review.id}
                  review={review}
                  mutate={mutate}
                  isUserPage
                />
              ))}
            </Flex>
            <Flex direction="column" gap={5}>
              {reviewsFlat.slice(half).map((review) => (
                <UserReview
                  key={review.id}
                  review={review}
                  mutate={mutate}
                  isUserPage
                />
              ))}
            </Flex>
          </SimpleGrid>
        ) : (
          <EmptyState />
        )}
        <Box ref={ref} height={1} />
      </UserPageLayout>
    </>
  );
};

export default UserReviewPage;
