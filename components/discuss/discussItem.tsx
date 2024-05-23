"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar, AvatarIcon, Divider } from "@nextui-org/react";
import React from "react";
import Label from "../atom/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import DiscussInteract from "./discussInteract";
import moment from "moment";
import { TimeAgo } from "@/utils/timeStamp";
import Image from "next/image";

export default function DiscussItem({ data }: any) {
  const [showComment, setShowComment] = React.useState(false);

  console.log(data);

  return (
    <Card className="w-full">
      <CardBody className="flex flex-col gap-5 p-4">
        <div className="flex items-center content-between justify-between">
          <div className="flex gap-2 items-center justify-center">
            <Avatar
              as="button"
              size="sm"
              icon={<AvatarIcon />}
              classNames={{
                icon: "text-black/80",
              }}
            />
            <div className="flex flex-row gap-1 justify-center items-center">
              <span className="text-lg font-semibold">{data.user.name}</span>{" "}
              <span>•</span>
              <span className=" text-xs text-gray-500">
                {TimeAgo(data.created_at)}
              </span>
            </div>
            <Label text={data.tags} />
          </div>
          <div className="flex gap-2 items-center justify-center">
            <FontAwesomeIcon icon={faBookmark} size="lg" />
          </div>
        </div>
        <div className="gap-2 grid grid-cols-3 ">
          {data.attachments.map((attachment: any) => (
            <Image
              key={attachment}
              className="border border-gray-200 rounded-md"
              width={300}
              height={200}
              alt="NextUI hero Image"
              src={attachment}
            />
          ))}
        </div>
        <div className="text-base font-base text-gray-600">
          <div
            className="discuss-post-content"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
        <DiscussInteract
          data={data}
          comment={{ showComment, setShowComment }}
        />
      </CardBody>
    </Card>
  );
}
