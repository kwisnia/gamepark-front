import {
  Box,
  Button,
  Flex,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import type { FormikHelpers } from "formik";
import FormCheckbox from "../common/FormCheckbox";
import FormTextArea from "../common/FormTextArea";
import FormTextField from "../common/FormTextField";
import Modal from "../common/Modal";
import * as yup from "yup";
import type { GameDetails } from "../../types/game";
import FormSelect from "../common/FormSelect";
import type { SelectOption } from "../../types/common";
import { GameCompletionStatus } from "../../types/review";
import type { ReviewForm } from "../../types/review";
import { submitReview } from "../../api/ReviewApi";
import type { KeyedMutator } from "swr";
import type { UserGameInfo } from "../../hooks/useUserGameInfo";
import Rating from "./StarRating";
import { StarIcon } from "@chakra-ui/icons";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
  rating: number;
  setRating: (rating: number) => void;
  game: GameDetails;
  mutate: KeyedMutator<UserGameInfo>;
}

const reviewSchema = yup.object().shape({
  rating: yup.number().required().min(0.5).max(5),
  title: yup.string().required("Title is required"),
  platform: yup.number().nullable(),
  body: yup.string().required("Body is required"),
  completionStatus: yup.number().required("Completion status is required"),
  containsSpoilers: yup.boolean(),
});

const reviewOptions: SelectOption[] = [
  {
    label: "Completed",
    value: GameCompletionStatus.MainStory,
  },
  {
    label: "Main Story + Extras",
    value: GameCompletionStatus.MainPlusExtras,
  },
  {
    label: "Completed 100%",
    value: GameCompletionStatus.Completionist,
  },
  {
    label: "Unfinished",
    value: GameCompletionStatus.Dropped,
  },
];

const ReviewModal = ({
  open,
  onClose,
  rating,
  setRating,
  game,
  mutate,
}: RegisterModalProps) => {
  const toast = useToast();
  const platformSelectOptions =
    game.platforms?.map((platform) => ({
      value: platform.id,
      label: platform.name,
    })) ?? [];

  const submit = async (
    values: ReviewForm,
    { setSubmitting }: FormikHelpers<ReviewForm>
  ) => {
    try {
      await submitReview(values, game.slug);
      toast({
        title: "Review submitted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      mutate();
      onClose();
    } catch (e) {
      toast({
        title: "Failed to submit review",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Modal isOpen={open} onRequestClose={onClose} size="3xl">
      <ModalContent>
        <ModalContent bg="gray.700">
          <ModalCloseButton />
          <ModalHeader>Rate {game.name}</ModalHeader>
          <Formik<ReviewForm>
            initialValues={{
              rating: rating,
              title: "",
              body: "",
              containsSpoilers: false,
              platform: game.platforms?.[0] ? game.platforms[0].id : null,
              completionStatus: GameCompletionStatus.MainStory,
            }}
            onSubmit={submit}
            validationSchema={reviewSchema}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <ModalBody>
                  <Field name="rating">
                    {() => (
                      <Flex justifyContent="center">
                        <Rating
                          icons={5}
                          rating={rating}
                          onChange={(value) => {
                            setRating(value);
                            setFieldValue("rating", value);
                          }}
                          icon={<StarIcon />}
                          iconSize={40}
                        />
                      </Flex>
                    )}
                  </Field>
                  <Flex gap={5}>
                    <Box minW={64}>
                      <FormTextField name="title" label="Title" />
                      <FormSelect
                        name="platform"
                        label="Platform"
                        type="number"
                        options={platformSelectOptions}
                      />
                      <FormSelect
                        name="completionStatus"
                        label="Completion status"
                        type="number"
                        options={reviewOptions}
                      />
                      <FormCheckbox
                        name="containsSpoilers"
                        label="This review contains spoilers"
                      />
                    </Box>
                    <FormTextArea name="body" label="Review content" h="80%" />
                  </Flex>
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
      </ModalContent>
    </Modal>
  );
};

export default ReviewModal;
