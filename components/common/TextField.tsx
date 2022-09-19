import { FormControl, FormLabel, Input } from "@chakra-ui/react";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}

const TextField = ({
  label,
  value,
  onChange,
  type = "text",
  required,
}: TextFieldProps) => {
  return (
    <FormControl isRequired={required}>
      <FormLabel className="text-white">{label}</FormLabel>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        backgroundColor="gray.600"
        border={"none"}
      />
    </FormControl>
  );
};

export default TextField;
