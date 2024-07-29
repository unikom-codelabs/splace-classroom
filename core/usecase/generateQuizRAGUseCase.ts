import { GenerateQuizRequest } from "../entity/GenerateQuizRequest";
import { Question } from "../entity/Question";

export const generateQuizRAGUseCase = async (
  request: GenerateQuizRequest
): Promise<Question[]> => {
  const json = {
    query: request.query,
    course_id: request.course_id,
    module_id: request.module_id,
    threshold: 0.1,
    limit: 4,
    question_type: `Multiple Choice with One Answer, Multiple Choice with Multiple Answer, Essay`,
    number_of_question: `${request.count_types.multiple} for Multiple Choice with One Answer, ${request.count_types.choices} for Multiple Choice with Multiple Answer, ${request.count_types.essay} for Essay`,
  };
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
