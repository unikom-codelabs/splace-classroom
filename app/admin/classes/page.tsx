'use client'

import { SearchIcon } from "@/components/icons";
import Table from "@/components/table";
import AdminLayout from "@/layouts/AdminLayout";
import fetchApi from "@/utils/fetchApi";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
export const dynamic = 'force-dynamic';

export default  function Users() {
  const headers = ['name'];
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function  getData() {
    const classes = (await fetchApi('/admin/classes', 'GET'));
    return classes.data;
  }
  const handleDelete = async (name:string) => {
    const res = await fetchApi(`/admin/classes/${name}`, 'DELETE');
    window.location.reload();
  }
  useEffect(() => {
    getData().then((data) => { 
      setData(data);
      setLoading(false);
    })
  }, [])
  useEffect(() => {
    setSearchData(data.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase())));
  }, [search])
  return (
    <AdminLayout title="Class Management" subtitle="Manage your Class Here">
      <div className="flex flex-col md:flex-row gap-2 my-5">
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
          placeholder="Type to search..."
          onChange={(e)=>setSearch(e.target.value)}
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
        <Button color="primary" className="self-end" as={Link} href="/admin/classes/create">Create</Button>
      </div>
      <Table 
        headers={headers} 
        data={search == ''?data:searchData} 
        uniqueKey="name" 
        module="admin/classes" 
        onDelete={handleDelete} 
        loading={loading}
      />
    </AdminLayout>
  );
}
