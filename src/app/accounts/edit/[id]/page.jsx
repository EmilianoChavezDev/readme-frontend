import React from "react";

const page = ({ params }) => {
  console.log(params);
  return <div>{params}</div>;
};

export default page;
