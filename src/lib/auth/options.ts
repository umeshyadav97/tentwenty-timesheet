import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyDemoCredentials } from "@/lib/auth/credentials";
import { parseLoginCredentials } from "@/lib/validations/login";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = parseLoginCredentials(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        return verifyDemoCredentials(parsedCredentials.data);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? "tentwenty-dev-secret-change-me",
  session: {
    strategy: "jwt",
  },
};
