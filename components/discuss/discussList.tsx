"use client";
import React, { useEffect } from "react";
import { Card, CardBody } from "@nextui-org/card";

import DiscussItem from "./discussItem";
import FilterDiscuss from "./filterDiscuss";

export default function DiscussList({ data }: { data: any }) {
  return (
    <Card className="lg:max-w-[811px] w-full">
      <CardBody className="flex flex-col gap-5 items-center">
        <FilterDiscuss />
        {data.data.map((datas: any) => (
          <DiscussItem key={datas.id} data={datas} />
        ))}
      </CardBody>
    </Card>
  );
}
