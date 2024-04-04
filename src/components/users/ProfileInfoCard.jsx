import { Card, CardBody, Typography } from "@material-tailwind/react";
import { FaBirthdayCake } from "react-icons/fa";
import { RiMapPin2Fill } from "react-icons/ri";
import { AiOutlinePaperClip } from "react-icons/ai";

export function ProfileInfoCard({
  direction,
  birthday,
  createAt,
  description,
}) {
  return (
    <Card className="_sm:w-80 _sm:h-96 w-72 rounded-xl shadow-lg">
      <CardBody>
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center gap-2">
            <RiMapPin2Fill size={18} />
            <span>{direction}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBirthdayCake size={18} />
            <span>{birthday}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-semibold">Se ha unido</span>
            {createAt}
          </div>
          <div className="flex items-start gap-2">
            <span className="flex mt-1">
              <AiOutlinePaperClip size={18} />
            </span>
            <span>{description}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
