"use client";
import { Card,CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Button, Input, Radio, RadioGroup } from '@nextui-org/react';
import React from 'react'

type quizItemProps = {
  title: string,
}

export default function QuizItemEssay({no,question,handleInputChange}:any){
  const { title }:quizItemProps = question
  return (
    <div className='space-y-1'>
      <Card id={no} className='p-4 w-full border-gray-300 border-1' radius='none' shadow='none'>
        <h1>Question {no+1}</h1>
      </Card>
      <Card id={no} className='p-2 w-full border-gray-300 border-1' radius='none' shadow='none'>
        <CardBody className='space-y-2'>
          <h1>{title}</h1>
          <Input type="text" placeholder="Type your answer here" onChange={(e)=>handleInputChange(e,question)}/>
        </CardBody>
      </Card>
    </div>
    
  )
}
