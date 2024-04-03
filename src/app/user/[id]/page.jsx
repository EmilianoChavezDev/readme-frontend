"use client";
import Layout from "@/components/common/Layout";
import { UserCard } from "@/components/users/UserCard";
import useUserInfo from "@/hooks/useUser";
import React, { useEffect } from "react";

const page = ({ params }) => {
  const { getUserInformation, data } = useUserInfo();

  useEffect(() => {
    getUserInformation(params.id);
  }, []);
  return (
    <div>
      <Layout>
        hola
        <div className="mx-10">

        <UserCard nombre={data?.username} image={data?.profile} />
          </div>
      </Layout>
    </div>
  );
};

export default page;
