import {
  Button,
  Center,
  Flex,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { login } from "../../api/UserApi";
import { LoginModalContext } from "../../contexts/LoginModalContext";
import TextField from "../common/TextField";

interface Props {
  mutate: () => void;
  onRequestClose: () => void;
}

const LoginForm = ({ mutate, onRequestClose }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setFormType } = useContext(LoginModalContext);

  const submitLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      mutate();
      onRequestClose();
    } catch (error) {
      setError("dupa");
    }
    setLoading(false);
  };

  return (
    <>
      <ModalBody>
        <TextField label="Email" value={email} onChange={setEmail} required />
        <TextField
          label="Password"
          value={password}
          onChange={setPassword}
          type="password"
          required
        />
        <Center>
          <Text paddingRight={1}>Don&apos;t have an account? </Text>
          <Button
            variant="link"
            onClick={() => {
              setFormType("Register");
            }}
          >
            Sign up!
          </Button>
        </Center>
      </ModalBody>
      <ModalFooter margin={"auto"}>
        <Button onClick={() => submitLogin()} disabled={loading}>
          Login
        </Button>
      </ModalFooter>
    </>
  );
};

export default LoginForm;
