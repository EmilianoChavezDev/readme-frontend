"use client";
import useUserInfo from "@/hooks/useUser";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { VscChevronRight } from "react-icons/vsc";
import { Switch } from "@material-tailwind/react";
import Loader from "@/components/common/loader";

const Page = ({ params }) => {
  const { loading, updateVisibilidad, getUserInformation, data } =
    useUserInfo();
  const [isPersonalInfoVisible, setIsPersonalInfoVisible] = useState(false);
  const [isLecturasVisible, setIsLecturasVisible] = useState(false);
  const [isSeguidoresVisible, setIsSeguidoresVisible] = useState(false);
  const [isSeguidosVisible, setIsSeguidosVisible] = useState(false);

  useEffect(() => {
    getUserInformation(params.id);
  }, [params.id]);

  useEffect(() => {
    if (!data) return;
    setIsPersonalInfoVisible(data?.mostrar_datos_personales);
    setIsLecturasVisible(data?.mostrar_lecturas);
    setIsSeguidoresVisible(data?.mostrar_seguidores);
    setIsSeguidosVisible(data?.mostrar_seguidos);
  }, [data]);

  const handleSwitchChange = async (switchName, newValue) => {
    const updatedData = {
      mostrar_datos_personales:
        switchName === "mostrar_datos_personales"
          ? newValue
          : isPersonalInfoVisible,
      mostrar_lecturas:
        switchName === "mostrar_lecturas" ? newValue : isLecturasVisible,
      mostrar_seguidores:
        switchName === "mostrar_seguidores" ? newValue : isSeguidoresVisible,
      mostrar_seguidos:
        switchName === "mostrar_seguidos" ? newValue : isSeguidosVisible,
    };

    try {
      await updateVisibilidad(
        updatedData.mostrar_datos_personales,
        updatedData.mostrar_lecturas,
        updatedData.mostrar_seguidores,
        updatedData.mostrar_seguidos
      );

      if (switchName === "mostrar_datos_personales")
        setIsPersonalInfoVisible(newValue);
      if (switchName === "mostrar_lecturas") setIsLecturasVisible(newValue);
      if (switchName === "mostrar_seguidores") setIsSeguidoresVisible(newValue);
      if (switchName === "mostrar_seguidos") setIsSeguidosVisible(newValue);
    } catch (error) {}
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col _md:w-5/6 mx-auto w-full _md:py-9">
          <div className="flex flex-col gap-y-2 items-center justify-center _md:items-start">
            <div className="flex gap-2 items-center mt-4 _sm:mt-0">
              <Link href="/accounts" className="font-semibold text-gray-800">
                Cuenta
              </Link>
              <span>
                <VscChevronRight />
              </span>
              <span className="font-semibold text-gray-800">Privacidad</span>
            </div>
            <h1 className="text-textHeaderColorGray text-2xl font-bold text-nowrap ">
              Privacidad de la cuenta
            </h1>
          </div>

          <div className="flex flex-col mt-20 gap-y-4">
            <div className="flex justify-between rounded-lg border border-gray-100 hover:shadow-lg transition-all transform duration-300 w-full p-4">
              <div className="flex flex-col gap-y-2">
                <h4>Mostrar tus datos personales</h4>
                <span className="text-sm text-gray-700">
                  Decide si quieres que otros usuarios puedan ver tu información
                  personal en tu perfil.
                </span>
              </div>
              <Switch
                id="personal-info-switch"
                ripple={false}
                className="h-full w-full checked:bg-[#2ec946]"
                containerProps={{ className: "w-11 h-6" }}
                circleProps={{
                  className: "before:hidden left-0.5 border-none",
                }}
                checked={isPersonalInfoVisible}
                onChange={(e) =>
                  handleSwitchChange(
                    "mostrar_datos_personales",
                    e.target.checked
                  )
                }
              />
            </div>

            <div className="flex justify-between rounded-lg border border-gray-100 hover:shadow-lg transition-all transform duration-300 w-full p-4">
              <div className="flex flex-col gap-y-2">
                <h4>Mostrar tus lecturas</h4>
                <span className="text-sm text-gray-700">
                  Las personas podrán ver lo que lees en el apartado de tu
                  perfil.
                </span>
              </div>
              <Switch
                id="lecturas-switch"
                ripple={false}
                className="h-full w-full checked:bg-[#2ec946]"
                containerProps={{ className: "w-11 h-6" }}
                circleProps={{
                  className: "before:hidden left-0.5 border-none",
                }}
                checked={isLecturasVisible}
                onChange={(e) =>
                  handleSwitchChange("mostrar_lecturas", e.target.checked)
                }
              />
            </div>

            <div className="flex justify-between rounded-lg border border-gray-100 hover:shadow-lg transition-all transform duration-300 w-full p-4">
              <div className="flex flex-col gap-y-2">
                <h4>Mostrar tus seguidores</h4>
                <span className="text-sm text-gray-700">
                  Decide si quieres que otros usuarios puedan ver la lista de
                  tus seguidores en tu perfil.
                </span>
              </div>
              <Switch
                id="seguidores-switch"
                ripple={false}
                className="h-full w-full checked:bg-[#2ec946]"
                containerProps={{ className: "w-11 h-6" }}
                circleProps={{
                  className: "before:hidden left-0.5 border-none",
                }}
                checked={isSeguidoresVisible}
                onChange={(e) =>
                  handleSwitchChange("mostrar_seguidores", e.target.checked)
                }
              />
            </div>

            <div className="flex justify-between rounded-lg border border-gray-100 hover:shadow-lg transition-all transform duration-300 w-full p-4">
              <div className="flex flex-col gap-y-2">
                <h4>Mostrar a quienes sigues</h4>
                <span className="text-sm text-gray-700">
                  Controla si otros usuarios pueden ver la lista de personas a
                  las que sigues en tu perfil.
                </span>
              </div>
              <Switch
                id="seguidos-switch"
                ripple={false}
                className="h-full w-full checked:bg-[#2ec946]"
                containerProps={{ className: "w-11 h-6" }}
                circleProps={{
                  className: "before:hidden left-0.5 border-none",
                }}
                checked={isSeguidosVisible}
                onChange={(e) =>
                  handleSwitchChange("mostrar_seguidos", e.target.checked)
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
