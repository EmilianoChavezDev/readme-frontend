import { Input } from "@material-tailwind/react";

const InputField = ({
  label,
  type,
  onBlur,
  register,
  name,
  required,
  className = "",
}) => {
  return (
    <div className={`w-72`}>
      <Input
        label={label}
        type={type}
        onBlur={onBlur}
        {...register(name, { required })}
        className={`${className}`}
      />
    </div>
  );
};

export default InputField;
