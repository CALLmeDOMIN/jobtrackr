import NextAuth, { User, NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  providers: [
    Github,
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        const users = [
          {
            id: "1",
            name: "admin",
            email: "admin@admin.com",
            username: "admin",
            password: "admin",
          },
          {
            id: "2",
            name: "user",
            email: "user@user.com",
            username: "user",
            password: "user",
          },
        ];
        const user = users.find(
          (user) =>
            user.username === credentials.username &&
            user.password === credentials.password
        );
        return user
          ? { id: user.id, name: user.name, email: user.email }
          : null;
      },
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.AUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
