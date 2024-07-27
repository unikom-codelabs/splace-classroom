import { Answer, Quiz } from "@/types/quiz";
import getResponse from "@/utils/getResponse";
import getSessionUser from "@/utils/session";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export async function POST(req: Request, { params }: any) {
  const session = await getSessionUser();
  const { answers, duration }: any = await req.json();

  const { id } = params;
  if (!answers) return getResponse(null, "answers is required", 400);
  const isAlreadyAnswered = await prisma.user_quiz.findFirst({
    where: {
      user_id: session?.id,
      quiz_id: +id,
    },
  });
  // if (isAlreadyAnswered) return getResponse(null, "user already answered this quiz", 400)
  const quiz = await prisma.quiz.findUnique({
    where: {
      id: +id,
    },
    select: { questions: true },
  });
  if (!quiz) return getResponse(null, "quiz not found", 404);
  if (quiz.questions.length !== answers.length)
    return getResponse(null, "Question And Answer isnt Matching", 400);
  const questionQuiz = quiz.questions;
  let totalPoints = 0;

  const questionsAnswerUser = answers.map((answer: any, index: number) => {
    const questionisExsist = questionQuiz.find((q) => q.id === +answer.id);
    const answerOfQuestion: any = questionisExsist?.answer as [];
    const isAnswerCorrect = answerOfQuestion.filter(
      (ans: any, i: number) => ans === answer.answer[i]
    );
    if (questionisExsist)
      totalPoints +=
        (isAnswerCorrect.length / answerOfQuestion.length) *
        questionQuiz[index].point;
    return {
      ...answer,
      point: questionQuiz[index].point,
    };
  });
  const quizResult = await prisma.user_quiz.create({
    data: {
      quiz_id: +id,
      user_id: (session?.id as number) || 1,
      answer: questionsAnswerUser as any,
      duration,
      score: totalPoints,
    },
  });

  return getResponse(quizResult, "success answered a quiz", 200);
}

export async function PUT(req: Request, { params }: any) {
  const { id } = params;
  const { course_id, name, question, answer }: Quiz = await req.json();
  if (!course_id || !name || !question || !answer)
    return getResponse(null, "course_id,name,question,answer is required", 400);
  if (question.length !== answer.length)
    return getResponse(null, "question and answer must be same length", 400);
  const course = await prisma.course.findUnique({
    where: {
      id: +course_id,
    },
  });
  if (!course) return getResponse(null, "course not found", 400);
  const quiz = await prisma.quiz.update({
    where: {
      id: +id,
    },
    data: {
      course_id: +course_id,
      name,
      questions: question,
    },
  });
  return getResponse(quiz, "success get Update quiz", 200);
}
export async function DELETE(req: Request, { params }: any) {
  const { id } = params;
  await prisma.quiz.delete({
    where: {
      id: +id,
    },
  });
  return getResponse(null, "success delete quiz", 200);
}

export async function GET(req: Request, { params }: any) {
  const { id } = params;
  const quiz = await prisma.quiz.findUnique({
    where: {
      id: +id,
    },
    include: {
      user_quiz: {
        include: {
          users: {
            select: {
              name: true,
              username: true,
              id: true,
            },
          },
        },
      },
      questions: true,
    },
  });
  if (!quiz) return getResponse(null, "quiz not found", 404);
  const userQuizMapped = quiz.user_quiz.map((uq) => {
    const answer = uq.answer as any;
    const questions = quiz.questions;
    const correctAnswer = questions.map((q, index) => {
      const answerOfQuestion: any = q.answer as [];
      const isAnswerCorrect = answerOfQuestion.filter(
        (ans: any, i: number) => ans === answer[index].answer[i]
      );
      return {
        ...q,
        isCorrect: isAnswerCorrect.length === answerOfQuestion.length,
      };
    });
    const wrongAnswer = correctAnswer.filter((c) => !c.isCorrect).length;
    return {
      id: uq.users.id,
      username: uq.users.username,
      name: uq.users.name,
      correct_answer: correctAnswer.filter((c) => c.isCorrect).length,
      wrong_answer: wrongAnswer,
      total_question: questions.length,
      score: uq.score,
    };
  });
  return getResponse(
    { ...quiz, user_quiz: userQuizMapped },
    "success get quiz",
    200
  );
}
