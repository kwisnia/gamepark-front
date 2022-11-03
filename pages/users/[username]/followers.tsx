import { Container } from "@chakra-ui/react";
import type { NextPage, GetServerSideProps } from "next";
import { getUserDetails } from "../../../api/UserApi";

const UserFollowersPage: NextPage = () => {
  return <Container maxW="container.xl">
    
  </Container>;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { username } = query;

  if (!username) {
    return {
      notFound: true,
    };
  }

  try {
    const userDetails = await getUserDetails(username as string);
    return {
      props: {
        userDetails,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
};

export default UserFollowersPage;
