"use client";

import React from "react";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "../../auth/helpers";

const AuthButtonClient = () => {
  const session = useSession();

  return session?.data?.user ? (
    <Button
      onClick={async () => {
        await signOut();
        await signIn();
      }}
    >
      Sign out
    </Button>
  ) : (
    <Button onClick={async () => await signIn()}>Sign in</Button>
  );
};

export default AuthButtonClient;
