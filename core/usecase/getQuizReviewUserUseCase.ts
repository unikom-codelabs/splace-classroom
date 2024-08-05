import fetchApi from "@/utils/fetchApi";
import { QuizUser } from "../entity/QuizUser";

export const getQuizReviewUserUseCase = async (
  course_id: number,
  user_id: number
): Promise<QuizUser> => {
  return fetchApi<QuizUser>(`/quiz/${course_id}/user/${user_id}`, "GET").then(
    (res) => res.data
  );
};
