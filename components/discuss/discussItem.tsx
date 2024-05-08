"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Avatar, AvatarIcon, Divider } from "@nextui-org/react";
import React from "react";
import Label from "../atom/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import DiscussInteract from "./discussInteract";

export default function DiscussItem({ data }: any) {
  const { name } = data || {};
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
              <span className="text-lg font-semibold">John Doe</span>{" "}
              <span>•</span>
              <span className=" text-xs text-gray-500">Just Now</span>
            </div>
            <Label text="Algorithm" />
          </div>
          <div className="flex gap-2 items-center justify-center">
            <FontAwesomeIcon icon={faBookmark} size="lg" />
          </div>
        </div>
        <div className="text-base font-base text-gray-600">
          An algorithm is a procedure or formula for solving a problem, based on
          conducting a sequence of specified actions. A computer program can be
          viewed as an elaborate algorithm. In mathematics and computer science,
          an algorithm usually means a small procedure that solves a recurrent
          problem.
          <br />
          <br />
          Cheers!
        </div>

        <DiscussInteract />
      </CardBody>
    </Card>
  );
}
