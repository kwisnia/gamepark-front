import {
  Avatar,
  Box,
  Button,
  Center,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import Modal from "../common/Modal";
import * as yup from "yup";
import FormTextField from "../common/FormTextField";
import FormTextArea from "../common/FormTextArea";
import Image from "next/image";
import { useCallback, useState } from "react";
import { updateUserProfile } from "../../api/UserApi";
import type { FormikHelpers } from "formik";
import type { BasicUserDetails, UserProfileEditForm } from "../../types/user";
import { KeyedMutator, mutate } from "swr";

interface ProfileEditModalProps {
  open: boolean;
  onClose: () => void;
  user: BasicUserDetails;
  mutate: KeyedMutator<BasicUserDetails>;
}

const profileEditSchema = yup.object().shape({
  displayName: yup.string().required("Display name is required"),
  bio: yup.string().max(500, "Bio must be less than 500 characters"),
});

const randomColour = Math.floor(Math.random() * 16777215).toString(16);

const ProfileEditModal = ({
  open,
  onClose,
  user,
  mutate,
}: ProfileEditModalProps) => {
  const [avatarUrl, setAvatarUrl] = useState(user.avatar);
  const [bannerUrl, setBannerUrl] = useState(user.banner);
  const toast = useToast();

  const submit = async (
    values: UserProfileEditForm,
    { setSubmitting }: FormikHelpers<UserProfileEditForm>
  ) => {
    try {
      await updateUserProfile(values);
      toast({
        title: "Profile updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      mutate();
      onClose();
    } catch (e) {
      toast({
        title: "Error updating profile",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = useCallback(() => {
    setAvatarUrl(user.avatar);
    setBannerUrl(user.banner);
    onClose();
  }, [user, onClose]);

  return (
    <Modal isOpen={open} onRequestClose={closeModal}>
      <ModalContent bg="gray.700">
        <ModalCloseButton />
        <ModalHeader>Update your profile</ModalHeader>
        <Formik<UserProfileEditForm>
          initialValues={{
            avatar: null,
            displayName: user.displayName,
            bio: user.bio,
            banner: null,
            removeBanner: false,
          }}
          onSubmit={submit}
          validationSchema={profileEditSchema}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form>
              <ModalBody>
                <Box
                  position="relative"
                  w="full"
                  h={52}
                  overflow="hidden"
                  className="FileInput"
                >
                  {bannerUrl ? (
                    <Image
                      src={bannerUrl}
                      priority
                      alt="User header"
                      className="object-cover"
                      fill
                    />
                  ) : (
                    <Box objectFit="cover" h="full" bg={`#${randomColour}`} />
                  )}
                  <Input
                    type="file"
                    accept={
                      user.userUnlocks.animatedBanner
                        ? "image/*"
                        : "image/jpeg, image/png"
                    }
                    position="absolute"
                    top={0}
                    left={0}
                    w="full"
                    h="full"
                    opacity={0}
                    visibility={user.userUnlocks.banner ? "visible" : "hidden"}
                    onChange={async (e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const reader = new FileReader();
                        if (
                          !user.userUnlocks.animatedBanner &&
                          e.target.files[0].type !== "image/jpeg" &&
                          e.target.files[0].type !== "image/png"
                        ) {
                          return;
                        }
                        setFieldValue("banner", e.target.files[0]);
                        setFieldValue("removeBanner", false);
                        reader.onload = (e) => {
                          setBannerUrl(e.target?.result as string);
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }
                    }}
                    cursor={user.userUnlocks.banner ? "pointer" : "not-allowed"}
                    zIndex={1}
                    disabled={!user.userUnlocks.banner}
                  />
                  <Center
                    position="absolute"
                    top={0}
                    left={0}
                    h="full"
                    w="full"
                    opacity={0}
                    bg="rgba(0, 0, 0, 0.5)"
                    cursor={user.userUnlocks.banner ? "pointer" : "not-allowed"}
                    className={`FileInputHint`}
                  >
                    <Text fontWeight="bold">
                      {user.userUnlocks.banner
                        ? "Change banner"
                        : "🔒 Unlocked at 10 points"}
                    </Text>
                  </Center>
                </Box>
                <Box
                  mt={-16}
                  ml={6}
                  position="relative"
                  w={128}
                  className="FileInput"
                  rounded="full"
                >
                  <Avatar
                    size="2xl"
                    name={user.displayName}
                    src={avatarUrl ?? ""}
                  />
                  <Center
                    position="absolute"
                    top={0}
                    left={0}
                    h="full"
                    w="full"
                    opacity={0}
                    bg="rgba(0, 0, 0, 0.5)"
                    className="FileInputHint"
                    rounded="full"
                  >
                    <Text fontWeight="bold">Change avatar</Text>
                  </Center>
                  <Input
                    type="file"
                    accept={
                      user.userUnlocks.animatedAvatar
                        ? "image/*"
                        : "image/jpeg, image/png"
                    }
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        const reader = new FileReader();
                        if (
                          !user.userUnlocks.animatedAvatar &&
                          e.target.files[0].type !== "image/jpeg" &&
                          e.target.files[0].type !== "image/png"
                        ) {
                          return;
                        }
                        setFieldValue("avatar", e.target.files[0]);
                        reader.onload = (e) => {
                          setAvatarUrl(e.target?.result as string);
                        };
                        reader.readAsDataURL(e.target.files[0]);
                      }
                    }}
                    position="absolute"
                    top={0}
                    left={0}
                    opacity={0}
                    w={128}
                    h={128}
                    rounded="full"
                    cursor="pointer"
                    zIndex={10}
                  />
                </Box>
                {bannerUrl ? (
                  <Center>
                    <Button
                      size="sm"
                      onClick={() => {
                        setFieldValue("banner", null);
                        setFieldValue("removeBanner", true);
                        setBannerUrl("");
                      }}
                    >
                      Remove banner
                    </Button>
                  </Center>
                ) : null}
                <Text textAlign="center" textColor="gray.400" fontSize="sm">
                  {user.userUnlocks.animatedAvatar
                    ? "You can upload animated avatars!"
                    : "Ability to upload animated avatars unlocks at 20 points"}
                </Text>
                <Text textAlign="center" textColor="gray.400" fontSize="sm">
                  {user.userUnlocks.animatedBanner
                    ? "You can upload animated banners!"
                    : "Ability to upload animated banners unlocks at 35 points"}
                </Text>
                <FormTextField name="displayName" label="Display name" />
                <FormTextArea name="bio" label="Profile bio" />
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={closeModal}>
                  Close
                </Button>
                <Button
                  colorScheme="green"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Submit
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default ProfileEditModal;
