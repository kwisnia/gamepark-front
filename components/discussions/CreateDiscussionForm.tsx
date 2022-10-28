import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  useToast,
} from "@chakra-ui/react";
import {
  Field,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from "formik";
import { GameDetails } from "../../types/game";
import FormTextField from "../common/FormTextField";
import Editor from "../editor/Editor";
import * as yup from "yup";
import { DiscussionForm, GameDiscussion } from "../../types/discussion";
import { createDiscussion } from "../../api/DiscussionApi";
import { KeyedMutator, mutate } from "swr";

interface CreateDiscussionFormProps {
  game: GameDetails;
  onClose: () => void;
  mutate: KeyedMutator<GameDiscussion[]>;
}

const reviewSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  body: yup.string().required("Body is required"),
});

const CreateDiscussionForm = ({
  game,
  onClose,
  mutate,
}: CreateDiscussionFormProps) => {
  const toast = useToast();
  const handleSubmit = async (
    values: DiscussionForm,
    helpers: FormikHelpers<DiscussionForm>
  ) => {
    try {
      await createDiscussion(game.slug, values);
      console.log(values);
      toast({
        title: "Discussion created",
        description: "Your discussion has been created successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      mutate();
      onClose();
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to create a discussion",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      helpers.setSubmitting(false);
    }
  };

  return (
    <Box>
      <Heading>Start a new discussion</Heading>
      <Formik<DiscussionForm>
        initialValues={{
          title: "",
          body: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={reviewSchema}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <FormTextField name="title" label="Title" />
            <Field name="body">
              {({ meta }: FieldProps<string>) => (
                <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
                  <Editor onChange={(value) => setFieldValue("body", value)} />
                  <FormErrorMessage>{meta.error}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" type="submit" isLoading={isSubmitting}>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateDiscussionForm;
