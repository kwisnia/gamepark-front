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
    <div className="flex flex-col">
      <label className="text-white">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-600 p-2 rounded-md my-2"
        required={required}
      />
    </div>
  );
};

export default TextField;
