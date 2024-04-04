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
      <Layout>
        <div className="flex items-center justify-center">
          <UserCard
            username={params?.id}
            nombre={data?.username}
            image={data?.profile}
            description={"lorem insup"}
            buttonProps={{
              info: "Follow",
              onClick: handleClick,
            }}
          />
        </div>
      </Layout>
    </div>
  );
};

export default page;
