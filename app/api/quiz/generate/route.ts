import getResponse from '@/utils/getResponse';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
export async function POST(req: Request) {
    const {
		name,
		module_id,
		course_id,
		query,
		deadline,
		start_at,
		type,
		duration,
		count_types,
    } = await req.json();
  const questionTypes = Object.keys(count_types);
  let questionTypeCountRAG = ""
  let questionTypeRAG = "";
  questionTypes.forEach((type) => {
    switch (type) {
      case "choice":
        questionTypeRAG += "|'Multiple Choice with One Answer'";
        questionTypeCountRAG += `|'(${count_types[type]} for Multiple Choice with One Answer)'`;

        break;
      case "multiple":
        questionTypeRAG += "|'Multiple Choice with Multiple Answers'";
        questionTypeCountRAG += `|'(${count_types[type]} for Multiple Choice with One Answer)'`;

        break;
      case "essay":
        questionTypeRAG += "|'Essay'";
        questionTypeCountRAG += `|'(${count_types[type]} for Essay)'`;
        break;
    }
  })
  const body = {
    query,
    course_id,
    module_id,
    threshold: 0.5,
    limit: 4,
    question_type: questionTypeRAG.split("|").filter((item) => item !== "").join(", "),
    number_of_question: questionTypeCountRAG.split("|").filter((item) => item !== "").join(", "),
  }
  // console.log(process.env.GENERATE_QUIZ_URL ,JSON.stringify(body));

  const res = await fetch(process.env.GENERATE_QUIZ_URL as string, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
		body: JSON.stringify(body),
  });
  const generatedQuiz = (await res.json()).parsed;
  const generatedQuizMaped = generatedQuiz.map((item: any) => ({
    ...item,
    point:100/generatedQuiz.length
  }))
  
  const quiz = await prisma.quiz.create({
    data: {
      name,
      course_id,
      start_at: new Date(start_at),
      deadline: new Date(deadline),
      questions: {
        create: generatedQuizMaped
      },
      duration,
    }
  })
  return getResponse(quiz, "Quiz generated successfully", 200);
}