import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";
import LoginModal from "../components/login/LoginModal";
import useLoggedInUser from "../hooks/useLoggedInUser";

interface LoginModalContextData {
  openModal: () => void;
  closeModal: () => void;
  setFormType: (formType: "Login" | "Register") => void;
}

interface Props {
  children: React.ReactNode;
}

export const LoginModalContext = createContext<LoginModalContextData>({
  openModal: () => {},
  closeModal: () => {},
  setFormType: () => {},
});

export const LoginModalProvider = ({ children }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formType, setFormType] = useState<"Login" | "Register">("Login");
  const { mutate } = useLoggedInUser();

  return (
    <LoginModalContext.Provider
      value={{ openModal: onOpen, closeModal: onClose, setFormType }}
    >
      {children}
      {isOpen ? (
        <LoginModal formType={formType} isOpen={isOpen} mutate={mutate} />
      ) : null}
    </LoginModalContext.Provider>
  );
};

export const useLoginModal = () => {
  const context = useContext(LoginModalContext);
  if (!context) {
    throw new Error("useLoginModal must be used within LoginModalProvider");
  }
  return context;
};
