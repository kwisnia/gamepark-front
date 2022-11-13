import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSpinDelay } from "spin-delay";
import EmptyState from "../../../components/common/EmptyState";
import UserReview from "../../../components/review/UserReview";
import UserReviewSkeleton from "../../../components/review/UserReviewSkeleton";
import UserPageLayout from "../../../components/user/UserPageLayout";
import useUserDetails from "../../../hooks/useUserDetails";
import useUserReviews from "../../../hooks/useUserReviews";

const UserReviewPage: NextPage = () => {
  const router = useRouter();

  const { username } = router.query;

  const { user, error } = useUserDetails(username as string);

  const {
    reviews,
    mutate,
    fetchNextPage,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
  } = useUserReviews(user?.username);
  const { ref, inView } = useInView();
  const shouldRenderSkeletons =
    useSpinDelay(isLoadingInitialData) || isLoadingMore;

  const half = Math.ceil(reviews.length / 2);

  useEffect(() => {
    if (inView && !isReachingEnd) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isReachingEnd]);

  const title = user
    ? `${user?.displayName}'s reviews - GamePark`
    : "Loading...";

  if (error) {
    router.replace("/404");
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <UserPageLayout>
        {isEmpty && !isLoadingInitialData ? (
          <EmptyState message="This user hasn't reviewed any game 😥" />
        ) : (
          <SimpleGrid
            columns={{
              base: 1,
              xl: 2,
            }}
            justifyContent="center"
            gap={10}
          >
            <Flex direction="column" gap={5}>
              {reviews.slice(0, half).map((review) => (
                <UserReview
                  key={review.id}
                  review={review}
                  mutate={mutate}
                  isUserPage
                />
              ))}
              {shouldRenderSkeletons ? (
                <>
                  <UserReviewSkeleton withGameDetails />
                  <UserReviewSkeleton withGameDetails />
                </>
              ) : null}
            </Flex>
            <Flex direction="column" gap={5}>
              {reviews.slice(half).map((review) => (
                <UserReview
                  key={review.id}
                  review={review}
                  mutate={mutate}
                  isUserPage
                />
              ))}
              {shouldRenderSkeletons ? (
                <>
                  <UserReviewSkeleton withGameDetails />
                  <UserReviewSkeleton withGameDetails />
                </>
              ) : null}
            </Flex>
          </SimpleGrid>
        )}
        <Box ref={ref} height={1} />
      </UserPageLayout>
    </>
  );
};

export default UserReviewPage;
