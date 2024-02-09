"use client";
import React,{ useEffect, useState } from 'react'
import { Course,Resource } from '@/config/data-dummy'
import { Image } from '@nextui-org/image';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import fetchApi from '@/utils/fetchApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/button';
import { useSession } from 'next-auth/react';
import { Spinner } from '@nextui-org/react';
import { User } from '@/types';
import { useDisclosure } from '@nextui-org/react';
import ResourceList from '@/components/resource/resourceList';
import EmptyResource from '@/components/resource/emptyResource';
import Modal from '@/components/modal';
import FormResource from '@/components/resource/formResource';

export default function page({params}:any) {
  const modal = useDisclosure();
  const { data:session } = useSession();
  const userData = session?.user as User
  const [data, setData] = useState([]) as any;
  const [canUpload, setCanUpload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  async function  getData() {
    const courses = (await fetchApi(`/courses/${params.id}`, 'GET'));
    return courses.data;
  }

  async function handleUpload(e: any){
    e.preventDefault()
    setLoadingSubmit(true)
    const formData = new FormData(e.target);
    formData.append('course_id', params.id);
    console.log(formData)
    const res = await fetch(`/api/resources`, {
      method: 'POST',
      body: formData,
    })
    if (res) {
      getData().then((res)=>{
        setData(res)
      })
    }
    setLoadingSubmit(false)
    modal.onClose()
  }

  useEffect(()=>{
    if (userData?.role !== 'STUDENT' && session) setCanUpload(true)
    else setCanUpload(false)
  },[session])

  useEffect(()=>{
    getData().then((res)=>{
      setData(res)
      setLoading(false)
    })
  },[])
  if (loading) return <Spinner className="w-full text-center"/>
  return (
    <section className='w-full flex flex-col gap-5'>
      <Card className="w-full h-60 col-span-12 sm:col-span-7 rounded-t-none">
        <Image
          removeWrapper
          alt="Course banner"
          className="z-0 h-full object-cover rounded-t-none"
          src="/liquid-cheese.svg"
        />
        <CardFooter className="absolute bottom-0 z-10 text-white px-5 flex flex-col items-start">
          <h1 className="text-3xl font-semibold">{data?.name}</h1>
          <p>{data?.instructor}</p>
        </CardFooter>
      </Card>
      {canUpload && 
      <>
        <Button 
          variant='bordered' 
          className='flex justify-start bg-white' 
          radius='none' size='lg' 
          startContent={<FontAwesomeIcon icon={faPlus}/>}
          onPress={modal.onOpen}
        >
          Add Your Section In Here
        </Button>
        <Modal 
          title='Add Section' 
          isOpen={modal.isOpen} 
          onOpenChange={modal.onOpenChange}
          btnActionTitle='Upload'
          submit={handleUpload}
          loading={loadingSubmit}
        >
          <FormResource/>
        </Modal>
      </>
      
      }
      <section>
        {data?.module?.length > 0 ? <ResourceList userRole={userData?.role}  module={data?.module}/> : <EmptyResource/>}
      </section>
    </section>
  )
}
