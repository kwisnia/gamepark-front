import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useBoolean,
  useDisclosure,
  useSlider,
} from "@chakra-ui/react";
import Image from "next/image";
import type { BasicUserDetails } from "../../types/user";
import { useCallback } from "react";
import useLoggedInUser from "../../hooks/useLoggedInUser";
import ProfileEditModal from "./ProfileEditModal";
import { updateUserBannerPosition } from "../../api/UserApi";
import { KeyedMutator } from "swr";
import FollowButton from "./FollowButton";

interface UserProfileHeaderProps {
  user: BasicUserDetails;
  mutate: KeyedMutator<BasicUserDetails>;
}

const SLIDER_STEP = 0.3;

const randomColour = Math.floor(Math.random() * 16777215).toString(16);

const UserProfileHeader = ({ user, mutate }: UserProfileHeaderProps) => {
  const { user: loggedInUser } = useLoggedInUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { state, actions } = useSlider({
    min: 0,
    max: 100,
    step: SLIDER_STEP,
    defaultValue: user.bannerPosition,
  });
  const [isDragging, setIsDragging] = useBoolean();
  const [isPositionShiftEnabled, setIsPositionShiftEnabled] = useBoolean();

  const onMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (isDragging && isPositionShiftEnabled) {
        if (event.movementY < 0) {
          actions.stepUp(SLIDER_STEP * event.movementY * -1);
        } else {
          actions.stepDown(SLIDER_STEP * event.movementY);
        }
      }
    },
    [isDragging, actions, isPositionShiftEnabled]
  );

  const savePosition = useCallback(async () => {
    try {
      await updateUserBannerPosition(state.value);
      setIsPositionShiftEnabled.off();
      mutate({ ...user, bannerPosition: state.value }, false);
    } catch (e) {
      console.log(e);
    }
  }, [state, setIsPositionShiftEnabled, mutate, user]);

  const isOwner = loggedInUser?.id === user.id;

  return (
    <Box>
      <Box position="relative" w="full" h={52} overflow="hidden">
        {user.banner ? (
          <Flex justifyContent="flex-end" alignItems="flex-end" h="full">
            <Image
              src={user.banner}
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
            {isOwner ? (
              <Flex m={3}>
                {isPositionShiftEnabled ? (
                  <>
                    <Button
                      size="sm"
                      colorScheme="facebook"
                      onClick={() => {
                        actions.stepTo(user.bannerPosition);
                        setIsPositionShiftEnabled.off();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="facebook"
                      onClick={savePosition}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <Button
                    size="sm"
                    colorScheme="facebook"
                    textColor="gray.700"
                    onClick={setIsPositionShiftEnabled.toggle}
                  >
                    Change position
                  </Button>
                )}
              </Flex>
            ) : null}
          </Flex>
        ) : (
          <Box objectFit="cover" h="full" bg={`#${randomColour}`} />
        )}
      </Box>
      <Flex justifyContent="space-between">
        <Stack spacing={3} mt={-16} ml={6}>
          <Avatar size="2xl" src={user.avatar ?? ""} ignoreFallback />
          <Heading size="3xl">{user.displayName}</Heading>
          <Heading size="md" textColor="gray.400">
            @{user.username}
          </Heading>
          <Flex gap={3} textColor="gray.400">
            <Text>
              {user.followerCount}{" "}
              {user.followerCount === 1 ? "Follower" : "Followers"}
            </Text>
            <Text>{user.followingCount} Following</Text>
          </Flex>
        </Stack>
        <Flex alignItems="center" mt={-16} mr={6}>
          {isOwner ? (
            <Button colorScheme="blue" onClick={onOpen}>
              Edit profile
            </Button>
          ) : (
            <FollowButton username={user.username} />
          )}
        </Flex>
      </Flex>
      {isOwner ? (
        <ProfileEditModal
          open={isOpen}
          onClose={onClose}
          user={loggedInUser}
          mutate={mutate}
        />
      ) : null}
    </Box>
  );
};

export default UserProfileHeader;
