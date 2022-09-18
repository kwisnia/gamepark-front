import { useState } from "react";
import { useTransition } from "react-spring";
import Modal from "../common/Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type LoginModalTypes = "login" | "register";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  initialState: LoginModalTypes;
  mutate: () => void;
}

const LoginModal = ({
  isOpen,
  onRequestClose,
  initialState,
  mutate,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} closeTimeoutMS={500}>
      {initialState === "login" ? (
        <LoginForm mutate={mutate} onRequestClose={onRequestClose} />
      ) : (
        <RegisterForm mutate={mutate} onRequestClose={onRequestClose} />
      )}
    </Modal>
  );
};

export default LoginModal;
