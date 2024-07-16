"use client";
import { QuestionType } from "@/core/entity/QuestionType";
import QuizItemEssay from "./quizItemEssay";
import QuizItemMultiple from "./quizItemMultiple";
import { memo, MutableRefObject, useEffect, useMemo } from "react";
import { Answer } from "@/core/entity/Answer";

export interface CurrentQuestion {
  no: number;
  id?: number;
  title: string;
  choices: string[];
  point: number;
  answer: string[];
  type: QuestionType;
}

export const QuizList = memo(
  ({
    questions,
    quizListRef,
    answer,
  }: {
    questions: CurrentQuestion[];
    quizListRef: MutableRefObject<any>;
    answer: Answer[];
  }) => {
    const quizAnswer = useMemo(() => {
      return answer.reduce((acc: { [key: number]: string[] }, curr) => {
        acc[curr.id] = curr.answer;
        return acc;
      }, {});
    }, [answer]);

    return (
      <div ref={quizListRef} className="space-y-4">
        {questions.map((question) => {
          if (question.type === QuestionType.Essay) {
            return (
              <QuizItemEssay
                key={question.no}
                no={question.no}
                id={question.id}
                title="Essay"
                answer={question.id ? quizAnswer[question.id] : []}
              />
            );
          }
          return (
            <QuizItemMultiple
              key={question.no}
              no={question.no}
              title={question.title}
              choices={question.choices}
              questionType={question.type}
              id={question.id}
              answer={question.id ? quizAnswer[question.id] : []}
            />
          );
        })}
      </div>
    );
  }
);
