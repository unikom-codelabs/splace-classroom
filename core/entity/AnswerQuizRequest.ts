import { Answer } from "./Answer";

export type AnswerQuizRequest = {
  answers: Answer[];
  duration: number;
};
