"use client";
import React, { useEffect } from "react";
import { Card, CardBody } from "@nextui-org/card";

import DiscussItem from "./discussItem";
import FilterDiscuss from "./filterDiscuss";
import useSWR from "swr";
import fetchApi from "@/utils/fetchApi";
import Loading from "@/app/course/[id]/loading";

export default function DiscussList() {
  const { data: data, isLoading } = useSWR("/discustions", fetchApi as any);

  const [filter, setFilter] = React.useState({
    category: "all",
    sort: "newest",
  });

  return (
    <Card className="lg:max-w-[811px] w-full">
      <CardBody className="flex flex-col gap-5 items-center">
        <FilterDiscuss filter={filter} setFilter={setFilter} />
        {!isLoading ? (
          data.data.map((datas: any) => (
            <DiscussItem key={datas.id} data={datas} />
          ))
        ) : (
          <Loading />
        )}
      </CardBody>
    </Card>
  );
}
