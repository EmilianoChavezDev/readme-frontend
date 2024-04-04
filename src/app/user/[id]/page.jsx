"use client";
import Layout from "@/components/common/Layout";

import useUserInfo from "@/hooks/useUser";
import React, { useEffect } from "react";
import { UserCard } from "../../../components/users/UserCard";

const page = ({ params }) => {
  const { getUserInformation, data } = useUserInfo();

  useEffect(() => {
    getUserInformation(params.id);
  }, []);

  const handleClick = () => {
    console.log("entro");
  };

  return (
    <div>

    </div>
  );
};

export default page;
