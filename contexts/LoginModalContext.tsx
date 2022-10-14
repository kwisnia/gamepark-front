import { createContext, useState } from "react";
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formType, setFormType] = useState<"Login" | "Register">("Login");
  const { mutate } = useLoggedInUser();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <LoginModalContext.Provider value={{ openModal, closeModal, setFormType }}>
      {children}
      {isModalOpen ? (
        <LoginModal formType={formType} isOpen={isModalOpen} mutate={mutate} />
      ) : null}
    </LoginModalContext.Provider>
  );
};
