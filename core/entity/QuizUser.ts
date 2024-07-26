import { Question } from "./Question";

export interface QuizUser {
  id: number;
  username: string;
  name: string;
  course_name: string;
  correct_answer: number;
  wrong_answer: number;
  score: number;
  quiz: Question[];
}
