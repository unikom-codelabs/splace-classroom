"use client";

import React from "react";
import {Card, CardFooter, CardBody} from "@nextui-org/card";
import { Image } from "@nextui-org/image";

export const CourseItem = ({course}:any) => {
  const { name, instructor } = course || {}; 
	return (
		<Card className="pb-4" radius="md">
      <CardBody className="p-0 overflow-hidden h-36">
        <Image
          alt="Card background"
          className="object-cover align-end rounded-none rounded-t-xl"
          src='/liquid-cheese.svg'
          width={350}
          height={200}
        />
      </CardBody>
      <CardFooter className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="uppercase font-bold text-lg">{name}</p>
        <small className="text-default-800">{instructor}</small>
      </CardFooter>
    </Card>
	);
};