import { QuestionType } from "./QuestionType";

export interface Question {
  id?: number;
  title: string;
  choices: string[];
  point?: number;
  answer: any;
  type: QuestionType;
  true_answer?: string;
  percentage?: number;
}
