import { Question } from "./Question";
import { QuizType } from "./QuizType";

export interface Quiz {
  id: number;
  name: string;
  type: QuizType;
  course_id: number;
  deadline: string;
  duration: number;
  start_at: string;
  end_at: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user_quiz: any[] | null,
  questions: Question[] | null;
}

