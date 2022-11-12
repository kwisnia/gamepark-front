import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import type { TextareaProps } from "@chakra-ui/react";
import { useField } from "formik";

interface FormTextAreaProps {
  name: string;
  label: string;
}

const FormTextArea = ({ label, name, ...rest }: FormTextAreaProps & TextareaProps) => {
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
