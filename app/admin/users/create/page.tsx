'use client';
import AdminLayout from "@/layouts/AdminLayout";
import fetchApi from "@/utils/fetchApi";
import { Input } from "@nextui-org/input";
import { Button, Card, CardBody, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default  function Users() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState();
  const [class_id, setClassId] = useState('');
  const [classes, setClasses] = useState([]);
  const roles = ['STUDENT', 'TEACHER', 'ADMIN'];
  const router = useRouter();
  const [loading,setLoading] = useState(false)
  async function handleSubmit(e:any) {
    e.preventDefault();
    setLoading(true)
    const res = await fetchApi('/admin/users', 'POST', {
      username,
      name,
      role,
      class_id
    });
    setLoading(false)
    if (res.data) {
        router.push('/admin/users');
    } 
  }
  useEffect(() => {
    fetchApi('/admin/classes', 'GET').then(res => {
      setClasses(res.data);
    });

  }, []);
  // const data = await getData();
  return (
    <AdminLayout title="User Management" subtitle="Create your user">
      <h1 className="text-xl font-bold mb-5 text-center">Create User   </h1>
      
      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col gap-5 mx-auto">
        <Input type="text" label="Username" placeholder="Enter  username" onChange={(e:any)=>setUsername(e.target.value)} />
        <Input type="text" label="Name" placeholder="Enter  name" onChange={(e: any) => setName(e.target.value)} />
        <Select label="Role" placeholder="Select role"  onChange={(e: any) => setRole(roles[e.target.value] as any)}>
          {roles.map((role,index) => (
            <SelectItem value={role} key={index}>{role}</SelectItem>
          ))}
        </Select>
        {role == 'STUDENT' && (
          <Select label="Class" placeholder="Select class" onChange={(e: any) => setClassId(e.target.value)} >
          {classes.map((classs:any,index) => (
            <SelectItem value={classs?.id} key={classs.id}>{classs?.name}</SelectItem>
            ))}
        </Select>
            )}
        <div className="ml-auto">

        <Button color="primary" type="submit" isLoading={loading}>Create</Button>
        </div>

      </form>
    </AdminLayout>
  );
}
