"use client";
import Layout from "@/components/common/Layout";

import useUserInfo from "@/hooks/useUser";
import React, { useEffect, useState } from "react";
import { UserCard } from "../../../components/users/UserCard";
import ProfileView from "../../../components/common/ProfileView";

const page = ({ params }) => {
  const { getUserInformation, data } = useUserInfo();

  useEffect(() => {
    getUserInformation(params.id);
  }, []);
  return (
    <div>
      <Layout>
        <ProfileView username={params.id} imagen={data?.profile} />
      </Layout>
    </div>
  );
};

export default page;
