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
      className={`absolute min-h-full top-0 w-fit z-50 bg-white dark:bg-black shadow-lg transition-all ease-in-out duration-300 px-4 py-4 flex flex-col gap-10 ${
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
              } flex justify-between items-center w-44 hover:bg-blue-200 hover:text-blue-800 rounded-md p-3 md:px-5 gap-3`}
              href={item.href}
              key={index}
              onClick={open ? closeSidebarHandler : undefined}
            >
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={item.icon} size="sm" />

                <span
                  className={` md:overflow-hidden transition-all text-xs md:text-sm text-start font-medium`}
                >
                  {item.label}
                </span>
              </div>
              <FontAwesomeIcon icon={faCircleChevronRight} size="sm" />
            </NextLink>
          );
        })}
      </div>

      <Tips />
    </aside>
  );
}

export default Sidebar;
