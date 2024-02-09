"use client";
import React from 'react'
import { Card,CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import NextLink from 'next/link'
export default function QuizNavigation({handleSubmit,errorMessage,question,formData,...props}:any) {
  return (
    <Card {...props} radius='sm' shadow='none'>
      <CardHeader>
        <h1 className='text-center w-full'>Quiz Navigation</h1>
      </CardHeader>
      <CardBody>
        <div className='flex flex-row mx-auto flex-wrap md:grid md:grid-cols-3 lg:grid-cols-5 gap-5 w-fit'>
          {question.map((item: any, index: number) => {
            const answered = formData.find((data: any) => data.title === item.title);
            return (
              <NextLink href={`#${index}`} key={index}  className={`bg-white items-center flex justify-between flex-col w-8 h-8 md:w-10 md:h-10`}>
                <p className='flex-1'>{index+1}</p>
                <div className={`${answered?'bg-dark-blue':'bg-gray-300'} h-1/4 w-full`}/>
              </NextLink>
            )
          })}
        </div>
      </CardBody>
      <CardFooter>
        <Button onClick={handleSubmit} className='w-full bg-white' radius='sm'>Finish Attempt</Button>
      </CardFooter>
    </Card>
  )
}
