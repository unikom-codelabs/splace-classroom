"use client";
import React from 'react'
import QuizItemMultiple from './quizItemMultiple'
import QuizItemEssay from './quizItemEssay';
export default function QuizList({question, handleInputChange,...props}:any) {
  return (
    <div {...props}>
      {question.map((item: any, index: number) => {
        if (item.isEssay){
          return (
            <QuizItemEssay key={index} no={index}  question={item} handleInputChange={handleInputChange} />
          )
        }
        return (
          <QuizItemMultiple key={index} no={index} question={item} handleInputChange={handleInputChange}/>
        )
      })}
    </div>
  )
}
