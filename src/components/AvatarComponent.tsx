"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const AvatarComponent = () => {
  const { data } = useSession();

  return (
    <>
      {data && data?.user?.image ? (
        <Avatar>
          <AvatarImage src={data?.user?.image} />
          <AvatarFallback>{data?.user?.name}</AvatarFallback>
        </Avatar>
      ) : data && data.user?.name ? (
        <p> Hello, {data?.user?.name} </p>
      ) : null}
    </>
  );
};

export default AvatarComponent;
