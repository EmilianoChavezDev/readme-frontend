import React from "react";

const EmailInput = ({
  isFocused,
  emailValue,
  styles,
  register,
  trigger,
  handleBlur,
  handleFocus,
  errors,
  placeholder,
  date,
  message,
}) => {
  return (
    <div
      className={`${styles.content_title_correo} ${
        isFocused || emailValue ? styles.active : styles.noactive
      }`}
    >
      <label className={`${isFocused || emailValue ? styles.active : ""}`}>
        {placeholder}
      </label>
      <input
        type="email"
        placeholder={placeholder}
        {...register(date, {
          required: message,
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Ingrese el email en un formato correcto',
          },
        })}
        onBlur={() => {
          trigger(date);
          handleBlur();
        }}
        onFocus={handleFocus}
      />
      {errors?.email && (
        <div className={styles.errors}>{errors.email.message}</div>
      )}
    </div>
  );
};

export default EmailInput;
