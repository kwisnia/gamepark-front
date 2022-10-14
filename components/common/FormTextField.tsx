import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputProps,
} from "@chakra-ui/react";
import * as React from "react";
import { useField } from "formik";

interface Props {
  name: string;
  label: string;
  description?: string;
}

const FormTextField = ({
  label,
  name,
  description,
  ...rest
}: Props & InputProps) => {
  const [field, meta] = useField(name);
  return (
    <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input {...field} {...rest} id={name} placeholder={label} />
      <FormHelperText>{description}</FormHelperText>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormTextField;
