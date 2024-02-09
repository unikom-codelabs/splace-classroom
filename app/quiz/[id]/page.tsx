"use client";
import QuizItem from "@/components/quiz/quizItemMultiple";
import QuizList from "@/components/quiz/quizList";
import QuizNavigation from "@/components/quiz/quizNavigation";
import fetchApi from "@/utils/fetchApi";
import { Button } from "@nextui-org/button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import Swal from "sweetalert2";
type dataProps = {
  name: string,
  question: {
    title: string,
    choices: string[]
  }[]
}

async function getQuizDetail(id: any) {
  const res = await fetchApi(`/quiz/${id}`, "GET");
  return res.data
}

export default function page({params: { id }}: {params: { id: any }}) {
  const router = useRouter();
  const [data, setData] = useState<dataProps>({ name: '', question: [{ title: '', choices: [''] }] })
  const [formData, setFormData] = useState<{ title: string, answer: string[] }[]>([]);
  const [loading, setLoading] = useState(true);

  const handleInputChange = (e: any, question: any) => {
    const updatedFormData = [...formData];
    const questionIndex = updatedFormData.findIndex((data) => data.title === question.title);
    if (questionIndex !== -1) {
      updatedFormData[questionIndex] = {
        ...updatedFormData[questionIndex],
        answer: question.isMultipleAnswer ? e:[e.target.value] 
      };
    } else {
      updatedFormData.push({
        title: question.title,
        answer: question.isMultipleAnswer ? e:[e.target.value]
      });
    }
    setFormData(updatedFormData);
  };

  useEffect(() => {
    getQuizDetail(id).then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);
  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log(formData);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, submit it!",
      cancelButtonText: "No, cancel!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetchApi(`/quiz/${id}`, "POST", formData);
        if (!res.data) {
          Swal.fire("Failed!", res.message, "error");
        } else {
          Swal.fire("Success!", "Your answer has been submitted.", "success");
          router.push(`/quiz/${id}/result`);
        }
      }
    });
  }

  if (loading) return <Spinner className="w-full text-center" />
  return (
    <>
      <header className="bg-white p-4 px-10">
        <h1 className="font-bold text-dark-blue text-xl">{data.name}</h1>
      </header>
      <section>
        <div className="flex flex-col md:grid p-5 lg:px-28 gap-3 md:grid-cols-[1fr_400px]">
          <QuizList 
            question={data.question} 
            handleInputChange={handleInputChange} 
            className='space-y-4 container order-2 md:order-1'
          />
          <QuizNavigation 
            handleSubmit={handleSubmit} 
            question={data.question} 
            formData={formData} 
            className='order-1 md:order-2 h-fit px-5 py-2 md:sticky md:top-20 bg-[#E7F1F9]'
          />
        </div>
      </section>
    </>
      
    
  );
}
