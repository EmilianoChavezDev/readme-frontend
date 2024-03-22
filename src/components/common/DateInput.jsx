
const DateInput = ({
  register,
  styles,
  isFocusedDate,
  dateValue,
  handleFocusDate,
  handleBlurDate,
}) => {
  return (
    <div
      className={`${styles.content_title_correo} ${styles.content_date} ${
        isFocusedDate || dateValue ? styles.active : styles.noactive
      }`}
    >
      <label className={`${isFocusedDate || dateValue ? styles.active : ""}`}>
        *Fecha de nacimiento
      </label>

      <input
        type="date"
        {...register("fecha_nacimiento", {
          required: "*Ingrese su fecha de nacimiento",
        })}
        onFocus={handleFocusDate}
        onBlur={handleBlurDate}
      />
    </div>
  );
};

export default DateInput;
