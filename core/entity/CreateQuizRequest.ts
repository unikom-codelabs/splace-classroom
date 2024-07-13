import { Question } from "./Question";
import { QuizType } from "./QuizType";

export interface CreateQuizRequest {
  course_id: number;
  name: string;
  type: QuizType;
  questions: Question[];
  deadline: string;
  start_at: string;
  end_at: string;
  duration: number;
}