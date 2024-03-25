import { Input } from "@material-tailwind/react";

export function InputAccount({ placeholder, value, trigger, register, date }) {
  return (
    <div className="_lg:w-72">
      <Input
        label={placeholder}
        value={value}
        type="text"
        onBlur={() => trigger(date)}
        onChange={(e) => register(e.target.value)}
      />
    </div>
  );
}
