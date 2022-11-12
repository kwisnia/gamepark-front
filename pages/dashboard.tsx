import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
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
  const { activities, mutate } = useFollowedActivities(user?.username ?? "");
  const activitiesFlat = activities?.flat() ?? [];

  return (
    <Container maxW="container.xl">
      <Head>
        <title>Dashboard - GamePark</title>
      </Head>
      <Stack>
        <Heading size="3xl">Hello, {user?.displayName}</Heading>
        <Heading>Latest updates from people you follow</Heading>
        <Stack>
          {activitiesFlat.length > 0 ? (
            activitiesFlat.map((activity) => {
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
            })
          ) : (
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
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default DashboardPage;
