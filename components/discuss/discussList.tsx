"use client";
import React, { useEffect } from "react";
import { Card, CardBody } from "@nextui-org/card";

import DiscussItem from "./discussItem";
import FilterDiscuss from "./filterDiscuss";

export default function DiscussList({ data }: { data: any }) {
  const [discussData, setDiscussData] = React.useState(data.data);

  const [filter, setFilter] = React.useState({
    category: "all",
    sort: "newest",
  });

  return (
    <Card className="lg:max-w-[811px] w-full">
      <CardBody className="flex flex-col gap-5 items-center">
        <FilterDiscuss filter={filter} setFilter={setFilter} />
        {discussData.map((datas: any) => (
          <DiscussItem key={datas.id} data={datas} />
        ))}
      </CardBody>
    </Card>
  );
}
