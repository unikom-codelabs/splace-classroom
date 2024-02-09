"use client";
import { Card, CardBody } from '@nextui-org/card';
import { Avatar, AvatarIcon } from '@nextui-org/react';
import React from 'react'

export default function PeopleItem({data}:any) {
  const { name } = data || {};
  return (
    <Card>
      <CardBody className='flex flex-row gap-5 items-center'>
        <Avatar 
          as="button"
          size="sm"
          icon={<AvatarIcon/>}
          classNames={{
            icon: "text-black/80",
          }}
        />
        <p className='text-md'>{name}</p>
      </CardBody>
    </Card>
  )
}
