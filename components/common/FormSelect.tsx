import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import type { SelectProps } from "@chakra-ui/react";
import { useField } from "formik";
import type { SelectOption } from "../../types/common";

interface FormSelectProps {
  name: string;
  type: "number" | "string";
  label: string;
  description?: string;
  options: SelectOption[];
}

const FormSelect = ({
  name,
  type,
  label,
  description,
  options,
  ...rest
}: FormSelectProps & SelectProps) => {
  const [field, meta, helpers] = useField({
    name,
    type,
  });

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (type === "number") {
      helpers.setValue(parseInt(value));
    } else {
      helpers.setValue(value);
    }
  };

  return (
    <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Select {...field} {...rest} id={name} onChange={onChange}>
        {options.length ? (
          options.map((option) => (
            <option
              key={`${option.label}-${option.value}`}
              value={option.value}
            >
              {option.label}
            </option>
          ))
        ) : (
          <option disabled selected>
            Unknown
          </option>
        )}
      </Select>
      <FormHelperText>{description}</FormHelperText>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormSelect;
