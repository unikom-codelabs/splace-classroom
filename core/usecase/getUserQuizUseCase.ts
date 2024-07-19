import fetchApi from "@/utils/fetchApi";
import { Quiz } from "../entity/Quiz";

export const getUserQuizUseCase = async (quizId: string): Promise<Quiz> => {
  return fetchApi<Quiz>(`/quiz/${quizId}`, 'GET').then((res) => res.data);
}