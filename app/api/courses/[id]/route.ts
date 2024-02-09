import getResponse from '@/utils/getResponse';
import getSessionUser from '@/utils/session';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: any) {
  const { id } = params;
  const session = await getSessionUser();
  const coursesUser = await prisma.course.findUnique({
    where: {
      id: +id
    }, 
    include: {
      resource: true,
      quiz: {
        include: {
          user_quiz: true
        }
      },
      user_course: {
        select: {
          users: true
        }
      },
    }
  })
  const { resource, quiz, user_course } = coursesUser as any
  if(!session?.id) return getResponse(null, 'user not found', 400)
  const isQuizAnswered = quiz.map((quiz: any) => {
    const { user_quiz } = quiz
    quiz.isAnswered = user_quiz.find((user_quiz: any) => user_quiz.user_id === session.id) ? true : false
    return quiz
  })
  const courseIntructor = user_course.filter((item: any) => item.users.role === 'TEACHER')[0]
  const result = [...resource, ...isQuizAnswered];

  const resultSorted = result.sort((a:any,b:any)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    path: item.path,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    isAnswered: item.isAnswered
  }))
  return getResponse({name:coursesUser?.name, instructor:courseIntructor?.users?.name, module:resultSorted}, 'success get all courses', 200);

}