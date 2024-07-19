import { QuestionType } from "./QuestionType"


export interface Question {
  id?: number
  title: string
  choices: string[]
  point: number
  answer: string[]
  type: QuestionType
}