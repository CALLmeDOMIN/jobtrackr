import React from "react";
import { auth, BASE_PATH } from "../../auth";
import AuthButtonClient from "./AuthButton.client";
import { SessionProvider } from "next-auth/react";

const AuthButton = async () => {
  const session = await auth();

  if (session && session.user) {
    session.user = {
      name: session.user.name,
      email: session.user.email,
    };
  }

  return (
    <SessionProvider basePath={BASE_PATH} session={session}>
      <AuthButtonClient />
    </SessionProvider>
  );
};

export default AuthButton;
