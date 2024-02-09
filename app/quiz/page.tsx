"use client"
import React, { useState, useEffect } from 'react'
import { quiz } from '@/config/data-dummy';
import {
  Table as T, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell, 
  getKeyValue, 
  Button, 
  useDisclosure, 
  Input, 
  Select, 
  SelectItem
} from "@nextui-org/react";
import { Icon } from '@iconify/react';
import Modal from '@/components/modal';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import FormQuizAI from '@/components/quiz/formQuizAI';
import fetchApi from '@/utils/fetchApi';
import FormQuizManual from '@/components/quiz/formQuizManual';
import { showFormattedDate, showFormattedDateOnly } from '@/utils/timeStamp';
import { Spinner } from '@nextui-org/react';

export default function page() {
  const modal1 = useDisclosure();
  const modal2 = useDisclosure();
  const router = useRouter();
  const [courses, setCourses] = useState([]) as any;
  const [quiz, setQuiz] = useState([]) as any;
  const [loading, setLoading] = useState(true);
  const [quizForm, setQuizForm] = useState({
    name: '',
    course: '',
    module: '',
    type: '',
    numberQuestion: 0
  })

  const questionTypes = [
    {
      id:1,
      name: 'Multiple'
    },
    {
      id:2,
      name: 'Essay'
    },
    {
      id:3,
      name: 'Mixed'
    },
  ]
  const columns = [
    {
      key: "name",
      label: "Quiz Name",
    },
    {
      key: "question",
      label: "Number Of Questions",
    },
    {
      key: "type",
      label: "Quiz Type",
    },
    {
      key: "course_id",
      label: "Course",
    },
    {
      key: "updatedAt",
      label: "Modify",
    },
  ];
  const modules = [
    {
      id: 1,
      name: 'Module 1'
    },
    {
      id: 2,
      name: 'Module 2'
    },
    {
      id: 3,
      name: 'Module 3'
    },
  ]

  async function getQuiz() {
    const quiz = (await fetchApi(`/quiz`, 'GET'));
    return quiz.data;
  }
  async function getCourses() {
    const courses = (await fetchApi(`/courses`, 'GET'));
    return courses.data;
  }
  useEffect(()=>{
    getCourses().then((res)=>{
      setCourses(res)
    })
    getQuiz().then((res)=>{
      setQuiz(res)
      setLoading(false)
    })
  },[])

  function handleChange(e:any){
    setQuizForm({
      ...quizForm,
      [e.target.name]: e.target.value
    })
  }
  function handleSubmitQuizManual(e:any) {
    e.preventDefault()
    const {name, course, type} = quizForm;
    if(!name || !course || !type) return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill in all the fields!',
    });
    router.push(`/quiz/create?qname=${name}&course_id=${course}&type=${type}`);
  }
  
  return (
    <section className='p-5 w-screen lg:max-w-6xl lg:mx-auto space-y-5'>
      <header className='bg-white p-4 shadow-md'>
        <h1 className='text-xl font-bold text-dark-blue'>Quiz</h1>
      </header>
      <section className="overflow-x-auto w-full">
        <T 
          aria-label="Table Quiz" 
          radius='none' 
        >
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={quiz} isLoading={loading} loadingContent={<Spinner/>}>
            {(item:any) => {
              if (item.updatedAt) item.updatedAt = showFormattedDateOnly(item.updatedAt)
              if (item.question) item.question = item.question.length 
              if (item.course_id) item.course_id = courses?.find((c:any) => c.id === item.course_id)?.name
              return(
              <TableRow key={item.key}>
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              </TableRow>
            )}}
          </TableBody>
        </T>
      </section>
      <section className='flex gap-3 items-center'>
        {/* GENERATE QUIZ BY AI */}
        <Button 
          size='sm' 
          className='bg-dark-blue text-white font-bold px-6' 
          radius='sm' 
          startContent={<img src="/shinning.png" alt="icon"/>}
          onPress={modal1.onOpen}
        >
          Quiz Generator
        </Button>
        <Modal 
          title='Quiz Generator' 
          isOpen={modal1.isOpen} 
          onOpenChange={modal1.onOpenChange}
          btnActionTitle='Generate'
        >
          <FormQuizAI 
            courses={courses} 
            questionTypes={questionTypes} 
            modules={modules}
          />
        </Modal>
        {/* CREATE QUIZ MANUAL */}
        <Button 
          size='sm' 
          className='border-dark-blue text-dark-blue px-5' 
          variant='ghost'  
          radius='sm'
          onPress={modal2.onOpen}
        >
          Create Quiz
        </Button>
        <Modal 
          title='Create Quiz' 
          isOpen={modal2.isOpen} 
          onOpenChange={modal2.onOpenChange}
          btnActionTitle='Next'
          submit={handleSubmitQuizManual}
        >
          <FormQuizManual 
            courses={courses} 
            questionTypes={questionTypes} 
            handleChange={handleChange}
          />
        </Modal>
      </section>
    </section>
  )
}
