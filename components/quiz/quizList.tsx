"use client";
import React from "react";
import QuizItemMultiple from "./quizItemMultiple";
import QuizItemEssay from "./quizItemEssay";
export default function QuizList({
  question,
  handleInputChange,
  ...props
}: any) {
  return (
    <div {...props}>
      {question.map((item: any) => {
        console.log(item);
        if (item.isEssay) {
          return (
            <QuizItemEssay
              key={item.no}
              no={item.no}
              question={item}
              handleInputChange={handleInputChange}
            />
          );
        }
        return (
          <QuizItemMultiple
            key={item.no}
            no={item.no}
            question={item}
            handleInputChange={handleInputChange}
          />
        );
      })}
    </div>
  );
}
