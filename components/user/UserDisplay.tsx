import { Avatar, Flex, Heading, LinkBox, LinkOverlay } from "@chakra-ui/react";
import Link from "next/link";

interface UserDisplayProps {
  displayName: string;
  username: string;
  avatar: string | null;
  size: "sm" | "md" | "lg";
}

const UserDisplay = ({
  displayName,
  username,
  avatar,
  size,
}: UserDisplayProps) => {
  return (
    <LinkBox as={Flex} gap={2} alignItems="center">
      <Avatar size={size} src={avatar ?? ""} />
      <Heading fontSize={size}>
        <LinkOverlay>
          <Link href={`/users/${username}`} passHref>
            {displayName}
          </Link>
        </LinkOverlay>
      </Heading>
    </LinkBox>
  );
};

export default UserDisplay;
