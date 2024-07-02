import { Prisma, TypeQuiz } from "@prisma/client";
import { JsonArray, JsonObject } from "@prisma/client/runtime/library";

export interface Questions {
  title: string;
  choices: string[];
}
export interface Answer {
  title: string;
  answer: string[];
}
export interface Quiz {
  course_id: string;
  name: string;
  start_at: Date;
  question: Questions[] | any;
  duration: number;
  deadline: Date;
  answer: Answer[]|any;
  type: TypeQuiz;
}