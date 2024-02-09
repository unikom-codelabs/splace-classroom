"use client";

import React from 'react'
import { Tab,Tabs } from '@nextui-org/tabs'
import NextLink from 'next/link'
import {usePathname} from "next/navigation";
import { useParams } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';
export default function TabsCourse() {
  const pathname = usePathname();
  const { id } = useParams();
  const { data: session } = useSession();
  const userData = session?.user as User

  const tabs = [
    {
      title: 'Course',
      href: `/course/${id}`
    },
    {
      title: 'People',
      href: `/course/${id}/people`
    },
    {
      title: 'ChatBot',
      href: `/course/${id}/chatbot`
    }
  ]
  return (
    <div className="flex w-full flex-col bg-white dark:bg-black px-8 rounded-t-md">
      <Tabs 
        aria-label="Options" 
        color="primary" 
        variant="underlined"
        selectedKey={pathname}
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#22d3ee]",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#06b6d4]",
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.href}
            href={tab.href}
            title={
              <div className="flex items-center space-x-2">
                <span className='font-bold'>{tab.title}</span>
              </div>
            }
          />
        ))}
      </Tabs>
    </div>  
  )
}
