import { User } from '@/types';
import getResponse from '@/utils/getResponse';
import getSessionUser from '@/utils/session';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()
export async function GET(req: Request, response: Response) {
  const session: User |null= await getSessionUser();
  if (!session) return getResponse([], 'failed get all course, user must login', 200)
  const coursesUser = await prisma.course.findMany({
    where: {
      user_course: {
        some: {
          user_id: session?.id
        }
      }
    },
    include: { 
      user_course: {
        select: {
          users: true
      },
    }}
  })
  const result = coursesUser.map((item: any) => ({
    ...item,
    instructor:item.user_course.filter((user:any)=>user.users.role === 'TEACHER')[0].users.name,
  }))
  return getResponse(result, 'success get all courses', 200);
}
