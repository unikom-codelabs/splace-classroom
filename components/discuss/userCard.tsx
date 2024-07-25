"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import {
  Avatar,
  AvatarIcon,
  Divider,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import AddDiscuss from "./addDiscuss/addDiscuss";
import Loading from "@/app/course/[id]/loading";
import fetchApi from "@/utils/fetchApi";

export default function CardUser({ data }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [totalDiscussion, setTotalDiscussion] = useState(0);
  useEffect(() => {
    if (data) {
      fetchApi(`/discustions?user_id=${data.user.id}`, "GET").then((res) => {
        setTotalDiscussion(res.data.length);
      });
    }
  }, [data]);

  return (
    <>
      <div className="flex flex-col gap-2 w-full lg:max-w-[300px]">
        <Card className="">
          {data ? (
            <CardBody className="flex flex-col gap-5 items-center">
              <Avatar
                as="button"
                size="lg"
                icon={<AvatarIcon />}
                classNames={{
                  icon: "text-black/80",
                }}
              />
              <p className="text-lg">{data.user.name}</p>
              <Divider />
              <div className="flex flex-row gap-5 items-center">
                <p className="text-sm">Total Discussion</p>
                <p className=" text-base text-dark-blue">{totalDiscussion}</p>
              </div>
            </CardBody>
          ) : (
            <div className="max-w-[300px] w-full flex flex-col justify-center items-center gap-3 p-3">
              <div>
                <Skeleton className="flex rounded-full w-14 h-14" />
              </div>
              <div className="w-full flex flex-col justify-center items-center gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg my-6" />
                <Divider />

                <Skeleton className="h-3 w-4/5 rounded-lg mt-4" />
              </div>
            </div>
          )}
        </Card>
        <Button
          onPress={onOpen}
          variant="flat"
          radius="sm"
          className="bg-dark-blue text-white font-medium"
        >
          Start Discussion
        </Button>
      </div>
      <AddDiscuss isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}
