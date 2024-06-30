import { Quiz } from '@/types/quiz';
import getResponse from '@/utils/getResponse';
import getSessionUser from '@/utils/session';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
export async function POST(req: Request) {
  const { course_id, name, question, answer, type, deadline, duration }: Quiz =
		await req.json();
  if (!course_id || !name || !question || !answer) return getResponse(null, 'course_id,name,question,answer is required', 400);
  if (question.length !== answer.length) return getResponse(null, 'question and answer must be same length', 400);
  const isHaveValidQuestionKeys =
		question.filter(
			(item:any) =>
				!(
					item.hasOwnProperty("title") &&
					item.hasOwnProperty("choices") &&
					item.hasOwnProperty("points")
				)
    ).length > 0;
  if (isHaveValidQuestionKeys) return getResponse(null, 'question must have title, choices, points', 400);
  const totalPoints = question.reduce(
    (acc: any, item: any) => +acc + +item.points,
    0
  );
  if (totalPoints !== 100) return getResponse(null, 'total points must be 100', 400);
  
  const course = await prisma.course.findUnique({
    where: {
      id: +course_id,
    },
  });
  if(!course) return getResponse(null, 'course not found', 400);
  const quiz = await prisma.quiz.create({
		data: {
			course_id: +course_id,
			name,
			question,
			answer,
			deadline:  new Date(deadline),
			duration,
			type,
		},
  });
  return getResponse(quiz, 'success get Create quiz', 200);
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const course_id = searchParams.get('course_id')
  const filter: any = {}

  if (course_id) filter.course_id = +course_id
  
  const quiz = await prisma.quiz.findMany({where: {...filter}})
  return getResponse(quiz, 'success get all quiz', 200);
}