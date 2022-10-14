import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  TextareaProps,
} from "@chakra-ui/react";
import * as React from "react";
import { Field, FieldProps } from "formik";

interface Props {
  name: string;
  label: string;
}

const FormTextArea = ({ label, name, ...rest }: Props & TextareaProps) => {
  return (
    <Field>
      {({ field, form }: FieldProps<string, any>) => (
        <FormControl
          isInvalid={Boolean(form.errors[name] && form.touched[name])}
        >
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <Textarea {...field} {...rest} id={name} placeholder={label} />
          <FormErrorMessage>{form.errors[name] as string}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default FormTextArea;
