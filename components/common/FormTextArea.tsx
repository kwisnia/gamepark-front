import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import * as React from "react";
import { useField } from "formik";

interface Props {
  name: string;
  label: string;
}

const FormTextArea = ({ label, name, ...rest }: Props & TextareaProps) => {
  const [field, meta] = useField(name);

  return (
    <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Textarea {...field} {...rest} id={name} placeholder={label} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormTextArea;
