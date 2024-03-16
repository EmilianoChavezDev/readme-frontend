import React from "react";

const UsernameInput = ({
  isFocused,
  usernameValue,
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
        isFocused || usernameValue ? styles.active : styles.noactive
      }`}
    >
      <label className={`${isFocused || usernameValue ? styles.active : ""}`}>
        {placeholder}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        {...register(date, {
          required: message,
        })}
        onBlur={() => {
          trigger(date);
          handleBlur();
        }}
        onFocus={handleFocus}
      />
      {errors?.username && (
        <div className={styles.errors}>{errors.username.message}</div>
      )}
    </div>
  );
};

export default UsernameInput;
