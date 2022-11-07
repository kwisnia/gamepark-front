import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import UserPageLayout from "../../../components/user/UserPageLayout";
import useUserDetails from "../../../hooks/useUserDetails";
import useSWRImmutable from "swr/immutable";
import { Flex } from "@chakra-ui/react";
import { Achievement } from "../../../types/achievements";
import AchievementBadge from "../../../components/user/AchievementBadge";

const UserAchievementsPage: NextPage = () => {
  const router = useRouter();

  const { username } = router.query;

  const { user } = useUserDetails(username as string);
  const { data: userAchievements } = useSWRImmutable<Achievement[]>(
    username ? `/${username}/achievements` : null
  );
  const { data: allAchievements } =
    useSWRImmutable<Achievement[]>("/achievements");

  const title = user
    ? `${user?.displayName}'s achievements - GamePark`
    : "Loading...";
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <UserPageLayout>
        <Flex>
          {allAchievements?.map((achievement) => (
            <AchievementBadge
              key={achievement.id}
              achievement={achievement}
              unlocked={
                userAchievements?.find((a) => a.id === achievement.id) !==
                undefined
              }
            />
          ))}
        </Flex>
      </UserPageLayout>
    </>
  );
};

export default UserAchievementsPage;
