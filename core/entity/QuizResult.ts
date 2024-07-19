export interface QuizResult {
    id: number;
    user_id: number;
    quiz_id: number;
    score: number,
    answer: {
        id: number,
        point: number,
        answer: string[],
    }[],
    duration: number,
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}