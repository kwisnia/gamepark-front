import {
  Button,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useState } from "react";
import { login } from "../../api/UserApi";
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
