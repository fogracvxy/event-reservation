import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      first_name: string;
      last_name: string;
      role: string;
    };
  }

  interface User {
    id: string;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
  }
}
