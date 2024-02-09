"use client"
import { QuizCreator } from '@/components/quiz/QuizCreator';
import React,{ useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import fetchApi from '@/utils/fetchApi';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
export default function Page({ 
  searchParams,
}:{
  searchParams:{
    course_id: BigInt, 
    qname:string,
    type:string
  }
  }){
  const { course_id, qname, type } = searchParams;
  const router = useRouter();
  const [changeQuizName, setChangeQuizName] = useState(false);
  const [quizName, setQuizName] = useState(qname);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: any, data: any) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetchApi('/quiz','POST', data)
      if(res) return router.push(`/quiz`)
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
      console.log(error)
    }
    setLoading(false);
  }

  useEffect(()=>{
    if ( course_id === undefined ) return router.push('/quiz');
  },[])
  return (
    <section className='max-w-4xl mx-auto my-5 space-y-3 p-2 lg:p-0'>
      <header className='bg-white shadow-sm p-5 border-1 border-gray-300 flex gap-2 items-center'>
        <Button 
          radius='full' 
          size='lg' 
          variant="light" 
          isIconOnly 
          onClick={()=>setChangeQuizName(!changeQuizName)}
        >
          <FontAwesomeIcon icon={faPenToSquare} className='text-dark-blue'/>
        </Button>
        {changeQuizName ?(
          <Input type="text" value={quizName} className='w-fit' variant='underlined' size='sm' onChange={(e)=>setQuizName(e.target.value)}/>
        ):( 
          <h1>{qname}</h1>
        )}
      </header>
      <section>
        <QuizCreator courseId={course_id} quizName={quizName} onSubmit={handleSubmit} type={type} loadingSubmit={loading}/>
      </section>
    </section>
  )
}
