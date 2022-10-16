import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import * as React from "react";
import { useField } from "formik";

interface Props {
  name: string;
  label: string;
  description?: string;
}

const FormCheckbox = ({
  label,
  name,
  description,
  ...rest
}: Props & CheckboxProps) => {
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
