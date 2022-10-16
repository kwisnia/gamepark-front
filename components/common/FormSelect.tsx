import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select,
  SelectProps,
} from "@chakra-ui/react";
import { useField } from "formik";
import { SelectOption } from "../../types/common";

interface Props {
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
}: Props & SelectProps) => {
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
        {options.map((option) => (
          <option key={`${option.label}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      <FormHelperText>{description}</FormHelperText>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default FormSelect;
