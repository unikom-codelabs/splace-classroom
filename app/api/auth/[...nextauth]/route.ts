import NextAuth from "next-auth"
import { PrismaClient } from '@prisma/client'
import CredentialsProvider from "next-auth/providers/credentials"
import {compareSync} from 'bcrypt-ts';
const prisma = new PrismaClient()
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", },
        password: {  label: "Password", type: "password" }
      },
      
      async authorize(credentials) {
        const { username, password }:any = credentials
        if (!username || !password) return null;
        const user = await prisma.user.findUnique({
          where: {
            username
          }
        })
        if(!user) throw new Error('Username And Password Not Match')
        
        const match = compareSync(password, user.password)
        if (!match) throw new Error('Username And Password Not Match ')
        return user as any
      },
      
    }),

    
  ],
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1 days
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      session.user.email= token.id as any
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET,

})

export { handler as GET, handler as POST }