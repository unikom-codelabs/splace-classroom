import { Image } from '@nextui-org/image'
import React from 'react'

export default function EmptyCourse() {
  return (
    <div className='w-full flex items-center flex-col'>
      <Image src='/teamwork.png' alt='ilustration' width={300} loading='lazy'/>
      <h1 className='text-center text-xl'>No Course</h1>
    </div>
  )
}
