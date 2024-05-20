"use client";

import useSWR from "swr";
import fetchApi from "@/utils/fetchApi";
import { Spinner } from "@nextui-org/react";

import DiscussList from "@/components/discuss/discussList";
import CardUser from "@/components/discuss/userCard";
import Layout from "@/layouts/layout";

export default function Discuss() {
  const { data: data, isLoading } = useSWR("/discustions", fetchApi as any);

  if (isLoading) return <Spinner className="w-full text-center h-screen" />;

  return (
    <Layout>
      <section className="flex flex-col items-center justify-center gap-4 p-8 lg:flex-row lg:items-start">
        <CardUser data={{ name: "John Doe" }} />
        <DiscussList data={data} />
      </section>
    </Layout>
  );
}
