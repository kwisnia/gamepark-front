import { SimpleGrid } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";
import EmptyState from "../../../components/common/EmptyState";
import UserPageLayout from "../../../components/user/UserPageLayout";
import UserProfileOverview from "../../../components/user/UserProfileOverview";
import useUserDetails from "../../../hooks/useUserDetails";
import useUserFollowing from "../../../hooks/useUserFollowing";

const UserFollowingPage: NextPage = () => {
  const router = useRouter();

  const { username } = router.query;

  const { user } = useUserDetails(username as string);
  const { following } = useUserFollowing(username as string);

  const title = user
    ? `${user?.displayName}'s followed profiles - GamePark`
    : "Loading...";

  const followingFlat = useMemo(() => following?.flat() ?? [], [following]);
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <UserPageLayout>
        {followingFlat.length > 0 ? (
          <SimpleGrid
            columns={{
              base: 1,
              md: 2,
              lg: 3,
            }}
            spacing={4}
          >
            {followingFlat.map((user) => (
              <UserProfileOverview key={user.id} user={user} />
            ))}
          </SimpleGrid>
        ) : (
          <EmptyState message="This user doesn't follow anybody" />
        )}
      </UserPageLayout>
    </>
  );
};

export default UserFollowingPage;
