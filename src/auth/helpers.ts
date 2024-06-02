"use server";

import prisma from "@/lib/prisma";
import { signIn as SignIn, signOut as SignOut } from ".";

export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
  } catch (error) {
    console.log(error);
    throw new Error("Unable to connect to database");
  }
};

const signIn = async () => {
  await SignIn();
};

const signOut = async () => {
  await SignOut();
};

export { signIn, signOut };
