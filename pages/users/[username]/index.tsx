import { Heading, Skeleton, Text } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import UserPageLayout from "../../../components/user/UserPageLayout";
import useUserDetails from "../../../hooks/useUserDetails";

const UserPage = () => {
  const router = useRouter();

  const { username } = router.query;

  const { user, isLoading } = useUserDetails(username as string);

  const title = user
    ? `${user?.displayName}'s profile - GamePark`
    : "Loading...";
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <UserPageLayout>
        <Heading>About</Heading>
        <Skeleton isLoaded={!isLoading}>
          <Text as={user?.bio ? "p" : "i"}>
            {user?.bio ? user.bio : "This user hasn't updated their bio yet."}
          </Text>
        </Skeleton>
      </UserPageLayout>
    </>
  );
};

export default UserPage;
