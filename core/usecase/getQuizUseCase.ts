import fetchApi from "@/utils/fetchApi"
import { Quiz } from "../entity/Quiz"

export const getQuizUseCase = async () : Promise<Quiz[]> => {
    return fetchApi<Quiz[]>(`/quiz`, 'GET').then((response) => response.data);
}