import {
  Box,
  Container,
  Flex,
  Heading,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSpinDelay } from "spin-delay";
import ActivitySkeleton from "../components/dashboard/ActivitySkeleton";
import DiscussionActivity from "../components/dashboard/DiscussionActivity";
import PostActivity from "../components/dashboard/PostActivity";
import ReviewActivity from "../components/dashboard/ReviewActivity";
import useFollowedActivities from "../hooks/useFollowedActivities";
import useLoggedInUser from "../hooks/useLoggedInUser";
import { ActivityType } from "../types/dashboard";

const DashboardPage: NextPage = () => {
  const { isInitialized, user } = useLoggedInUser();
  const router = useRouter();

  if (!user && isInitialized) {
    router.replace("/");
  }
  const {
    activities,
    mutate,
    fetchNextPage,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
  } = useFollowedActivities(user?.username);
  const { ref, inView } = useInView();
  const shouldDisplaySkeleton =
    useSpinDelay(isLoadingInitialData) || isLoadingMore;

  console.log(isLoadingInitialData, isLoadingMore, shouldDisplaySkeleton);

  useEffect(() => {
    if (inView && !isReachingEnd) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isReachingEnd]);

  return (
    <Container maxW="container.xl">
      <Head>
        <title>Dashboard - GamePark</title>
      </Head>
      <Stack spacing={5}>
        <Heading size="3xl">Hello, {user?.displayName}</Heading>
        <Heading>Latest updates from people you follow</Heading>
        <Stack spacing={7}>
          {activities.map((activity) => {
            switch (activity.type) {
              case ActivityType.NewReview:
                return <ReviewActivity activity={activity} mutate={mutate} />;
              case ActivityType.NewDiscussion:
                return (
                  <DiscussionActivity activity={activity} mutate={mutate} />
                );
              case ActivityType.NewPost:
                return <PostActivity activity={activity} mutate={mutate} />;
              default:
                return null;
            }
          })}
          {shouldDisplaySkeleton ? (
            <>
              <ActivitySkeleton type={ActivityType.NewDiscussion} />
              <ActivitySkeleton type={ActivityType.NewPost} />
              <ActivitySkeleton type={ActivityType.NewReview} />
            </>
          ) : null}
          <Box h={1} ref={ref} />
        </Stack>
        {isEmpty && !isLoadingInitialData ? (
          <Box>
            <Text fontSize="2xl" textAlign="center" fontWeight="bold">
              Your dashboard is empty 😥 Follow more people to make it livier!
            </Text>
            <Image
              height={300}
              width={300}
              src="/Detective_Pikachu.webp"
              alt="Detective Pikachu"
              className="mx-auto"
            />
          </Box>
        ) : null}
      </Stack>
    </Container>
  );
};

export default DashboardPage;
