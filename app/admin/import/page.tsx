"use client";
import AdminLayout from "@/layouts/AdminLayout";
import fetchApi from "@/utils/fetchApi";
import { Button, Card, CardBody, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FileUpload from "./fileUploud";
import toast from "react-hot-toast";

export default function Imports() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [fileAccount, setFileAccout] = useState() as any;
  const [fileCourses, setFileCourses] = useState() as any;
  const [fileAssign, setFileAssign] = useState() as any;

  async function handleSubmit(e: any) {
    e.preventDefault();

    const fileAccounts = new FormData(e.target);
    fileAccounts.append("file", fileAccount[0]);

    const fileCoursess = new FormData(e.target);
    fileCoursess.append("file", fileCourses[0]);

    const fileAssigns = new FormData(e.target);
    fileAssigns.append("file", fileAssign[0]);

    try {
      setLoading(true);
      const account = await fetch("/api/admin/users/import", {
        method: "POST",
        body: fileAccounts,
      });

      // const courses = await fetch("/api/admin/courses/import", {
      //   method: "POST",
      //   body: fileCoursess,
      // });

      // const assign = await fetch("/api/admin/assign", {
      //   method: "POST",
      //   body: fileAssigns,
      // });

      toast.success("Import data successfully");
    } catch (error) {
      toast.error("Import data failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminLayout
      title="Import Data"
      subtitle="Import data from your university to EduClassAI"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex flex-col gap-5 mx-auto my-4"
      >
        <FileUpload
          label="Account"
          link="https://aicstorage.blob.core.windows.net/settings/template/TEMPLATE USER IMPORT.xlsx"
          store={setFileAccout}
        />
        <FileUpload
          label="Courses"
          link="https://aicstorage.blob.core.windows.net/settings/template/TEMPLATE COURSE IMPORT.xlsx"
          store={setFileCourses}
        />
        <FileUpload
          label="Assign Courses"
          link="https://aicstorage.blob.core.windows.net/settings/template/TEMPLATE ASSIGN COURSE IMPORT.xlsx"
          store={setFileAssign}
        />
        <div className="ml-auto">
          <Button color="primary" type="submit" isLoading={loading}>
            Import
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
}
