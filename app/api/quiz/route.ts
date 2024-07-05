import getResponse from '@/utils/getResponse';
import getSessionUser from '@/utils/session';
import { PrismaClient, Quiz } from '@prisma/client';

const prisma = new PrismaClient()
export async function POST(req: Request) {
  const {
		course_id,
		name,
		deadline,
		duration,
		start_at,
    questions,
    type,
  }: any = await req.json();
  
  if (!course_id || !name || !deadline || !start_at  || !questions)
		return getResponse(
			null,
			"course_id,name,deadline start_at,questions is required",
			400
		);
  const isHaveValidQuestionKeys =
		questions.filter(
			(item:any) =>
				!(
					item.hasOwnProperty("title") &&
					// (item.type !== "Essay" && item.hasOwnProperty("choices")) &&
          item.hasOwnProperty("point") &&
          item.hasOwnProperty("type") &&
          item.hasOwnProperty("answer")
				)
    ).length > 0;
  if (isHaveValidQuestionKeys) return getResponse(null, 'question must have title, choices, points,answer,type', 400);
  const totalPoints = questions.reduce(
    (acc: any, item: any) => +acc + +item.point,
    0
  );

  if (totalPoints !== 100) return getResponse(null, 'total points must be 100', 400);
  const course = await prisma.course.findUnique({
    where: {
      id: +course_id,
    },
  });
  if (!course) return getResponse(null, 'course not found', 400);
  const quiz = await prisma.quiz.create({
    data: {
      course_id: +course_id,
      name,
      deadline: new Date(deadline),
      duration,
      start_at:new Date(start_at),
      type
    },
  })
  const questionMapped = questions.map((question:any) => ({
    ...question,
    point: +question.point,
    quiz_id: +quiz.id,
  
}))
  const questionsData = await prisma.question.createMany({
    data: questionMapped
  });
  
  return getResponse(quiz, 'success get Create quiz', 200);
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const course_id = searchParams.get('course_id')
  const filter: any = {}

  if (course_id) filter.course_id = +course_id
  
  const quiz = await prisma.quiz.findMany({where: {...filter},include: {questions:true}})
  return getResponse(quiz, 'success get all quiz', 200);
}