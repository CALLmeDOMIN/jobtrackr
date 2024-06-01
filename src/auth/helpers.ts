"use server";

import { signIn as SignIn, signOut as SignOut } from ".";

const signIn = async () => {
  await SignIn();
};

const signOut = async () => {
  await SignOut();
};

export { signIn, signOut };
