"use client";
import { useState, useEffect } from "react";
import { CourseList } from "@/components/course/CourseList";

import fetchApi from "@/utils/fetchApi";
import EmptyCourse from "@/components/course/emptyCourse";
import { Spinner } from "@nextui-org/react";
import Layout from "@/layouts/layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  async function getData() {
    try {
      const courses = await fetchApi("/courses", "GET");
      return courses.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!session) {
      router.push("welcome");
    }
  }, [session]);

  useEffect(() => {
    getData().then((res) => {
      setData(res);
    });
  }, []);

  if (loading) return <Spinner className="w-full text-center h-screen" />;

  return (
    <Layout>
      <section className="flex flex-col items-start justify-center gap-4 p-8">
        {data?.length > 0 ? <CourseList data={data} /> : <EmptyCourse />}
      </section>
    </Layout>
  );
}
