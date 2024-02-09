"use client";
import { Card,CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { CheckboxGroup, Checkbox } from '@nextui-org/react';
import { Button, Radio, RadioGroup } from '@nextui-org/react';
import React from 'react'

type quizItemProps = {
  title: string,
  choices: string[],
}

export default function QuizItemMultiple({no,question, handleInputChange}:any){
  const {title, choices}: quizItemProps = question
  return (
    <div className='space-y-1'>
      <Card id={no} className='p-4 w-full border-gray-300 border-1' radius='none' shadow='none'>
        <h1>Question {no+1}</h1>
      </Card>
      <Card id={no} className='p-2 w-full border-gray-300 border-1' radius='none' shadow='none'>
        <CardBody className='space-y-2'>
          <h1>{title}</h1>
          {question.isMultipleAnswer ?(
          <div className="flex flex-col gap-3">
            <CheckboxGroup
              radius='sm'
              color="primary"
              value={question.answer}
              onChange={(e)=>handleInputChange(e,question)}
            >
              {choices.map((choice, index) => {
                return (
                  <Checkbox key={index} value={choice}>{choice}</Checkbox>
                )
              })}
            </CheckboxGroup>
          </div>
          ):(
          <RadioGroup onChange={(e)=>handleInputChange(e,question)}>
            {choices.map((choice, index) => {
              return (
                  <Radio key={index} value={choice}>{choice}</Radio>
              )
            })}
          </RadioGroup>
          )}
        </CardBody>
      </Card>
    </div>
  )
}
