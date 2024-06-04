"use client";

import useSWR from "swr";
import fetchApi from "@/utils/fetchApi";

import DiscussList from "@/components/discuss/discussList";
import CardUser from "@/components/discuss/userCard";
import Layout from "@/layouts/layout";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function Discuss() {
  const params = useSearchParams();
  const category = params.get("tags") || "";
  const text = params.get("text") || "";
  const sort_by = params.get("sort_by") || "";

  const { data: session } = useSession() as any;

  const [isBookmark, setIsBookmark] = useState(false);
  const [dataBookmark, setDataBookmark] = useState<any>([]);

  const { data, isLoading } = useSWR(
    isBookmark
      ? () => `/bookmark`
      : () => `/discustions?tags=${category}&text=${text}&sort_by=${sort_by}`,
    fetchApi as any,
    { keepPreviousData: true }
  );

  return (
    <Layout>
      <section className="flex flex-col items-center justify-center gap-4 p-8 lg:flex-row lg:items-start">
        <CardUser data={session} />
        <DiscussList
          data={data}
          isLoading={isLoading}
          isBookmark={{ isBookmark, setIsBookmark }}
        />
      </section>
    </Layout>
  );
}
