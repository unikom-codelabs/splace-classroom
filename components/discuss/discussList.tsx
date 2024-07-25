"use client";
import React, { useEffect } from "react";
import { Card, CardBody } from "@nextui-org/card";

import DiscussItem from "./discussItem";
import FilterDiscuss from "./filter/filterDiscuss";

import { Skeleton } from "@nextui-org/react";

export default function DiscussList({ data, isLoading, isBookmark }: any) {
  return (
    <Card className="lg:max-w-[811px] w-full">
      <CardBody className="flex flex-col gap-5 items-center">
        <FilterDiscuss isBookmark={isBookmark} />
        {!isLoading ? (
          data.data.map((datas: any) => (
            <DiscussItem
              key={datas.id}
              data={isBookmark.isBookmark ? datas.discustions : datas}
            />
          ))
        ) : (
          <CardBody className="flex flex-col gap-5 p-4">
            <div className="flex items-center content-between justify-between">
              <div className="flex gap-2 items-center justify-center">
                <div>
                  <Skeleton className="flex rounded-full w-9 h-9" />
                </div>

                <Skeleton className="h-3 w-3/5 rounded-lg " />
              </div>
            </div>
            <div className="gap-2 grid grid-cols-3 ">
              <div>
                <Skeleton className="flex rounded-md w-[200px] h-[100px]" />
              </div>
            </div>

            <Skeleton className="h-3 w-3/5 rounded-lg " />
            <Skeleton className="h-3 w-3/6 rounded-lg " />
            <Skeleton className="h-3 w-3/12 rounded-lg " />
          </CardBody>
        )}
      </CardBody>
    </Card>
  );
}
