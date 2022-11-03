import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { BasicUserDetails, UserProfileEditForm } from "../../types/user";
import Modal from "../common/Modal";
import * as yup from "yup";
import FormTextField from "../common/FormTextField";
import FormTextArea from "../common/FormTextArea";
import Image from "next/image";
import { BsFillCameraFill } from "react-icons/bs";

interface ProfileEditModalProps {
  open: boolean;
  onClose: () => void;
  user: BasicUserDetails;
}

const profileEditSchema = yup.object().shape({
  displayName: yup.string().required("Display name is required"),
  bio: yup.string().max(500, "Bio must be less than 500 characters"),
});

const randomColour = Math.floor(Math.random() * 16777215).toString(16);

const ProfileEditModal = ({ open, onClose, user }: ProfileEditModalProps) => {
  const submit = () => {};
  return (
    <Modal isOpen={open} onRequestClose={onClose}>
      <ModalContent bg="gray.700">
        <ModalCloseButton />
        <ModalHeader>Update your profile</ModalHeader>
        <Formik<UserProfileEditForm>
          initialValues={{
            avatar: null,
            displayName: user.displayName,
            bio: user.bio ?? "",
            banner: null,
            removeBanner: false,
          }}
          onSubmit={submit}
          validationSchema={profileEditSchema}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <ModalBody>
                <Box
                  position="relative"
                  w="full"
                  h={52}
                  overflow="hidden"
                  className="FileInput"
                >
                  <Image
                    src="https://gamepark-images.s3.eu-central-1.amazonaws.com/istockphoto-1279840008-1024x1024.jpg"
                    priority
                    alt="User header"
                    className="object-cover shadow-2xl shadow-red-500"
                    fill
                  />
                  <Input
                    type="file"
                    accept="image/*"
                    position="absolute"
                    top={0}
                    left={0}
                    w="full"
                    h="full"
                    opacity={0}
                    onChange={(e) => {
                      if (e.target.files) {
                        setFieldValue("banner", e.target.files[0]);
                        setFieldValue("removeBanner", false);
                      }
                    }}
                    cursor="pointer"
                    zIndex={1}
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
                  >
                    <Text fontWeight="bold">Change banner</Text>
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
                    src={values.avatar ? values.avatar.name : user.avatar ?? ""}
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
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files) {
                        setFieldValue("avatar", e.target.files[0]);
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
                <FormTextField name="displayName" label="Display name" />
                <FormTextArea name="bio" label="Profile bio" />
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
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
