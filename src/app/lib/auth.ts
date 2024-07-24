import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user_auth.findUnique({
          where: { username: credentials?.username },
        });

        if (user && credentials?.password) {
          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password_hash
          );

          if (isValidPassword) {
            return {
              id: user.user_id.toString(),
              username: user.username,
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("User object in JWT callback:", user);
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.first_name = user.first_name;
        token.last_name = user.last_name;
        token.role = user.role;
      }
      console.log("Token object in JWT callback:", token);
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        console.log("Session user object in session callback:", session.user);
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.email = token.email as string;
        session.user.first_name = token.first_name as string;
        session.user.last_name = token.last_name as string;
        session.user.role = token.role as string;
      }
      console.log("Session object in session callback:", session);
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
