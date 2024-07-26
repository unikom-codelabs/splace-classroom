import fetchApi from "@/utils/fetchApi";
import { Quiz } from "../entity/Quiz";

export const getQuizReviewUseCase = async (id: number): Promise<Quiz> => {
  return fetchApi<Quiz>(`/quiz/${id}`, "GET").then((res) => {
    console.log(res);
    return res.data;
  });
};
