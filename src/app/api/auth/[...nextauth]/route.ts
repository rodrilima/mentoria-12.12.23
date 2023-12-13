import { prisma } from "@/libs/prisma"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"

const handler = NextAuth({
  pages: {
    signIn: '/'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials, req) {
        if(!credentials?.email || !credentials.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if(!user || !user.password) {
          return null
        }

        const isValidPassword = bcrypt.compareSync(credentials.password, user.password)

        if(!isValidPassword) {
          return null
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.email
        }
      }
    })
  ]
})

export { handler as GET, handler as POST }