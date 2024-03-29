import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import type { InputProps } from "@chakra-ui/react";
import { useField } from "formik";

interface FormTextFieldProps {
  name: string;
  label: string;
  description?: string;
}

const FormTextField = ({
  label,
  name,
  description,
  ...rest
}: FormTextFieldProps & InputProps) => {
  const [field, meta] = useField(name);
  return (
    <FormControl isInvalid={Boolean(meta.error && meta.touched)} my={2}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <FormHelperText mt={-1} mb={1}>
        {description}
      </FormHelperText>
      <Input {...field} {...rest} id={name} placeholder={label} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormTextField;
