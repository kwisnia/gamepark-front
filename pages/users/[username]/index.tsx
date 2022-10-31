import { Avatar, Box, Container, Flex, Heading } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { getUserDetails } from "../../../api/UserApi";
import UserProfileHeader from "../../../components/user/UserProfileHeader";
import { UserDetails } from "../../../types/user";

interface Props {
  userDetails: UserDetails;
}

const UserPage = ({
  userDetails,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const title = `${userDetails.displayName}'s profile - GamePark`;

  return (
    <Flex>
      <Head>
        <title>{title}</title>
      </Head>
      <Container maxW="container.xl">
        <UserProfileHeader user={userDetails} />
      </Container>
    </Flex>
  );
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  if (params) {
    const { username } = params;
    const userDetails = await getUserDetails(username as string);
    return {
      props: {
        userDetails,
      },
      notFound: !userDetails,
    };
  }
  return {
    props: {},
    notFound: true,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true };
};

export default UserPage;
