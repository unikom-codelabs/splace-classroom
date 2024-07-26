import { Answer, Quiz } from "@/types/quiz";
import getResponse from "@/utils/getResponse";
import getSessionUser from "@/utils/session";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export async function GET(req: Request, { params }: any) {
  const { id,u_id } = params;
  const session = await getSessionUser();
  const userQuiz = await prisma.user_quiz.findFirst({
    where: {
      quiz_id: +id,
      user_id: +u_id

    },
    include: {
      users: {
        select: {
          name: true,
          username: true,
          id: true
        }
      },
      quiz: {
        select: {
          questions:true
        }
      }
    },
  })
  const quiz = userQuiz?.quiz.questions.map((q) => {
    const quizAnswer = userQuiz?.answer as any
    return {
      ...quizAnswer?.find((uq: any) => uq.id === q.id),
      true_answer: q.answer,
      title: q.title,
      choices: q.choices,
    };
  })
  
  return getResponse(
		{
			id: userQuiz?.id,
			user: userQuiz?.users,
			quiz: quiz,
			score: userQuiz?.score,
			duration: userQuiz?.duration,
      created_at: userQuiz?.createdAt,
      updated_at: userQuiz?.updatedAt
		},
		"success get quiz",
		200
  );
}
