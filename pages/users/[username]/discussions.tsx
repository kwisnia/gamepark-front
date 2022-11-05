import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import EmptyState from "../../../components/common/EmptyState";
import DiscussionItem from "../../../components/discussions/DiscussionItem";
import UserPageLayout from "../../../components/user/UserPageLayout";
import useUserDetails from "../../../hooks/useUserDetails";
import useUserDiscussions from "../../../hooks/useUserDiscussions";

const UserDiscussionsPage: NextPage = () => {
  const router = useRouter();

  const { username } = router.query;

  const { user } = useUserDetails(username as string);
  const { discussions, fetchNextPage, mutate } = useUserDiscussions(
    username as string
  );
  const { ref, inView } = useInView();

  const discussionsFlat = useMemo(() => {
    return discussions?.flat() ?? [];
  }, [discussions]);

  console.log(discussionsFlat);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

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
          {discussionsFlat.length > 0 ? (
            discussionsFlat.map((discussion) => (
              <DiscussionItem
                key={discussion.id}
                discussion={discussion}
                mutate={mutate}
                isUserPage
              />
            ))
          ) : (
            <EmptyState />
          )}
        </Stack>
        <Box h={1} ref={ref} />
      </UserPageLayout>
    </>
  );
};

export default UserDiscussionsPage;
