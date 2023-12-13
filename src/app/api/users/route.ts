import { prisma } from "@/libs/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      age: true,
      email: true
    }
  })

  return Response.json({
    data: users
  })
}