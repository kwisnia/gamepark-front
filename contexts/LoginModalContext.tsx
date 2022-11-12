import { useDisclosure } from "@chakra-ui/react";
import { createContext, useContext, useState } from "react";
import invariant from "tiny-invariant";
import LoginModal from "../components/login/LoginModal";
import useLoggedInUser from "../hooks/useLoggedInUser";

export enum LoginModalTypes {
  Login = "Login",
  Register = "Register",
}

interface LoginModalContextData {
  openModal: () => void;
  closeModal: () => void;
  setFormType: (formType: LoginModalTypes) => void;
}

interface Props {
  children: React.ReactNode;
}

export const LoginModalContext = createContext<
  LoginModalContextData | undefined
>(undefined);

export const LoginModalProvider = ({ children }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formType, setFormType] = useState<LoginModalTypes>(
    LoginModalTypes.Login
  );
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
  invariant(
    context !== undefined,
    "useLoginModal must be used within LoginModalProvider"
  );
  return context;
};
