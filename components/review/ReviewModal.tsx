import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useToast,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import FormCheckbox from "../common/FormCheckbox";
import FormTextArea from "../common/FormTextArea";
import FormTextField from "../common/FormTextField";
import Modal from "../common/Modal";
import * as yup from "yup";
import { GameDetails } from "../../types/game";
import UserRating from "./UserRating";
import FormSelect from "../common/FormSelect";
import { SelectOption } from "../../types/common";
import { GameCompletionStatus, ReviewForm } from "../../types/review";
import { submitReview } from "../../api/ReviewApi";
import { KeyedMutator, mutate } from "swr";
import { UserGameInfo } from "../../hooks/useUserGameInfo";

interface Props {
  open: boolean;
  onClose: () => void;
  rating: number;
  setRating: (rating: number) => void;
  game: GameDetails;
  mutate: KeyedMutator<UserGameInfo>;
}

const reviewSchema = yup.object().shape({
  rating: yup.number().required().min(1).max(5),
  title: yup.string().required("Title is required"),
  platform: yup.number().required("Platform is required"),
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
}: Props) => {
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
      console.log(values);
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
    <Modal isOpen={open} onRequestClose={onClose}>
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
              platform: game.platforms?.[0].id ?? 0,
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
                      <UserRating
                        onClick={(value) => {
                          setRating(value);
                          setFieldValue("rating", value);
                        }}
                        initialValue={rating}
                      />
                    )}
                  </Field>
                  <FormTextField name="title" label="Title" />
                  <FormSelect
                    name="platform"
                    label="Platform"
                    type="number"
                    options={platformSelectOptions}
                  />
                  <FormTextArea name="body" label="Review content" />
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
