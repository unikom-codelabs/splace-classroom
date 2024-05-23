"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar, AvatarIcon, Divider } from "@nextui-org/react";
import React from "react";
import Label from "../atom/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";

import DiscussInteract from "./discussInteract";

import { TimeAgo } from "@/utils/timeStamp";
import Image from "next/image";
import fetchApi from "@/utils/fetchApi";
import { mutate } from "swr";
import toast from "react-hot-toast";

export default function DiscussItem({ data }: any) {
  const [showComment, setShowComment] = React.useState(false);

  const handleBookmark = async () => {
    const res = await fetchApi(`/discustions/${data.id}/bookmark`, "POST", {
      id: data.id,
    });

    mutate("/discustions");

    toast.success(
      `${
        res.message === "Discustion bookmarked" ? "Bookmark" : "Remove Bookmark"
      } Discussion`
    );
  };

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
            <button onClick={() => handleBookmark()}>
              <FontAwesomeIcon
                icon={
                  data.discustion_bookmark.find(
                    (bookmark: any) => bookmark.user_id === data.user_id
                  )
                    ? faBookmarkSolid
                    : faBookmark
                }
                className="text-primary"
                size="lg"
              />
            </button>
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
