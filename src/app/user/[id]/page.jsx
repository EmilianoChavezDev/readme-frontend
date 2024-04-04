"use client";
import Layout from "@/components/common/Layout";

import useUserInfo from "@/hooks/useUser";
import React, { useEffect } from "react";
import ProfileInfoCard from "../../../components/users/ProfileInfoCard";

const page = ({ params }) => {
  const { getUserInformation, data } = useUserInfo();

  useEffect(() => {
    getUserInformation(params.id);
  }, []);
  return (
    <div>
      <Layout>
        <ProfileInfoCard />
      </Layout>
    </div>
  );
};

export default page;
