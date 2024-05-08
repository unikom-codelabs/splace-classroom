"use client";
import React from "react";
import { Card, CardBody } from "@nextui-org/card";

import DiscussItem from "./discussItem";

export default function DiscussList() {
  return (
    <Card className="lg:max-w-[811px] w-full">
      <CardBody className="flex flex-col gap-5 items-center">
        <DiscussItem />
      </CardBody>
    </Card>
  );
}
