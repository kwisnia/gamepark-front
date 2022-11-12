import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import type { CheckboxProps } from "@chakra-ui/react";
import { useField } from "formik";

interface FormCheckboxProps {
  name: string;
  label: string;
  description?: string;
}

const FormCheckbox = ({
  label,
  name,
  description,
  ...rest
}: FormCheckboxProps & CheckboxProps) => {
  const [field, meta] = useField(name);
  return (
    <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
      <Checkbox {...field} {...rest} id={name} placeholder={label}>
        {label}
      </Checkbox>
      <FormHelperText>{description}</FormHelperText>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormCheckbox;
