"use client";
import useUserInfo from "@/hooks/useUser";
import Link from "next/link";
import React from "react";
import { VscChevronRight } from "react-icons/vsc";


const page = () => {
  const { loading } = useUserInfo();

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

          <div>
            <div className="flex justify-between">
              <span>Mostrar tus datos personales</span>
            
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
