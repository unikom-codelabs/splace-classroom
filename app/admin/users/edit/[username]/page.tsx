'use client';
import AdminLayout from "@/layouts/AdminLayout";
import fetchApi from "@/utils/fetchApi";
import { Input } from "@nextui-org/input";
import { Button, Card, CardBody, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Users({params}:any) {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState("");
  const [classId, setClassId] = useState(0);
  const [classes, setClasses] = useState([]);
  const roles = ['STUDENT', 'INSTRUCTOR', 'ADMIN'];
  const router = useRouter();

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: any) {
    e.preventDefault();
    const res = await fetchApi(`/admin/users/${params.username}`, 'PUT', {
      username,
      name,
      role,
      class_id: +classId
    });
    if (!res.data) {
        setIsError(true);
        setErrorMessage(res.message);
    return
    }
    router.push('/admin/users');
  }
  useEffect(() => {
    fetchApi('/admin/classes', 'GET').then(res => {
      setClasses(res.data);
    });
    fetchApi(`/admin/users?username=${params.username}`, 'GET').then((res:any) => {
      setUsername(res.data[0].username);
      setName(res.data[0].name);
      setRole(res.data[0].role);
      setClassId(res.data[0].class_id.toString());
    });
  }, [params]);
  return (
    <AdminLayout title="User Management" subtitle={`Edit your user (${params.username})`}>
      <h1 className="text-xl font-bold mb-5 text-center">Edit User {params.username}   </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col gap-5 mx-auto">
        <div>
          {isError && (
            <Card className="dark:bg-red-400 bg-red-500 text-white">
              <CardBody>
                <span>{errorMessage}.</span>
              </CardBody>
            </Card>
          )}
        </div>
        <Input type="text" label="Username" placeholder="Enter username" value={username} onChange={(e: any) => setUsername(e.target.value)} />
        <Input type="text" label="Name" placeholder="Enter name" value={name} onChange={(e: any) => setName(e.target.value)} />
        <Select label="Role" placeholder="Select role" selectedKeys={[role]} onChange={(e: any) => setRole(roles[e.target.value])}>
          {roles.map((role, index) => (
            <SelectItem value={role} key={role}>{role}</SelectItem>
          ))}
        </Select>
        {role == 'STUDENT' && (
          <Select label="Class" placeholder="Select class" selectedKeys={classId.toString()} onChange={(e: any) => setClassId(e.target.value)} >
            {classes.map((classs:any, index) => (
              <SelectItem value={classs?.id} key={classs.id}   >{classs?.name}</SelectItem>
            ))}
          </Select>
        )}
        <div className="ml-auto">
          <Button color="warning" type="submit">Update</Button>
        </div>
      </form>
    </AdminLayout>
  );
}
