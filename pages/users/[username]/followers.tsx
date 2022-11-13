import { Box, SimpleGrid } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSpinDelay } from "spin-delay";
import EmptyState from "../../../components/common/EmptyState";
import UserPageLayout from "../../../components/user/UserPageLayout";
import UserProfileOverview from "../../../components/user/UserProfileOverview";
import UserProfileOverviewSkeleton from "../../../components/user/UserProfileOverviewSkeleton";
import useUserDetails from "../../../hooks/useUserDetails";
import useUserFollowers from "../../../hooks/useUserFollowers";

const UserFollowersPage: NextPage = () => {
  const router = useRouter();

  const { username } = router.query;

  const { user } = useUserDetails(username as string);
  const {
    followers,
    fetchNextPage,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
  } = useUserFollowers(user?.username as string);
  const { inView, ref } = useInView();
  const shouldDisplaySkeleton =
    useSpinDelay(isLoadingInitialData) || isLoadingMore;

  useEffect(() => {
    if (inView && !isReachingEnd) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isReachingEnd]);

  const title = user
    ? `${user?.displayName}'s followers - GamePark`
    : "Loading...";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <UserPageLayout>
        {!isLoadingInitialData ? (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={4}
          >
            {followers.map((user) => (
              <UserProfileOverview key={user.id} user={user} />
            ))}
          </SimpleGrid>
        ) : null}
        {shouldDisplaySkeleton ? (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={4}
          >
            {[...Array(6)].map((_, index) => (
              <UserProfileOverviewSkeleton key={`follow-skeleton-${index}`} />
            ))}
          </SimpleGrid>
        ) : null}
        {isEmpty && !isLoadingInitialData ? (
          <EmptyState message="This user is not following anyone" />
        ) : null}
        <Box h={1} ref={ref} />
      </UserPageLayout>
    </>
  );
};

export default UserFollowersPage;
