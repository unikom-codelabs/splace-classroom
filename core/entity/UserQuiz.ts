export interface UserQuiz {
  id: number;
  username: string;
  name: string;
  correct_answer: number;
  wrong_answer: number;
  total_question: number;
  score: number;
}
