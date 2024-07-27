import { GenerateQuizRequest } from "../entity/GenerateQuizRequest";
import { Question } from "../entity/Question";

const json = {
  query: "ALgoritma",
  course_id: 100,
  module_id: [1, 2],
  threshold: 0.5,
  limit: 4,
  question_type:
    "'Multiple Choice with One Answer', 'Multiple Choice with Multiple Answer', and 'Essay'",
  number_of_question:
    "'10 for Multiple Choice with One Answer', '10 for Multiple Choice with Multiple Answer', and '9 for Essay'",
};

export const generateQuizRAGUseCase = async (
  request: GenerateQuizRequest
): Promise<Question[]> => {
  const response = fetch("https://rag-classroom.unikomcodelabs.id/quiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  })
    .then((res) => res.json())
    .then((data) => data.parsed);

  return response;
};
