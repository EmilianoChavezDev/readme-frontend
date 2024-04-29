import { Input } from "@material-tailwind/react";

const InputField = ({
  label,
  type,
  onBlur,
  register,
  name,
  required,
  value,
  className = "",
}) => {
  return (
    <div className={`w-72`}>
      <Input
        label={label}
        type={type}
        onBlur={onBlur}
        value={value}
        {...register(name, { required })}
        className={`${className}`}
      />
    </div>
  );
};

export default InputField;
