'use client';
import AdminLayout from "@/layouts/AdminLayout";
import fetchApi from "@/utils/fetchApi";
import { Input } from "@nextui-org/input";
import { Button, Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Edit({ params }: { params: { slug: string } }) {
  const [className, setClassName] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const {name} :any = params 
  async function handleSubmit(e: any) {
    e.preventDefault();
    const res = await fetchApi(`/admin/classes/${name}`, 'PUT', { class: className })
    if (!res.data) setErrorMessage(res.message);
    // return router.push('/admin/classes');
  }
  useEffect(() => {
    fetchApi(`/admin/classes?name=${name}`, 'GET').then(res => {
      setClassName(res.data[0].name)
    })
  }, [name])
  return (
    <AdminLayout title="Class Management" subtitle="Create your user">
      <h1 className="text-xl font-bold mb-5 text-center">Edit Class { name}  </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col gap-5 mx-auto">
        <Input type="text" label="Class Name" placeholder="Enter Class Name" errorMessage={errorMessage} value={className} onChange={(e) => setClassName(e.target.value)} />
        <Button color="warning" type="submit">Update</Button>

      </form>
    </AdminLayout>
  );
}
