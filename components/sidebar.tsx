"use client";
import React, { useEffect, useRef } from "react";
import NextLink from "next/link";
import { siteConfig } from "@/config/site";
import { useSession } from "next-auth/react";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import Tips from "./tips";
import Image from "next/image";

type menuItems = {
  label: String;
  href: any;
  icon: any;
};

function Sidebar({ open, toggle }: any) {
  const { data: session } = useSession() as any;
  const [navMenuItems, setNavMenuItems] = React.useState<menuItems[]>(
    siteConfig.navMenuItems
  );
  const sidebarRef: any = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (session?.user?.role === "ADMIN")
      setNavMenuItems(siteConfig.navMenuItemsAdmin);
    else if (session?.user?.role === "TEACHER")
      setNavMenuItems(siteConfig.navMenuItemsInstructor);
    else setNavMenuItems(siteConfig.navMenuItems);
  }, [session]);

  const closeSidebarHandler = () => {
    toggle();
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      closeSidebarHandler();
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  return (
    <aside
      ref={sidebarRef}
      className={`absolute min-h-full w-[280px] top-0 z-50 bg-white dark:bg-black shadow-lg transition-all ease-in-out duration-300 px-4 py-4 flex flex-col gap-10 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <Image
        className="self-center mx-auto"
        src="/Logo-Unikom.png"
        width={160}
        height={36}
        alt={""}
      />
      <div className="flex flex-col gap-3">
        {navMenuItems.map((item, index) => {
          let isActive =
            item.href == "/" ? false : pathname.startsWith(item.href);
          if (pathname == "/" && item.href == "/") isActive = true;

          return (
            <NextLink
              className={`${
                isActive ? "bg-dark-blue text-white" : "text-gray-400"
              } flex justify-between items-center w-full hover:bg-blue-200 hover:text-blue-800 rounded-xl p-3 md:px-5 gap-3 h-14`}
              href={item.href}
              key={index}
              onClick={open ? closeSidebarHandler : undefined}
            >
              <div className="flex items-center gap-6">
                <FontAwesomeIcon icon={item.icon} size="sm" />

                <span
                  className={` md:overflow-hidden transition-all text-md text-start font-semibold`}
                >
                  {item.label}
                </span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
              >
                <path
                  d="M7.74349 18.5146H12.7435C16.9102 18.5146 18.5768 16.8479 18.5768 12.6812V7.68123C18.5768 3.51457 16.9102 1.8479 12.7435 1.8479H7.74349C3.57682 1.8479 1.91016 3.51457 1.91016 7.68123V12.6812C1.91016 16.8479 3.57682 18.5146 7.74349 18.5146Z"
                  stroke={isActive ? "white" : "gray"}
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.19385 13.1228L12.1272 10.1812L9.19385 7.2395"
                  stroke={isActive ? "white" : "gray"}
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </NextLink>
          );
        })}
      </div>

      <Tips />
    </aside>
  );
}

export default Sidebar;
