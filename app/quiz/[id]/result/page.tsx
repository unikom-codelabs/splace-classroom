'use client';
import React,{useEffect, useState} from 'react'
import {
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell, 
  getKeyValue, 
  Button, 
  Spinner} from "@nextui-org/react";
import NextLink from 'next/link';
import { quizResult } from '@/config/data-dummy'
import fetchApi from '@/utils/fetchApi';
import { showFormattedDate } from '@/utils/timeStamp';

export default function page({params: {id}}: {params: {id: string}}) {
  const [data,setData] = useState([]) as any
  const [loading,setLoading] = useState(true)  
  async function getQuiz() {
    const res = await fetchApi(`/quiz/${id}`, 'GET')
    return res.data
  }
  useEffect(() => {
    getQuiz().then((res) =>{
      setData(res)
      setLoading(false)
    })
  },[])
  const columns = [
    {
      key: "createdAt",
      label: "State",
    },
    {
      key: "score",
      label: "Grade",
    },
  ];
  const rows = data?.user_quiz
  if (loading) return  <Spinner className="w-full text-center"/>
  return (
    <section className='m-4 space-y-4'>
      <header className='text-dark-blue bg-white shadow-md p-4 px-10'>
        <h1 className='text-xl font-bold'>Summary {data.name}</h1>
      </header>
      <Table aria-label='table quiz detail' className='md:px-10'>
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody>
          {rows?.map((row:any) =>{
            if (row.createdAt) row.createdAt = showFormattedDate(row.createdAt)
            return (
            <TableRow key={row.id}>
              {(columnKey) => {
                if(columnKey == 'createdAt'){
                  return(
                    <TableCell>
                      <p>Finised</p>
                      Submited {getKeyValue(row, columnKey)}
                    </TableCell>
                  )
                }
                return(
                  <TableCell>{getKeyValue(row, columnKey)}</TableCell>
                )
              }}
            </TableRow>
          )})}
        </TableBody>
      </Table>
      <NextLink href={`/course/${id}`} className='flex justify-center'><Button className='bg-dark-blue text-white px-10' radius='none'>Back To Your Course</Button></NextLink>
    </section>
  )
}
