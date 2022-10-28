import { ModalCloseButton, ModalContent, ModalHeader } from "@chakra-ui/react";
import { useLoginModal } from "../../contexts/LoginModalContext";
import Modal from "../common/Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type LoginModalTypes = "Login" | "Register";

interface Props {
  isOpen: boolean;
  formType: LoginModalTypes;
  mutate: () => void;
}

const LoginModal = ({ isOpen, formType, mutate }: Props) => {
  const { closeModal } = useLoginModal();
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal}>
      <ModalContent bg="gray.700">
        <ModalHeader textAlign={"center"}>{formType}</ModalHeader>
        <ModalCloseButton />
        {formType === "Login" ? (
          <LoginForm mutate={mutate} onRequestClose={closeModal} />
        ) : (
          <RegisterForm mutate={mutate} onRequestClose={closeModal} />
        )}
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
