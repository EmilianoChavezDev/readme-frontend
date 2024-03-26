import { Input } from "@material-tailwind/react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";

const DateField = ({ label, value, selected, onSelect }) => {
  return (
    <div className="w-72">
      <Popover placement="bottom">
        <PopoverHandler>
          <Input label={label} value={value} readOnly />
        </PopoverHandler>
        <PopoverContent>
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={onSelect}
            showOutsideDays
            locale={es}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateField;
