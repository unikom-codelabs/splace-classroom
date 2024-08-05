"use client";
import CreatePage from "@/components/page/createPage";

export default function Page({
  searchParams,
}: {
  searchParams: {
    course_id: number;
    qname: string;
  };
}) {
  return <CreatePage searchParams={searchParams} pageQuestions={[]} />
}

