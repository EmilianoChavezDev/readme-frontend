import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

const AccordionField = ({ children }) => {
  return (
    <Accordion className="w-72" allowMultiple>
      <AccordionItem className="border-b border-gray-200 py-1 dark:!border-white/10">
        <h2>
          <AccordionButton className="flex justify-between">
            <span className="text-left text-sm dark:text-white ">
              ¿Deseas cambiar tu Contraseña?
            </span>
            <AccordionIcon className="text-left  dark:!text-white" />
          </AccordionButton>
        </h2>
        <AccordionPanel
          className="text-left text-medium mt-2  dark:!text-white"
          pb={4}
        >
          {children}
        </AccordionPanel>
      </AccordionItem>{" "}
    </Accordion>
  );
};

export default AccordionField;
