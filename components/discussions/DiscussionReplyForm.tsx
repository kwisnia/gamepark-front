import { Box, Button, Text } from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { DiscussionPost, DiscussionPostForm } from "../../types/discussion";
import Editor from "../editor/Editor";
import * as yup from "yup";

interface DiscussionReplyProps {
  onSubmit: (
    values: DiscussionPostForm,
    helpers: FormikHelpers<DiscussionPostForm>
  ) => void;
  replyTo?: DiscussionPost;
  body?: string;
}

const replySchema = yup.object().shape({
  body: yup.string().required("Body is required"),
  originalPostId: yup.number().nullable(),
});

const DiscussionReplyForm = ({
  onSubmit,
  replyTo,
  body = "",
}: DiscussionReplyProps) => {
  return (
    <Box width="full">
      {replyTo ? (
        <Box bg="whatsapp.500" px={3} py={1} rounded="md">
          <Text fontWeight="bold">
            Replying to: {replyTo?.user.displayName}
          </Text>
        </Box>
      ) : null}
      <Formik<DiscussionPostForm>
        initialValues={{
          body,
          originalPostID: replyTo?.id ?? null,
        }}
        onSubmit={onSubmit}
        validationSchema={replySchema}
      >
        {({ isSubmitting, setFieldValue, values, errors }) => (
          <Form>
            <Field name="body">
              {() => (
                <Editor
                  content={body}
                  onChange={(value) => setFieldValue("body", value)}
                />
              )}
            </Field>
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={Boolean(errors.body)}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default DiscussionReplyForm;
