import { ModalCloseButton, ModalContent, ModalHeader } from "@chakra-ui/react";
import Modal from "../common/Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type LoginModalTypes = "Login" | "Register";

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  formType: LoginModalTypes;
  mutate: () => void;
}

const LoginModal = ({ isOpen, onRequestClose, formType, mutate }: Props) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <ModalContent bg="gray.700">
        <ModalHeader textAlign={"center"}>{formType}</ModalHeader>
        <ModalCloseButton />
        {formType === "Login" ? (
          <LoginForm mutate={mutate} onRequestClose={onRequestClose} />
        ) : (
          <RegisterForm mutate={mutate} onRequestClose={onRequestClose} />
        )}
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
