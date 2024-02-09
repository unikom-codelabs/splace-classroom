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
  const headers = ['name', 'username', 'role'];
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const handleDelete = async (username:string) => {
    await fetchApi(`/admin/users/${username}`, 'DELETE');
      window.location.reload();
  }

  async function  getData() {
    const users = (await fetchApi('/admin/users', 'GET'));
    return users.data;
  }

  useEffect(() => {
    getData().then((res) => {
      setData(res);
      setLoading(false);
    })
  }, [])

  useEffect(() => {
    setSearchData(data.filter((user: any) => user.username.toLowerCase().includes(search.toLowerCase())));
  }, [search])

  return (
    <AdminLayout title="User Management" subtitle="Manage your User Here">
      <div className="flex flex-col md:flex-row gap-2 items-center my-5 ">
        <Input
          label="Search Username"
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
        <Button color="primary" className="self-end" as={Link} href="/admin/users/create">Create</Button>
      </div>
      <div className="w-full">
        <Table headers={headers} data={search==''?data:searchData} uniqueKey="username" module="admin/users" onDelete={handleDelete} loading={loading}/>
      </div>
    </AdminLayout>
  );
}
