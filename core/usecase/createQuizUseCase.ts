import fetchApi from '@/utils/fetchApi';
import { CreateQuizRequest } from '../entity/CreateQuizRequest';
import { Quiz } from '../entity/Quiz';

export const createQuizUseCase = async (request: CreateQuizRequest) : Promise<Quiz> => {
  return fetchApi<Quiz>(`/quiz`, 'POST', request).then((response) => response.data);
};
