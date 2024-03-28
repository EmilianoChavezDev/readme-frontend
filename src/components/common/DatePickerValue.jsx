import * as React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickerValue({ label, value, selected, onSelect }) {
  const [internalValue, setInternalValue] = React.useState(dayjs(value));

  // Actualiza el estado interno cuando cambia la prop "value"
  React.useEffect(() => {
    setInternalValue(dayjs(value));
  }, [value]);

  const handleDateChange = (newValue) => {
    onSelect(newValue); // Llama a la función onSelect pasada como prop
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={internalValue}
        onChange={setInternalValue} // Establece el estado interno al cambiar la fecha
        onClose={handleDateChange} // Llama a la función handleDateChange cuando se cierra el selector de fecha
      />
    </LocalizationProvider>
  );
}
