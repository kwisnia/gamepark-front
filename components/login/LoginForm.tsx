import { useState } from "react";
import { animated } from "react-spring";
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
    <div>
      <h1 className="text-2xl font-extrabold text-center">Login</h1>
      <TextField label="Email" value={email} onChange={setEmail} required />
      <TextField
        label="Password"
        value={password}
        onChange={setPassword}
        type="password"
        required
      />
      <button
        className="bg-slate-600 text-white p-2 rounded-md m-2"
        onClick={() => submitLogin()}
        disabled={loading}
      >
        Login
      </button>
    </div>
  );
};

export default LoginForm;
