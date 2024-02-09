'use client'

import { SearchIcon } from "@/components/icons";
import Modal from "@/components/modal";
import Table from "@/components/table";
import AdminLayout from "@/layouts/AdminLayout";
import fetchApi from "@/utils/fetchApi";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export const dynamic = 'force-dynamic';

export default  function Users() {
  const headers = ['name', 'student count'];
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState([]);
  const router = useRouter() 
  const [loading, setLoading] = useState(true);
  async function  getData() {
    const courses = (await fetchApi('/admin/courses', 'GET'));
    return courses.data;
  }

  const handleDelete = async (id:number) => {
    await fetchApi(`/admin/courses/${id}`, 'DELETE');
      window.location.reload();
  }
  useEffect(() => {
    getData().then((res) => { 
      setData(res);
      setLoading(false);
    })

  },[])

  useEffect(() => {
    setSearchData(data.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase())));
  }, [search])
  
  return (
    <AdminLayout title="Course Management" subtitle="Manage your Course Here">
      <div className="flex flex-col md:flex-row items-center my-5 gap-2 ">
        <Input
          label="Search"
          isClearable
          radius="lg"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: [
              "bg-transparent",
              "text-black/90 dark:text-white/90",
              "placeholder:text-default-700/50 dark:placeholder:text-white/60",
            ],
            innerWrapper: "bg-transparent",
          }}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Type to search..."
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
          />

        <Button color="primary" className="self-end" as={Link} href="/admin/courses/create">Create</Button>
      </div>

      <Table 
        headers={headers} 
        data={search == ''?data:searchData} 
        uniqueKey="id" module="admin/courses" 
        onDelete={handleDelete} 
        loading={loading}
      />
    </AdminLayout>
  );
}
