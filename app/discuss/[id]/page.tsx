"use client";

import useSWR from "swr";
import fetchApi from "@/utils/fetchApi";

import DiscussList from "@/components/discuss/discussList";
import CardUser from "@/components/discuss/userCard";
import Layout from "@/layouts/layout";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DiscussItem from "@/components/discuss/discussItem";
import Loading from "@/app/course/[id]/loading";

export default function SpesificDiscuss({ params }: { params: any }) {
  const { id } = params;
  const { data: session } = useSession() as any;

  const [isBookmark, setIsBookmark] = useState(false);
  const [dataBookmark, setDataBookmark] = useState<any>([]);

  const { data: data, isLoading } = useSWR(
    "/discustions?id=" + id,
    fetchApi as any
  );

  useEffect(() => {
    const datas = data?.data.filter((item: any) =>
      item.discustion_bookmark
        .map((bookmark: any) => bookmark.user_id)
        .includes(session?.user.id)
    );
    setDataBookmark({ data: datas });
  }, [data, isBookmark]);

  return (
    <Layout>
      <section className="flex flex-col items-center justify-center gap-4 p-8 lg:flex-row lg:items-start">
        {isLoading ? <Loading /> : <DiscussItem data={data.data[0]} />}
      </section>
    </Layout>
  );
}
