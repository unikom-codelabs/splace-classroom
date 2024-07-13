import { QuestionType } from "./QuestionType"


export interface Question {
  title: string
  choices: string[]
  point: number
  answer: string[]
  type: QuestionType
}