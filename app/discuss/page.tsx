"use client";

import useSWR from "swr";
import fetchApi from "@/utils/fetchApi";

import DiscussList from "@/components/discuss/discussList";
import CardUser from "@/components/discuss/userCard";
import Layout from "@/layouts/layout";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Discuss() {
  const { data: session } = useSession() as any;

  const [isBookmark, setIsBookmark] = useState(false);
  const [dataBookmark, setDataBookmark] = useState<any>([]);

  const { data: data, isLoading } = useSWR("/discustions", fetchApi as any);

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
        <CardUser data={{ name: "John Doe" }} />
        <DiscussList
          data={isBookmark ? dataBookmark : data}
          isLoading={isLoading}
          isBookmark={{ isBookmark, setIsBookmark }}
        />
      </section>
    </Layout>
  );
}
