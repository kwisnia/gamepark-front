import { Avatar, Box, Flex, Heading } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getUserDetails } from "../../../api/UserApi";
import { UserDetails } from "../../../types/user";

interface Props {
  userDetails: UserDetails;
}

const UserPage = ({
  userDetails,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Flex>
      <Box>
        <Heading>{userDetails.displayName}</Heading>
      </Box>
      <Avatar />
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
