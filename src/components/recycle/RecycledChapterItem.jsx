import { Button, Typography } from "@material-tailwind/react";
import useRecycle from "@/hooks/useRecycle";
import toast from "react-hot-toast";

const RecycledBookItem = ({ chapters }) => {
  const { restoreChatper, isLoading } = useRecycle();

  const handleRestore = async () => {
    await restoreChatper(chapters.id);
    toast.success("Libro restaurado con éxito");
  };
  return (
    <div className="flex justify-between bg-buttonColorGray shadow-lg p-2 gap-4">
      <div className="flex gap-3">
        <div className="col-span-12 _md:col-span-7">
          <div className="flex flex-col">
            <div>hola bb</div>
            <div>
              <Typography variant="h5" color="blue-gray">
                {chapters.titulo}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 _md:col-span-3 flex justify-end gap-3 items-end text-nowrap">
        <Button
          size="sm"
          className="bg-gray-700 capitalize"
          onClick={handleRestore}
          disabled={isLoading}
        >
          Restaurar
        </Button>
      </div>
    </div>
  );
};

export default RecycledBookItem;
