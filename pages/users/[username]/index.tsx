import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import UserPageLayout from "../../../components/user/UserPageLayout";
import UserProfileHeader from "../../../components/user/UserProfileHeader";
import useUserDetails from "../../../hooks/useUserDetails";
import { BasicUserDetails } from "../../../types/user";

const UserPage = () => {
  const router = useRouter();

  const { username } = router.query;

  const { user } = useUserDetails(username as string);

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
        <Text as={user?.bio ? "p" : "i"}>
          {user?.bio ? user.bio : "This user hasn't updated their bio yet."}
        </Text>
      </UserPageLayout>
    </>
  );
};

export default UserPage;
