import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  useBoolean,
  useDisclosure,
  useSlider,
} from "@chakra-ui/react";
import Image from "next/image";
import type { BasicUserDetails } from "../../types/user";
import React, { useCallback, useEffect, useState } from "react";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import ProfileEditModal from "./ProfileEditModal";

interface UserProfileHeaderProps {
  user: BasicUserDetails;
}

const UserProfileHeader = ({ user }: UserProfileHeaderProps) => {
  const { user: loggedInUser, loggedOut } = useLoggedInUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state, actions } = useSlider({
    min: 0,
    max: 100,
    step: 0.3,
    defaultValue: 50,
  });
  const [isDragging, setIsDragging] = useBoolean();


  const onMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (isDragging) {
        console.log(event.movementY);
        // step up on mouse move up
        if (event.movementY < 0) {
          actions.stepUp(0.3 * event.movementY * -1);
        } else {
          actions.stepDown(0.3 * event.movementY);
        }
      }
    },
    [isDragging, actions]
  );

  useEffect(() => {
    console.log(state.value);
  }, [state]);

  return (
    <Box>
      <Box position="relative" w="full" h={52} overflow="hidden">
        <Image
          src="https://gamepark-images.s3.eu-central-1.amazonaws.com/istockphoto-1279840008-1024x1024.jpg"
          priority
          alt="User header"
          className="object-cover"
          fill
          style={{ objectPosition: `center ${state.value}%` }}
          onMouseDown={setIsDragging.on}
          onMouseUp={setIsDragging.off}
          onMouseMove={onMouseMove}
          onMouseLeave={setIsDragging.off}
          draggable={false}
        />
      </Box>
      <Flex justifyContent="space-between">
        <Stack spacing={3} mt={-16} ml={6}>
          <Avatar size="2xl" src={user.avatar ?? ""} />
          <Heading size="3xl">{user.displayName}</Heading>
          <Heading size="md" textColor="gray.400">
            @{user.username}
          </Heading>
        </Stack>
        <Flex alignItems="center" mt={-16} mr={6}>
          {loggedInUser?.username === user.username ? (
            <Button colorScheme="blue" onClick={onOpen}>
              Edit profile
            </Button>
          ) : (
            <Button colorScheme="blue">Follow</Button>
          )}
        </Flex>
      </Flex>
      {loggedInUser ? (
        <ProfileEditModal open={isOpen} onClose={onClose} user={loggedInUser} />
      ) : null}
    </Box>
  );
};

export default UserProfileHeader;
