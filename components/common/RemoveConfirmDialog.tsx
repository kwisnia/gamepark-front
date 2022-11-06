import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useBoolean,
} from "@chakra-ui/react";
import { useRef } from "react";

interface RemoveConfirmDialogProps {
  header: string;
  isOpen: boolean;
  onClose: () => void;
  confirmAction: () => void;
}

const RemoveConfirmDialog = ({
  header,
  isOpen,
  onClose,
  confirmAction,
}: RemoveConfirmDialogProps) => {
  const cancelRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useBoolean();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {header}
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can&apos;t undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              isLoading={isSubmitting}
              onClick={() => {
                try {
                  setIsSubmitting.on();
                  confirmAction();
                } catch (e) {
                  setIsSubmitting.off();
                }
              }}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default RemoveConfirmDialog;
