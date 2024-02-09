import { User } from "@/types";
import getResponse from "@/utils/getResponse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get('course_id')
  let users: User[] = await prisma.user.findMany() as User[];
  if (courseId) users = await prisma.user.findMany({
    where: {
      user_course: {
        some: {
          course_id: +courseId
        }
      }
    }
  }) as User[];

  return getResponse(users, 'success get all users', 200);
}