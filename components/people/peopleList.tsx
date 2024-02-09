"use client"
import React from 'react'
import PeopleItem from './peopleItem'
export default function PeopleList({data}:any) {
  return (
    <div className="space-y-4 my-2">
    {data?.map((item:any)=>(
        <PeopleItem key={item.id} data={item}/>
      ))}
    </div>
  )
}
