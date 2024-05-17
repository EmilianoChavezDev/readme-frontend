import { Card, CardBody, Typography } from "@material-tailwind/react";
import { FaBirthdayCake, FaGlobe } from "react-icons/fa";
import { RiMapPin2Fill } from "react-icons/ri";
import { AiOutlinePaperClip } from "react-icons/ai";

import moment from "moment";
import "moment/locale/es";

export function ProfileInfoCard({
  direction,
  nacionalidad,
  birthday,
  createAt,
  description,
  social,
}) {
  // Función para convertir texto en enlaces
  const renderTextWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  return (
    <Card className="sm:h-96 lg:w-72 rounded-xl shadow-lg dark:bg-dark-darkColorNeutral">
      <CardBody className="h-full p-4">
        <div className="flex flex-col gap-y-4">
          {direction && nacionalidad && (
            <div className="flex items-center gap-2 flex-wrap">
              <RiMapPin2Fill size={18} />
              <span className="min-w-0 break-words">
                {direction + ", " + nacionalidad}
              </span>
            </div>
          )}
          {birthday && (
            <div className="flex items-center gap-2 flex-wrap">
              <FaBirthdayCake size={18} />
              <span className="min-w-0 break-words">
                {moment(birthday).format("MMMM DD, YYYY", { locale: "ES, es" })}
              </span>
            </div>
          )}
          {createAt && (
            <div className="flex items-center gap-1 flex-wrap">
              <span className="font-semibold">Se ha unido en</span>
              <span className="min-w-0 break-words">
                {moment(createAt).format("MMMM DD, YYYY", { locale: "ES, es" })}
              </span>
            </div>
          )}
          {description && (
            <div className="flex items-start gap-2 flex-wrap">
              <span className="flex mt-1">
                <AiOutlinePaperClip size={18} />
              </span>
              <span className="min-w-0 break-words">{description}</span>
            </div>
          )}
          {social && (
            <div className="flex items-start gap-2">
              <span className="flex mt-1">
                <FaGlobe size={18} />
              </span>
              <span className="min-w-0 break-words">
                {renderTextWithLinks(social)}
              </span>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
