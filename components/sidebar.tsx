"use client";
import React,{useContext, useEffect, useRef} from 'react'
import { MenuContext } from '@/app/context/MenuContext';
import NextLink from "next/link";
import { siteConfig } from '@/config/site';
import { useSession } from 'next-auth/react';
import { Icon } from '@iconify/react';

type menuItems = {
  label: String,
  href: any,
  icon: String,
}

function Sidebar() {
  const { open, toggle } = useContext(MenuContext);
  const { data: session } = useSession() as any;
  const [navMenuItems, setNavMenuItems] = React.useState<menuItems[]>(siteConfig.navMenuItems);
  const sidebarRef:any = useRef(null);
  useEffect(() => {
    if (session?.user?.role === 'ADMIN') setNavMenuItems(siteConfig.navMenuItemsAdmin)
    else if (session?.user?.role === 'TEACHER') setNavMenuItems(siteConfig.navMenuItemsInstructor)
    else setNavMenuItems(siteConfig.navMenuItems)
  },[session])
  
  const closeSidebarHandler = () => {
    toggle();
  };
  
  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      closeSidebarHandler();
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open]);

  return (
    <aside
      ref={sidebarRef}
      className={`absolute h-full w-fit z-50 bg-white dark:bg-black shadow-lg transition-all ease-in-out duration-300 px-4 py-4 space-y-5 ${open?'translate-x-0':'-translate-x-full'}`}
    >
      {navMenuItems.map((item,index) => (
        <NextLink 
          className={`flex items-center hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2 `}
          href={item.href} 
          key={index} 
          onClick={open?closeSidebarHandler:undefined}
        >
          <Icon icon={`${item.icon}`} className='text-xl'/>
          <span className={`${open?'md:w-fit px-4':'md:w-0'} md:overflow-hidden transition-all`}>{item.label}</span>
        </NextLink>
        ))}
    </aside>
  )
}

export default Sidebar
