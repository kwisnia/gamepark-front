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
import { useState } from "react";
import { createList } from "../../api/ListApi";
import Modal from "../common/Modal";
import * as yup from "yup";

interface Props {
  open: boolean;
  onClose: () => void;
}

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

const initialValues: ListForm = {
  name: "",
  description: "",
};

const ListCreateModal = ({ open, onClose }: Props) => {
  const toast = useToast();

  const submit = async (
    values: ListForm,
    { setSubmitting }: FormikHelpers<ListForm>
  ) => {
    console.log("Halo");
    await createList(values.name, values.description);
    toast({
      title: "List created",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setSubmitting(false);
    onClose();
  };
  return (
    <Modal isOpen={open} onRequestClose={onClose}>
      <ModalContent bg="gray.700">
        <ModalCloseButton />
        <ModalHeader>Create a list</ModalHeader>
        <Formik
          initialValues={initialValues}
          onSubmit={submit}
          validationSchema={listCreateSchema}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <ModalBody>
                <Field name="name">
                  {({ field }: FieldProps<string, ListForm>) => (
                    <FormControl isInvalid={!!errors.name && touched.name}>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input {...field} id="name" placeholder="Name" />
                      <FormErrorMessage>{errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="description">
                  {({ field }: FieldProps<string, ListForm>) => (
                    <FormControl isInvalid={!!errors.description}>
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <Input
                        {...field}
                        id="description"
                        placeholder="Description"
                      />
                      <FormErrorMessage>{errors.description}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="ghost"
                  colorScheme="whiteAlpha"
                  mr={3}
                  onClick={onClose}
                >
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
