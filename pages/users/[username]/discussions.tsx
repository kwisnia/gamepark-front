import { Box, Stack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSpinDelay } from "spin-delay";
import EmptyState from "../../../components/common/EmptyState";
import DiscussionItem from "../../../components/discussions/DiscussionItem";
import DiscussionItemSkeleton from "../../../components/discussions/DiscussionItemSkeleton";
import UserPageLayout from "../../../components/user/UserPageLayout";
import useUserDetails from "../../../hooks/useUserDetails";
import useUserDiscussions from "../../../hooks/useUserDiscussions";

const UserDiscussionsPage: NextPage = () => {
  const router = useRouter();

  const { username } = router.query;

  const { user } = useUserDetails(username as string);
  const {
    discussions,
    fetchNextPage,
    mutate,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
  } = useUserDiscussions(username as string);
  const { ref, inView } = useInView();
  const shouldRenderSkeletons =
    useSpinDelay(isLoadingInitialData) || isLoadingMore;

  useEffect(() => {
    if (inView && !isReachingEnd) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, isReachingEnd]);

  const title = user
    ? `${user?.displayName}'s discussions - GamePark`
    : "Loading...";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <UserPageLayout>
        <Stack direction="column" spacing={2}>
          {isEmpty && !isLoadingInitialData ? (
            <EmptyState message="This user has created no discussions yet 😥" />
          ) : (
            discussions.map((discussion) => (
              <DiscussionItem
                key={discussion.id}
                discussion={discussion}
                mutate={mutate}
                isUserPage
              />
            ))
          )}
          {shouldRenderSkeletons
            ? [...Array(3)].map((_, i) => (
                <DiscussionItemSkeleton key={`discussion-item-skeleton-${i}`} />
              ))
            : null}
        </Stack>
        <Box h={1} ref={ref} />
      </UserPageLayout>
    </>
  );
};

export default UserDiscussionsPage;
