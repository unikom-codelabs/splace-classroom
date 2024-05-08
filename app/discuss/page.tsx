"use client";

import DiscussList from "@/components/discuss/discussList";
import CardUser from "@/components/discuss/userCard";
import Layout from "@/layouts/layout";

export default function Discuss() {
  return (
    <Layout>
      <section className="flex flex-col items-center justify-center gap-4 p-8 lg:flex-row lg:items-start">
        <CardUser data={{ name: "John Doe" }} />
        <DiscussList />
      </section>
    </Layout>
  );
}
