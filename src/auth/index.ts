import NextAuth, { NextAuthConfig } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { connectToDatabase } from "./helpers";

export const BASE_PATH = "/api/auth";

interface Credentials {
  username: string;
  password: string;
}

const authOptions: NextAuthConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          placeholder: "Enter your username",
        },
        password: {
          label: "Password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password)
          return null;

        await connectToDatabase();

        try {
          const user = await prisma.user.findFirst({
            where: {
              username: credentials.username,
            },
          });

          if (!user?.password) return null;

          // @ts-ignore
          const isValid = await compare(credentials.password, user.password);

          const userWithoutSensitiveFields = {
            id: user.id,
            name: user.username,
            email: user.email,
            image: user.profilePic,
          };

          return isValid ? userWithoutSensitiveFields : null;
        } catch (error) {
          console.error(error);
          return null;
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
