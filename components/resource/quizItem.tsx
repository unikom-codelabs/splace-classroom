"use client";
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileLines } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck,faCircle } from '@fortawesome/free-regular-svg-icons';
import NextLink from 'next/link';
import { showFormattedDate } from '@/utils/timeStamp';
import { Button } from '@nextui-org/button';
import fetchApi from '@/utils/fetchApi';

export default function QuizItem({userRole,module}:any) {
  const { id,name,createdAt, path, isAnswered } = module || {};
  const [ quiz, setQuiz ] = useState(false)

  useEffect(() => {
    if(!path) setQuiz(true)
  }, [])

  const handleDeleteQuiz = async(e:any,id:any) => {
    e.preventDefault();
    await fetchApi(`/quiz/${id}`, 'DELETE');
    window.location.reload();
  }
  return (
    <NextLink href={isAnswered?`/quiz/${id}/result`:`/quiz/${id}`}>
      <div className="group flex gap-3 flex-row py-2 px-4 cursor-pointer justify-between items-center">
        <div className='flex gap-3 flex-row'>
          <div className='rounded-3xl w-10 bg-yellow-500 flex justify-center items-center p-2'>
            <FontAwesomeIcon icon={ faFileLines } className='fa-xl text-white'/>
          </div>
          <div className="flex flex-col">
            <p className="text-md">{name}</p>
            <p className="text-small text-default-500">{showFormattedDate(createdAt)}</p>
          </div>
        </div>
        <div>
          {userRole !== 'STUDENT' ? (
            <div className='group-hover:flex hidden'>
              <Button color='danger' size='sm' onClick={(e)=>handleDeleteQuiz(e,id)}>Delete</Button>
            </div>
          ):(
            <FontAwesomeIcon icon={isAnswered?faCircleCheck:faCircle } className={`${isAnswered?'text-green-500':'text-gray-300'}`} size='xl'/>
          )}
        </div>
      </div>
    </NextLink>
  )
}
