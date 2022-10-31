import { Avatar, Flex, Heading } from "@chakra-ui/react";
import { UserDetails } from "../../types/user";

interface UserProfileHeaderProps {
  user: UserDetails;
}

const UserProfileHeader = ({ user }: UserProfileHeaderProps) => {
  return (
    <Flex alignItems="flex-end" justifyContent="space-between">
      <Avatar size="2xl" src={user.avatar ?? ""} />
      <Heading size="4xl">{user.displayName}</Heading>
    </Flex>
  );
};

export default UserProfileHeader;
