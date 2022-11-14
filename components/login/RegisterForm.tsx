import { Button, ModalBody, ModalFooter, useToast } from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import { register } from "../../api/UserApi";
import FormTextField from "../common/FormTextField";
import * as yup from "yup";
import zxcvbn from "zxcvbn";

interface RegisterFormProps {
  mutate: () => void;
  onRequestClose: () => void;
}

interface RegisterForm {
  username: string;
  displayName: string;
  password: string;
  confirmPassword: string;
}

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters"),
  displayName: yup
    .string()
    .required("Display name is required")
    .min(3, "Display name must be at least 3 characters")
    .max(30, "Display name must be at most 30 characters"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters")
    .test("passwordStrength", function (value) {
      const { path, createError } = this;
      const passwordStrength = zxcvbn(value ?? "");
      return passwordStrength.score < 3
        ? createError({ path, message: passwordStrength.feedback.warning })
        : true;
    }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const RegisterForm = ({ mutate, onRequestClose }: RegisterFormProps) => {
  const toast = useToast();

  const submitRegister = async (
    values: RegisterForm,
    { setSubmitting }: FormikHelpers<RegisterForm>
  ) => {
    try {
      await register(values.username, values.password, values.displayName);
      mutate();
      onRequestClose();
    } catch (error) {
      if (!toast.isActive("register-error")) {
        toast({
          id: "register-error",
          title: "Registration failed",
          description: "Invalid username",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          displayName: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerSchema}
        onSubmit={submitRegister}
      >
        {({ isSubmitting }) => (
          <Form>
            <ModalBody>
              <FormTextField
                label="Username"
                name="username"
                description="Name that will be used to identify you throughout the site"
              />
              <FormTextField
                label="Display name"
                name="displayName"
                description="Name that will be displayed to other users"
              />
              <FormTextField label="Username" name="username" />
              <FormTextField label="Password" name="password" type="password" />
              <FormTextField
                label="Confirm password"
                name="confirmPassword"
                type="password"
              />
            </ModalBody>
            <ModalFooter margin="auto">
              <Button
                colorScheme={"blue"}
                type="submit"
                isLoading={isSubmitting}
              >
                Register
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterForm;
