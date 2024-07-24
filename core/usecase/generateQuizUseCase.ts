import fetchApi from "@/utils/fetchApi";
import { GenerateQuizRequest } from "../entity/GenerateQuizRequest";
import { Question } from "../entity/Question";
import { Quiz } from "../entity/Quiz";

export const generateQuizUseCase = async (
  request: GenerateQuizRequest
): Promise<Question[]> => {
  return fetchApi<Quiz>(`/quiz/generate`, "POST", request).then(
    (response) => response.data
  );
};
