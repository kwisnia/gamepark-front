import { Avatar, Flex, Heading, LinkBox, LinkOverlay } from "@chakra-ui/react";
import Link from "next/link";

interface UserDisplayProps {
  displayName: string;
  username: string;
  size: "sm" | "md" | "lg";
}

const UserDisplay = ({ displayName, username, size }: UserDisplayProps) => {
  return (
    <LinkBox as={Flex} gap={2} alignItems="center">
      <Avatar size={size} />
      <Heading fontSize={size}>
        <Link href={`/users/${username}`} passHref>
          <LinkOverlay>{displayName}</LinkOverlay>
        </Link>
      </Heading>
    </LinkBox>
  );
};

export default UserDisplay;
