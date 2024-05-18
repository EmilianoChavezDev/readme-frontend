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
  maxLength,
  onChange
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
        aria-label={label}
        maxLength={maxLength}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
