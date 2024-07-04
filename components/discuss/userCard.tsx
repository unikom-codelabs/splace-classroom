"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar, AvatarIcon, Divider, useDisclosure } from "@nextui-org/react";
import React from "react";
import AddDiscuss from "./addDiscuss/addDiscuss";
import Loading from "@/app/course/[id]/loading";

export default function CardUser({ data }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                <p className=" text-base text-dark-blue">11</p>
              </div>
            </CardBody>
          ) : (
            <Loading />
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
