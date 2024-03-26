import React, { useState, useEffect } from "react";
import {
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";

export default function Date({ fechaNacimiento }) {
  const [date, setDate] = useState(fechaNacimiento);

  useEffect(() => {
    setDate(fechaNacimiento);
  }, [fechaNacimiento]);

  const formatDate = (date) => {
    return date ? format(date, "dd-MMM-yyyy", { locale: es }) : "";
  };

  return (
    <div className="w-72">
      <Popover placement="bottom">
        <PopoverHandler>
          <Input
            label="Fecha de nacimiento"
            onChange={(e) => setDate(e.target.value)}
            value={formatDate(fechaNacimiento)}
          />
        </PopoverHandler>
        <PopoverContent>
          <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
            showOutsideDays
            locale={es}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
