import { SimpleGrid, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";
import EmptyState from "../../../components/common/EmptyState";
import UserPageLayout from "../../../components/user/UserPageLayout";
import UserProfileOverview from "../../../components/user/UserProfileOverview";
import useUserDetails from "../../../hooks/useUserDetails";
import useUserFollowers from "../../../hooks/useUserFollowers";

const UserFollowersPage: NextPage = () => {
  const router = useRouter();

  const { username } = router.query;

  const { user } = useUserDetails(username as string);
  const { followers } = useUserFollowers(username as string);

  const title = user
    ? `${user?.displayName}'s followers - GamePark`
    : "Loading...";

  const followersFlat = useMemo(() => followers?.flat() ?? [], [followers]);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <UserPageLayout>
        {followersFlat.length > 0 ? (
          <SimpleGrid columns={3} spacing={4}>
            {followersFlat.map((user) => (
              <UserProfileOverview key={user.id} user={user} />
            ))}
          </SimpleGrid>
        ) : (
          <EmptyState />
        )}
      </UserPageLayout>
    </>
  );
};

export default UserFollowersPage;
