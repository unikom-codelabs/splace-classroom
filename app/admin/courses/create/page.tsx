"use client";
import AdminLayout from "@/layouts/AdminLayout";
import fetchApi from "@/utils/fetchApi";
import { Input } from "@nextui-org/input";
import { Button, Select, Selection, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Users() {
  const [name, setName] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [usersIds, setUsersIds] = useState<Selection>(new Set([]));

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const res = await fetchApi("/admin/courses", "POST", {
      name,
      user_ids: Array.from(usersIds),
      instructor_id: instructorId,
    });
    setLoading(false);
    if (res.data) {
      router.push("/admin/courses");
    }
  }
  useEffect(() => {
    fetchApi("/admin/users", "GET").then((res) => {
      setUsers(res.data);
    });
  }, []);
  // const data = await getData();
  return (
    <AdminLayout title="Course Management" subtitle="Create your course">
      <h1 className="text-xl font-bold mb-5 text-center">Create Course </h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex flex-col gap-5 md:mx-auto"
      >
        <Input
          type="text"
          label="Name"
          placeholder="Enter Name"
          onChange={(e: any) => setName(e.target.value)}
        />
        <div className="flex gap-5 ">
          <Select
            label="Teacher"
            placeholder="Select Teacher"
            onChange={(e: any) => setInstructorId(e.target.value)}
          >
            {users
              .filter((user: any) => user.role === "TEACHER")
              .map((user: any, index) => (
                <SelectItem value={user.id} key={user.id}>
                  {user.name}
                </SelectItem>
              ))}
          </Select>
        </div>

        <div className="flex gap-5 ">
          <Select
            label="Student"
            placeholder="Select Students"
            selectionMode="multiple"
            onSelectionChange={setUsersIds}
            selectedKeys={usersIds}
          >
            {users
              .filter((user: any) => user.role === "STUDENT")
              .map((user: any, index) => (
                <SelectItem value={user.id} key={user.id}>
                  {user.name}
                </SelectItem>
              ))}
          </Select>
        </div>

        <div className="ml-auto">
          <Button color="primary" type="submit" isLoading={loading}>
            Create
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
