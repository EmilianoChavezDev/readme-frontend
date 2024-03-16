import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const PasswordInput = ({
  styles,
  isFocusedPassword,
  passwordValue,
  showPassword,
  errors,
  handleBlurPassword,
  handleFocusPassword,
  handleShowPassword,
  register,
  trigger,
  placeholder,
  date,
  message,
}) => {
  return (
    <div
      className={`${styles.content_password} ${
        isFocusedPassword || passwordValue ? styles.active : styles.noactive
      }`}
    >
      <label
        className={`${isFocusedPassword || passwordValue ? styles.active : ""}`}
      >
        {placeholder}
      </label>
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        {...register(date, { required: message })}
        onBlur={() => {
          trigger(date);
          handleBlurPassword();
        }}
        onFocus={handleFocusPassword}
      />
      {passwordValue && (
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          className={`${errors.password ? styles.eyes : styles.eye} fa fa-eye`}
          aria-hidden="true"
          onClick={handleShowPassword}
        />
      )}
      {errors?.password && (
        <div className={styles.errors}>{errors.password.message}</div>
      )}
    </div>
  );
};

export default PasswordInput;
