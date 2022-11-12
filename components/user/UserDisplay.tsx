import {
  Avatar,
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import Link from "next/link";
import type { BasicUserDetails } from "../../types/user";
import UserPopoverBody from "./UserPopover";

interface UserDisplayProps {
  user: BasicUserDetails;
  size: "sm" | "md" | "lg";
}

const UserDisplay = ({ user, size }: UserDisplayProps) => {
  return (
    <Popover trigger="hover" isLazy>
      <PopoverTrigger>
        <Box>
          <LinkBox as={Flex} gap={2} alignItems="center">
            <Avatar size={size} src={user.avatar ?? ""} />
            <Heading fontSize={size}>
              <LinkOverlay>
                <Link href={`/users/${user.username}`} passHref>
                  {user.displayName}
                </Link>
              </LinkOverlay>
            </Heading>
          </LinkBox>
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <UserPopoverBody user={user} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default UserDisplay;
