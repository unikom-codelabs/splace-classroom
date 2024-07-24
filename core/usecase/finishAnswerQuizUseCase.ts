import fetchApi from "@/utils/fetchApi";
import { AnswerQuizRequest } from "../entity/AnswerQuizRequest";
import { QuizResult } from "../entity/QuizResult";

export const finishAnswerQuizUseCase = async (quizId: number, AnswerQuizRequest: AnswerQuizRequest): Promise<QuizResult> => {
    return fetchApi<QuizResult>(`/quiz/${quizId}`, 'POST', AnswerQuizRequest).then(res => res.data);
}