"use client"
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation';
import fetchApi from '@/utils/fetchApi';
import { people } from '@/config/data-dummy'
import PeopleList from '@/components/people/peopleList'
import { Spinner } from '@nextui-org/react';
import { Card, CardFooter, Image } from '@nextui-org/react';

export default function page() {
  const [course, setCourse] = useState([]) as any;
  const [student, setStudent] = useState([]); 
  const [instructor, setInstructor] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
	async function  getUserInCourse() {
    const courses = (await fetchApi(`/users?course_id=${id}`, 'GET'));
    return courses.data;
  }
  async function getCourse() {
    const courses = (await fetchApi(`/courses/${id}`, 'GET'));
    return courses.data;
  }
  useEffect(()=>{
    getUserInCourse().then((res)=>{
      setStudent(res.filter((item:any)=>item.role == 'STUDENT'))
      setInstructor(res.filter((item:any)=>item.role != 'STUDENT'))
      setLoading(false)
    })
    getCourse().then((res)=>{
      setCourse(res)
    })
  },[])
  return (
    <section className='w-full'>
      <Card className="w-full h-60 col-span-12 sm:col-span-7 rounded-t-none">
        <Image
          removeWrapper
          alt="Course banner"
          className="z-0 h-full object-cover rounded-t-none"
          src="/liquid-cheese.svg"
        />
        <CardFooter className="absolute bottom-0 z-10 text-white px-5 flex flex-col items-start">
          <h1 className="text-3xl font-semibold">{course?.name}</h1>
          <p>{course?.instructor}</p>
        </CardFooter>
      </Card>
      <section className='space-y-5 my-5'>
        <div className='space-y-3'>
          <h1 className={`lg:text-xl text-blue-600 border-b-1 border-blue-600 border-solid`}>Teacher</h1>
          {loading ? <Spinner className='text-center w-full'/>:<PeopleList data={instructor}/>}
        </div>
        <div className='space-y-3'>
          <h1 className={`lg:text-xl flex justify-between items-end text-blue-600 border-b-1 border-blue-600 border-solid`}>Student <span className='text-lg'>{student?.length} Student</span></h1>
          {loading ? <Spinner className='text-center w-full'/>:<PeopleList data={student}/>}
        </div>
      </section>
      
    </section>
  )
}
