import { QuestionType } from "./QuestionType";

export interface Question {
  id?: number;
  title: string | undefined | null;
  choices: string[];
  point?: number;
  answer: any;
  type: QuestionType;
  true_answer?: string;
  percentage?: number;
}
