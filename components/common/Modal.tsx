import { Modal as ChakraModal, ModalOverlay } from "@chakra-ui/react";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onRequestClose: () => void;
}

const Modal = ({ children, isOpen, onRequestClose }: ModalProps) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onRequestClose}>
      <ModalOverlay />
      {children}
    </ChakraModal>
  );
};

export default Modal;
