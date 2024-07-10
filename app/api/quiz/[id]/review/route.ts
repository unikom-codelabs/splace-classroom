import { Answer, Quiz } from "@/types/quiz";
import getResponse from "@/utils/getResponse";
import getSessionUser from "@/utils/session";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
export async function POST(req: Request, { params }: any) {
  const { id } = params;
  const reviews: any = await req.json();

  const session = await getSessionUser();
  const userQuiz = await prisma.user_quiz.findFirst({
    where: {
      user_id: session?.id,
      quiz_id: +id
    }
  });

  if (!userQuiz) return getResponse(null, 'user quiz not found', 400);
  const userQuizAnswer = userQuiz.answer as Array<any>;
  let totalPoints = 0
  const userQuizReviewed = userQuizAnswer.map((q: any, index: number) => {
    const idMatched = reviews.find((r: any) => r.id == q.id) 

    if(idMatched) totalPoints+=idMatched.points
    return {
      ...q,
      point: idMatched? idMatched.points : 0,
      review: idMatched? idMatched.notes : ''
    }
  })
  const quizUpdated =await prisma.user_quiz.update({
    where: { id: userQuiz.id }, data: {

      answer: userQuizReviewed,
      score:totalPoints
    }
  })
  return getResponse(quizUpdated,"User Quiz Reviewed",200);
}