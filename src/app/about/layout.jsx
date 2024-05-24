"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [paths, setPaths] = useState([
    {
      path: "/about/privacy_policy",
      name: "Política de Privacidad",
      show: true,
    },
    {
      path: "/about/terms_of_service",
      name: "Términos de Servicio",
      show: true,
    },
    { path: "/about/tecnologies", name: "Tecnologías", show: true },
    {
      path: "/about/faq",
      name: "Preguntas Frecuentes",
      show: true,
    },
    {
      path: "/about/about_us",
      name: "Acerca de Nosotros",
      show: true,
    },
  ]);

  const handleTabClick = (index) => {
    const tabElement = document.getElementById(`tab-${index}`);
  };

  return (
    <div className="relative flex flex-col gap-3 px-20 py-9 items-center">
      <div className="md:block hidden absolute left-0 top-0 -z-10">
        <Image
          src="/image/img_inicio.png"
          width={400}
          height={200}
          alt="Imagen de inicio"
        />
      </div>
      <h1 font-bold className="text-6xl font-bold pb-5 ">
        Centro de Privacidad
      </h1>
      <div className="flex justify-between h-10 items-center">
        <ul className="relative flex items-end">
          {paths?.map((tab, index) => (
            <Link href={tab.path} legacyBehavior key={index}>
              <li
                id={`tab-${index}`}
                className={`flex gap-1 px-3 pb-1 text-lg cursor-pointer hover:scale-105 transform transition-all duration-[0.2s] ease-[ease-in-out] ${
                  pathname.startsWith(tab.path)
                    ? "text-pastelOrange"
                    : "text-gray-700"
                } ${tab.show ? "flex" : "hidden"}`}
                onClick={() => handleTabClick(index)}
              >
                <span>{tab.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      {children}
    </div>
  );
}
