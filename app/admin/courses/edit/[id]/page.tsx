'use client';
import AdminLayout from "@/layouts/AdminLayout";
import fetchApi from "@/utils/fetchApi";
import { Input } from "@nextui-org/input";
import { Button, Card, CardBody, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Users({params}:any) {
  const [name, setName] = useState('');
  const [class_id, setClassId] = useState('');
  const [instructorId, setInstructorId] = useState('');
  const [classes, setClasses] = useState([]);
  const [users, setUsers] = useState([]);
  const [course, setCourse] = useState([]);

  const router = useRouter();
  async function handleSubmit(e: any) {
    e.preventDefault();
    const res = await fetchApi(`/admin/courses/${params.id}`, 'PUT', {
      name,
      class_ids: class_id.split(',').map((id: any) => parseInt(id)),
      instructor_id: instructorId
    });
    if (res.data) {
      router.push('/admin/courses');
    }
  }
  useEffect(() => {
    fetchApi('/admin/classes', 'GET').then(res => {
      setClasses(res.data);
    });
    fetchApi('/admin/users', 'GET').then(res => {
      setUsers(res.data.filter((user: any) => user.role == 'INSTRUCTOR'));
    });
    fetchApi(`/admin/courses?id=${params.id}`, 'GET').then((res):any => {
      const course_name = res.data[0].name;
      const class_ids = res.data.filter((course: any) => course.role == 'STUDENT').map((course: any) => course.class_id);
      const instructor_id = res.data.filter((course: any) => course.role == 'INSTRUCTOR')[0].instructor_id.toString();
      setClassId(class_ids.join(','))
      setInstructorId(instructor_id)
      setName(course_name)
    });
  }, []);

  return (
    <AdminLayout title="Course Management" subtitle="Update your course">
      <h1 className="text-xl font-bold mb-5 text-center">Update Course {name }   </h1>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col gap-5 mx-auto">
        <Input type="text" label="Name" placeholder="Enter  name" value={name} onChange={(e: any) => setName(e.target.value)} />
        <div className="flex gap-5 ">
          <Select label="Class" placeholder="Select class" selectionMode="multiple" selectedKeys={class_id} onChange={(e: any) => setClassId(e.target.value)} >
            {classes.map((classs:any) => (
              <SelectItem value={classs?.id} key={classs.id}>{classs?.name}</SelectItem>
            ))}
          </Select>
            
          <Select label="Instructor" placeholder="Select Instructor"  selectedKeys={instructorId} onChange={(e: any) => setInstructorId(e.target.value)} >
            {users.map((user:any) => (
              <SelectItem value={user.id} key={user.id}>{user.username}</SelectItem>
            ))}
          </Select>
        </div>
        <div className="ml-auto">
          <Button color="warning" type="submit">Update</Button>
        </div>

      </form>
    </AdminLayout>
  );
}
