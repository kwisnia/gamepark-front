import { Modal as ChakraModal, ModalOverlay } from "@chakra-ui/react";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
}

const Modal = ({
  children,
  isOpen,
  onRequestClose,
  size = "md",
}: ModalProps) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onRequestClose}
      size={size}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      {children}
    </ChakraModal>
  );
};

export default Modal;
