import fetchApi from '@/utils/fetchApi';
import { CreateQuizRequest } from '../entity/CreateQuizRequest';
import { Quiz } from '../entity/Quiz';

export const createQuizUseCase = async (request: CreateQuizRequest) : Promise<Quiz> => {
  const quiz = fetchApi<Quiz>(`/quiz`, 'POST', request);
  return quiz;
};
