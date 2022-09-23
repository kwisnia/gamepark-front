import { Button, ModalBody } from "@chakra-ui/react";
import { useState } from "react";
import { register } from "../../api/UserApi";
import TextField from "../common/TextField";

interface Props {
  mutate: () => void;
  onRequestClose: () => void;
}

const RegisterForm = ({ mutate, onRequestClose }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submitRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await register(email, password, userName);
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
        <TextField label="Username" onChange={setUserName} value={userName} />
        <TextField label="Email" onChange={setEmail} value={email} />
        <TextField
          label="Password"
          onChange={setPassword}
          value={password}
          type="password"
        />
        <TextField
          label="Confirm password"
          onChange={setConfirmPassword}
          value={confirmPassword}
          type="password"
        />
      </ModalBody>
      <Button
        colorScheme={"blue"}
        onClick={() => submitRegister()}
        isLoading={loading}
        loadingText={"Submitting"}
      >
        Register
      </Button>
    </>
  );
};

export default RegisterForm;
