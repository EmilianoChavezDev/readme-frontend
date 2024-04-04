"use client";
import Layout from "@/components/common/Layout";

import useUserInfo from "@/hooks/useUser";
import React, { useEffect } from "react";
import UserOption from "../../../components/users/UserOption";

const page = ({ params }) => {
  const { getUserInformation, data } = useUserInfo();

  useEffect(() => {
    getUserInformation(params.id);
  }, []);
  return (
    <div>
      <Layout>
        <UserOption isOwner={false} isFollow={true} />
      </Layout>
    </div>
  );
};

export default page;
