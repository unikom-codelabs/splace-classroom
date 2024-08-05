import getResponse from "@/utils/getResponse";
import getSessionUser from "@/utils/session";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function GET(req: Request, { params }: any) {
  const { id, u_id } = params;
  const session = await getSessionUser();
  const userQuiz = await prisma.user_quiz.findFirst({
    where: {
      quiz_id: +id,
      user_id: +u_id,
    },
    include: {
      users: {
        select: {
          name: true,
          username: true,
          id: true,
        },
      },
      quiz: {
        select: {
          questions: true,
        },
      },
    },
  });
  const quiz = userQuiz?.quiz.questions.map((q) => {
    const quizAnswer = userQuiz?.answer as any;
    return {
      ...quizAnswer?.find((uq: any) => uq.id === q.id),
      true_answer: q.answer,
      title: q.title,
      choices: q.choices,
      type: q.type,
    };
  });

  const correctAnswer = quiz?.map((q, index) => {
    const answerOfQuestion: any[] = q.answer as any[];
    const trueAnswer: any[] = q.true_answer as any[];

    const isCorrect =
      answerOfQuestion?.filter((a: any) => trueAnswer?.includes(a)).length ===
      trueAnswer?.length;

    return {
      ...q,
      isCorrect: isCorrect,
    };
  });

  const wrongAnswer = correctAnswer?.filter((c) => !c.isCorrect).length;

  const course = await prisma.quiz.findUnique({
    where: {
      id: +id,
    },
    select: {
      course: true,
    },
  });

  return getResponse(
    {
      id: userQuiz?.id,
      course_name: course?.course.name,
      user_id: userQuiz?.user_id,
      username: userQuiz?.users.username,
      name: userQuiz?.users.name,
      correct_answer: correctAnswer?.filter((c) => c.isCorrect).length || 0,
      wrong_answer: wrongAnswer || 0,
      quiz: quiz,
      score: userQuiz?.score,
      duration: userQuiz?.duration,
      created_at: userQuiz?.createdAt,
      updated_at: userQuiz?.updatedAt,
    },
    "success get quiz",
    200
  );
}
