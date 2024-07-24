"use client";

import { SearchIcon } from "@/components/icons";
import Table from "@/components/table";
import AdminLayout from "@/layouts/AdminLayout";
import fetchApi from "@/utils/fetchApi";
import { Icon } from "@iconify/react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import NextLink from "next/link";

import { useEffect, useState } from "react";
export const dynamic = "force-dynamic";
import * as XLSX from "xlsx";

export default function Users() {
  const headers = ["name", "username", "role"];
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [jsonData, setJsonData] = useState("");

  const handleDelete = async (username: string) => {
    await fetchApi(`/admin/users/${username}`, "DELETE");
    window.location.reload();
  };

  async function getData() {
    const users = await fetchApi("/admin/users", "GET");
    return users.data;
  }

  useEffect(() => {
    getData().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setSearchData(
      data.filter((user: any) =>
        user.username.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  const handleConvert = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        setJsonData(JSON.stringify(json, null, 2));
      };
      reader.readAsBinaryString(file);
    }
  };

  useEffect(() => {
    handleConvert();
  }, [file]);

  return (
    <AdminLayout title="User Management" subtitle="Manage your User Here">
      <div className="flex flex-col md:flex-row gap-2 items-center my-5 ">
        <Input
          isClearable
          radius="lg"
          labelPlacement={"outside"}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type to search for users..."
          startContent={
            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
        <Button
          color="primary"
          className="self-end bg-green-600"
          startContent={
            <Icon icon="file-icons:microsoft-excel" fontSize={"40px"} />
          }
          onClick={() => {
            const fileInput = document.getElementById("upload-file-excel");
            if (fileInput) {
              fileInput.click();
            }
          }}
        >
          Import
          <input
            type="file"
            accept=".xls,.xlsx"
            onChange={(e: any) => setFile(e.target.files[0])}
            className={"hidden"}
            id="upload-file-excel"
          />
        </Button>

        <Button
          color="primary"
          className="self-end"
          as={NextLink}
          href="/admin/users/create"
        >
          Create
        </Button>
      </div>
      <div className="w-full">
        <Table
          headers={headers}
          data={search == "" ? data : searchData}
          uniqueKey="username"
          module="admin/users"
          onDelete={handleDelete}
          loading={loading}
        />
        <pre>{jsonData}</pre>
      </div>
    </AdminLayout>
  );
}
