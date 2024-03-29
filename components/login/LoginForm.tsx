import {
  Button,
  Center,
  ModalBody,
  ModalFooter,
  Text,
  useToast,
} from "@chakra-ui/react";
import { login } from "../../api/UserApi";
import {
  LoginModalTypes,
  useLoginModal,
} from "../../contexts/LoginModalContext";
import * as yup from "yup";
import { Form, Formik, FormikHelpers } from "formik";
import FormTextField from "../common/FormTextField";

interface LoginFormProps {
  mutate: () => void;
  onRequestClose: () => void;
}

interface LoginForm {
  username: string;
  password: string;
}

const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required").max(50),
});

const LoginForm = ({ mutate, onRequestClose }: LoginFormProps) => {
  const { setFormType } = useLoginModal();
  const toast = useToast();

  const submitLogin = async (
    values: LoginForm,
    { setSubmitting }: FormikHelpers<LoginForm>
  ) => {
    try {
      await login(values.username, values.password);
      mutate();
      onRequestClose();
    } catch (error) {
      if (!toast.isActive("login-error")) {
        toast({
          id: "login-error",
          title: "Login failed",
          description: "Invalid username or password",
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
        initialValues={{ username: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={submitLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <ModalBody>
              <FormTextField label="Username" name="username" />
              <FormTextField type="password" label="Password" name="password" />
              <Center>
                <Text paddingRight={1}>Don&apos;t have an account? </Text>
                <Button
                  variant="link"
                  onClick={() => {
                    setFormType(LoginModalTypes.Register);
                  }}
                >
                  Sign up!
                </Button>
              </Center>
            </ModalBody>
            <ModalFooter margin="auto">
              <Button type="submit" isLoading={isSubmitting}>
                Login
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
