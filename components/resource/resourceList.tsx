"use client";
import React from 'react'
import ModuleItem from './moduleItem'
import NextLink from 'next/link'
import QuizItem from './quizItem';

type moduleProps = {
  userRole:string,
  module:any
}

export default function ResourceList({userRole,module}:moduleProps) {
  return (
    <div className='w-full flex flex-col gap-2'>
      {module.map((item:any,index:any)=>{
        const isQuiz = item.path === undefined;
        return (
          <div key={index}>
            { isQuiz?
            <QuizItem userRole={userRole} module={item}/>
            :
            <ModuleItem userRole={userRole} module={item}/>
            }
          </div>
        )
      })}
    </div>
  )
}
