import {
  faBook,
  faComments,
  faFileImport,
  faGear,
  faHouse,
  faListCheck,
  faSwatchbook,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "EduClass.AI",
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/",
      icon: faHouse,
    },
    {
      label: "Forum Discussion",
      href: "/discuss",
      icon: faComments,
    },
  ],
  navMenuItemsInstructor: [
    {
      label: "Dashboard",
      href: "/",
      icon: faHouse,
    },
    {
      label: "Quiz",
      href: "/quiz",
      icon: faListCheck,
    },
  ],
  navMenuItemsAdmin: [
    {
      label: "Dashboard",
      href: "/",
      icon: faHouse,
    },
    {
      label: "Import Data",
      icon: faFileImport,
      href: "/admin/import",
    },
    {
      label: "Users",
      icon: faUsers,
      href: "/admin/users",
    },
    // {
    //   label: "Class",
    //   icon: faSwatchbook,
    //   href: "/admin/classes",
    // },
    {
      label: "Course",
      icon: faBook,
      href: "/admin/courses",
    },
    {
      label: "Settings",
      icon: faGear,
      href: "/admin/settings",
    },
  ],
};
