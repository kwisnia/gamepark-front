import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikHelpers, FieldProps } from "formik";
import { createList, updateList } from "../../api/ListApi";
import Modal from "../common/Modal";
import * as yup from "yup";
import { useMemo } from "react";
import { KeyedMutator } from "swr";
import { GameList, GameListDetails } from "../../types/lists";
import FormTextField from "../common/FormTextField";

interface Props {
  open: boolean;
  onClose: () => void;
}

interface CreateProps extends Props {
  mode: "create";
  mutate: KeyedMutator<GameList[]>;
}

interface EditProps extends Props {
  mode: "edit";
  listId: number;
  initialName: string;
  initialDescription: string;
  mutate: KeyedMutator<GameListDetails>;
}

type ModalProps = CreateProps | EditProps;

interface ListForm {
  name: string;
  description: string;
}

const listCreateSchema = yup.object().shape({
  name: yup
    .string()
    .max(100, "Name cannot be longer than 100 characters")
    .required("Name is required"),
  description: yup
    .string()
    .max(350, "Description cannot be longer than 350 characters"),
});

const ListCreateModal = (props: ModalProps) => {
  const { onClose, open, mode, mutate } = props;
  const toast = useToast();

  const initialValues = useMemo<ListForm>(() => {
    if (mode === "create") {
      return {
        name: "",
        description: "",
      };
    } else {
      return {
        name: props.initialName,
        description: props.initialDescription,
      };
    }
  }, [mode, props]);

  const submit = async (
    values: ListForm,
    { setSubmitting }: FormikHelpers<ListForm>
  ) => {
    if (mode === "create") {
      await createList(values.name, values.description);
      toast({
        title: "List created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      await updateList(props.listId, values.name, values.description);
      toast({
        title: "List updated",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    mutate();
    setSubmitting(false);
    onClose();
  };
  return (
    <Modal isOpen={open} onRequestClose={onClose}>
      <ModalContent bg="gray.700">
        <ModalCloseButton />
        <ModalHeader>
          {mode[0].toUpperCase() + mode.substring(1)} a list
        </ModalHeader>
        <Formik
          initialValues={initialValues}
          onSubmit={submit}
          validationSchema={listCreateSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <ModalBody>
                <FormTextField name="name" label="Name" />
                <FormTextField name="description" label="Description" />
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button
                  colorScheme="green"
                  type="submit"
                  isLoading={isSubmitting}
                >
                  Save
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default ListCreateModal;
